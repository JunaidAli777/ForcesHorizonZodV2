import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Control, useWatch } from "react-hook-form";
import { FormValues } from "./Register";

type PasswordErrorProps = {
    control: Control<FormValues>
}

export const PasswordError = (props: PasswordErrorProps) => {
    const { control } = props;

    const PASSWORD = useWatch({
        control,
        name: 'password',
        defaultValue: ''
    })

    const hasUppercase = /[A-Z]/.test(PASSWORD);
  const hasLowercase = /[a-z]/.test(PASSWORD);
  const hasNumber = /\d/.test(PASSWORD);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(PASSWORD);
  const isPasswordComplex =
    hasUppercase && hasLowercase && hasNumber && hasSymbol;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <CheckCircleIcon
          sx={{
            color: PASSWORD?.length >= 8 ? "#1E3452" : "#B0BEC5",
            borderRadius: "8px",
            mr: 1,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: PASSWORD?.length >= 8 ? "#1E3452" : "#546E7A",
            fontFamily: "Manrope, sans-serif",
            fontSize: "0.7875rem",
            fontWeight: 500
          }}
        >
          Password must be at least 8 characters long
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CheckCircleIcon
          sx={{
            color: isPasswordComplex ? "#1E3452" : "#B0BEC5",
            borderRadius: "8px",
            mr: 1,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: isPasswordComplex ? "#1E3452" : "#546E7A",
            fontFamily: "Manrope, sans-serif",
            fontSize: "0.7875rem",
            fontWeight: 500
          }}
        >
          Must include one uppercase, lowercase, number, & symbol
        </Typography>
      </Box>
    </Box>
  );
};
