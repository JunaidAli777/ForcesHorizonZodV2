import { Alert, Box, Checkbox, FormControlLabel, FormGroup, Slide, SlideProps, Snackbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { FormValues } from './Register';
import { FieldErrors } from 'react-hook-form';
import React, { useCallback, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

interface TermsAndConditionsProps {
    name: keyof FormValues;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errors: FieldErrors<FormValues>;
}

const TransitionUp: React.FC<SlideProps> = (props) => {
    return <Slide {...props} direction="up" />;
};




const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
    name,
    checked,
    onChange, 
    errors
}) => {

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Trigger snackbar if there's an error
    React.useEffect(() => {
        if (errors[name]) {
            setSnackbarOpen(true);
        }
    }, [errors, name]);

    const handleCloseSnackbar = useCallback(() => {
        setSnackbarOpen(false);
    }, []);

  return (
    <>
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>

            <FormGroup>
                <FormControlLabel 
                    control={<Checkbox 
                        checked={checked}
                        onChange={onChange}
                        sx={{
                        '&.Mui-checked': {
                        color: '#1E3452'
                        },
                    }} />}
                    label="I agree to the" 
                    sx={{
                        marginRight: '0.4rem',
                        '& .MuiFormControlLabel-label': {
                        color: '#455A64',
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "0.7875rem",
                        },
                    }}/>
        
            </FormGroup>

                <Link to='/register' style={{
                    display: 'flex', justifyContent: "center", alignItems: "center",
                    color: '#455A64',
                    textDecoration: 'none',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.7875rem',
                    fontWeight: 700,
                    }}>
                    Terms And Conditions
                    <LaunchIcon sx={{
                        fontSize: '0.85rem',
                        marginLeft: '0.4rem',
                        color: '#455A64',
                    }}/>
                </Link>

                
            </Box>


            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={2000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={TransitionUp}
                sx={{ 
                    position: 'fixed', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    zIndex: 1000
                }}
            >
                <Alert 
                    onClose={handleCloseSnackbar}  
                    sx={{ 
                        width: '21rem',
                        fontSize: '0.75rem',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '& .MuiAlert-action': {
                            display: 'none',
                        },
                        '& .MuiAlert-icon': {
                            display: 'none',
                        },
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'white',
                        fontFamily: 'Manrope, sans-serif'
                    }}
                >
                    <Box
                    sx={{display: 'flex',
                        alignItems: 'center'
                    }}>
                        <CancelIcon sx={{ 
                            fontSize: '1.4rem',
                            marginRight: '1rem',
                            color: 'red'
                        }} />
                        <Typography
                        sx={{ fontSize: '1rem'}}>
                        {errors[name]?.message || "Please agree to the Terms and Conditions"}
                        </Typography>
                    </Box>
                </Alert>
            </Snackbar>

    </>

  )
}

export default TermsAndConditions