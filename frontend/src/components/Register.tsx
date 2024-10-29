import React, { useState, MouseEvent } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Container,
  Stack,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  FormControl,
  Collapse,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { Link } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import ForwardButton from "./ForwardButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputTextField from "./InputTextField";
import CustomDivider from "./CustomDivider";
import GoogleButton2 from "./GoogleButton2";
import { PasswordError } from "./PasswordError";
import TermsAndConditions from "./TermsAndConditions";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import Captcha from "./Captcha";
import axios from 'axios';


const registerSchema = z
  .object({
    firstName: z.string().min(1, "First Name cannot be empty"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last Name cannot be empty"),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    role: z.string().optional(),
    email: z
      .string()
      .min(1, "Email cannot be empty")
      .email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    image: z.instanceof(File).nullable().optional(),
    terms: z.boolean().refine(val => val === true, {
      message: "Please agree to the terms and conditions",
    }),
  })

  const registerSchemaAdv = (type: string | null) => registerSchema.refine(
    (data) => {
      if (data.country === "United States" && !data.state) {
        return false;
      }
      return true;
    },
    {
      message: "State cannot be empty",
      path: ["state"],
    }
  ).refine(
    (data) => {
      if (type === "role" && !data.role) {
        return false;
      }
      return true;
    },
    {
      message: "Role is required",
      path: ["role"],
    }
  ).refine(
    (data) => {
      if (type !== "role" && !data.country) {
        return false;
      }
      return true;
    },
    {
      message: "Country cannot be empty",
      path: ["country"],
    }
  )
  .refine(
    (data) => {
      if (type !== "role" && !data.city) {
        return false;
      }
      return true;
    },
    {
      message: "City cannot be empty",
      path: ["city"],
    }
  );

export type FormValues = z.infer<typeof registerSchema>;

const COUNTRIES: string[] = ["United States", "United Kingdom"];
const US_CITIES: string[] = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Philadelphia",
];
const UK_CITIES: string[] = ["Birmingham", "London", "Manchester", "Leeds"];
const STATES: string[] = ["Ohio", "Penselvinia", "Texas", "Arizona"];
const type = new URLSearchParams(window.location.search).get('type');

const Register: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchemaAdv(type)),
    mode: "onSubmit",
  });

  const [image, setImage] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };



  const COUNTRY = watch("country");
  const STATE = watch("state");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!captchaToken) {
      alert("Please complete CAPTCHA verification.");
      return;
    }
  
    data.image = image;
  
    try {
      const response = await axios.post('/api/users', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const SITE_KEY = import.meta.env.VITE_SITE_KEY
  

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
        padding: "20px",
        boxSizing: "border-box",
        marginTop: "24px",
        marginBottom: "16rem",
      }}
    >
      
      {type === 'role' ? (
        <Typography
        variant="h1"
        sx={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: 700,
          fontSize: "2.3625rem",
          color: "#1E3452",
          marginBottom: "12px",
        }}
      >
        Create recruiter account
      </Typography>
      ) : (
        <Typography
        variant="h1"
        sx={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: 700,
          fontSize: "2.3625rem",
          color: "#1E3452",
          marginBottom: "12px",
        }}
      >
        Create veteran/spouse account
      </Typography>
      ) }
      

      <Typography
        variant="body1"
        sx={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: 600,
          fontSize: "1.0125rem",
          color: "#455A64",
          marginBottom: "32px",
        }}
      >
        Enter the details to create your account
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: "53.25rem", height: "38.734375rem", maxWidth: "90vw", marginBottom: { xs: 52, lg: 20}}}>
        <Stack sx={{ display: "flex", justifyContent: "center" }}>
          <ImageUpload onImageUpload={setImage} />
        </Stack>

        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={3}
          sx={{ mb: 4.5 }}
        >
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputTextField
                label="First Name *"
                {...field}
                errors={errors}
              />
            )}
          />

          <Controller
            name="middleName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputTextField
                label="Middle Name"
                {...field}
                errors={errors}
                value={field.value || ""}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputTextField
                label="Last Name *"
                {...field}
                errors={errors}
              />
            )}
          />

        </Stack>

        {type === 'role' && (
          <Stack 
            direction={{ xs: "column", lg: "row" }}
            spacing={3}
            sx={{ mb: 4.5 }}>
            
              <Controller
                name="role"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputTextField
                    label="Role *"
                    {...field}
                    errors={errors}
                  />
                )}
              />



          </Stack>
        )}

        { type !== 'role' && (
          <>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={3}
              sx={{ mb: 4.5 }}
            >
            <FormControl fullWidth variant="outlined" error={!!errors.country}>
              <InputLabel id="country-label">Select Country *</InputLabel>
              <Select
                labelId="country-label"
                id="country-select"
                label="Select Country *"
                autoComplete="off"
                defaultValue=""
                {...register("country")}
                onChange={(event: SelectChangeEvent<string>) => {
                  setValue("country", event.target.value);
                  setValue("state", "");
                  setValue("city", "");
                  clearErrors("country");
                  clearErrors("state");
                  clearErrors("city");
                }}
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#71ABF4",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#71ABF4",
                  }
                  
                }}
              >
                {COUNTRIES.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
              {errors.country && (
                <FormHelperText
                  error
                  sx={{
                    position: 'absolute',
                    bottom: '-1.5rem',
                    left: 0,
                    fontSize: '0.75rem',
                    margin: 0,
                  }}
                >
                  {errors.country.message}
                </FormHelperText>
              )}
            </FormControl>

          {COUNTRY === "United States" ? (
            <FormControl fullWidth variant="outlined" error={!!errors.state}>
              <Controller
                name="state"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="state-autocomplete"
                    options={STATES}
                    getOptionLabel={(option) => option || ""}
                    value={value || ""}
                    onChange={(_event, value) => {
                      onChange(value || "");
                      clearErrors("state");
                      setValue("city", "");
                    }}
                    renderInput={(params) => (
                      <InputTextField
                        {...params}
                        label="Choose State *"
                        name="state"
                        errors={errors}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          ) : (
            <FormControl fullWidth variant="outlined" error={!!errors.city}>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="ukCity-autocomplete"
                    options={UK_CITIES}
                    getOptionLabel={(option) => option || ""}
                    value={value}
                    disabled={!COUNTRY}
                    onChange={(_event, newValue) => {
                      onChange(newValue || "");
                      clearErrors("city");
                    }}
                    renderInput={(params) => (
                      <InputTextField
                        {...params}
                        label="Choose City *"
                        name="city"
                        errors={errors}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          )}
        </Stack>

            <Collapse in={COUNTRY === "United States"} timeout={300}>
              <Stack spacing={3} sx={{ mb: 4.5 }}>
                <FormControl fullWidth variant="outlined" error={!!errors.city}>
                  <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        id="usCity-autocomplete"
                        options={US_CITIES}
                        getOptionLabel={(option) => option || ""}
                        value={value || ""}
                        disabled={!(COUNTRY && STATE)}
                        onChange={(_event, value) => {
                          onChange(value || "");
                          clearErrors("city");
                        }}
                        renderInput={(params) => (
                          <InputTextField
                            {...params}
                            label="Choose City *"
                            name="city"
                            errors={errors}
                          />
                        )}
                      />
                    )}
                  />
                </FormControl>
              </Stack>
            </Collapse>
          </>
        )}

        

        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={3}
          sx={{ mb: 4.5 }}
        >
        
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputTextField
                label="Email *"
                type="email"
                {...field}
                errors={errors}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputTextField
                {...field}
                label="Password *"
                type={showPassword ? "text" : "password"}
                errors={errors}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Stack>

        <PasswordError control={control} />

        <Stack 
          spacing={2}
          sx={{display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}
        >
          <Controller
            name="terms"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <TermsAndConditions
              name="terms"
              {...fields}
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              errors={errors}              
              />
            )}
          />
        </Stack>

        <Stack 
          spacing={2}
          sx={{display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}
        >
          <Captcha
              siteKey={SITE_KEY}
              onVerify={(token) => setCaptchaToken(token)}
          />
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            sx={{
              backgroundColor: isValid ? "#1E3452" : "#CFD8DC",
              border: "none",
              color: isValid ? "white" : "black",
              fontFamily: "Manrope, sans-serif",
              fontWeight: "600px",
              width: "500px",
              height: "48px",
              maxWidth: "90vw",
              textTransform: "none",
              "&:hover": {
                backgroundColor: isValid ? "#2A4160" : "#CFD8DC",
                width: isValid ? "504px" : "500px",
                height: isValid ? "49px" : "48px",
              },
            }}
          >
            Create Account
          </Button>
        </Box>

        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          mb: 3,
          }}
        >
          <Typography variant="body2" sx={{ color: "#455A64", fontFamily: "Manrope, sans-serif", fontSize: "0.7875rem" }}>
            Already have an account
          </Typography>
          <Link to="/login">
            <ForwardButton label="Login" />
          </Link>
        </Box>

        <Stack sx={{display: "flex", justifyContent: "center", alignItems: "center",mt: 2, mb: 2 }}>
            <CustomDivider />
          </Stack>

          <Stack sx={{display: "flex", justifyContent: "center", alignItems: "center",mt: 2, mb: 2 }}>
            <GoogleButton2 />
          </Stack>
          
      </Box>

      
      
    </Container>
  );
};

export default Register;