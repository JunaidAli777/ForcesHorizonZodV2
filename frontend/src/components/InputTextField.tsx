import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { FieldErrors } from 'react-hook-form';
import { FormValues } from './Register';

interface InputTextFieldProps extends Omit<TextFieldProps, 'required'> {
  label: string;
  name: keyof FormValues;
  errors: FieldErrors<FormValues>;
}

const InputTextField = React.forwardRef<HTMLInputElement, InputTextFieldProps>(
  ({ name, errors, ...props }, ref) => {
    
    return (
      <TextField
        variant="outlined"
        fullWidth
        error={!!errors[name]}
        helperText={errors[name]?.message}
        sx={{
          color: '#90A4AE',
          maxWidth: '90vw',
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#71ABF4',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#71ABF4',
            },
            '&.Mui-disabled fieldset': {
                borderColor: errors[name] ? '#CC0000' : undefined
              },
          },
          '& .MuiFormHelperText-root': {
            position: 'absolute',
            bottom: '-1.5rem',
            left: 0,
            fontSize: '0.75rem',
            margin: 0,
          },
          '& .MuiFormControl-root': {
            position: 'relative',
          },
          ...props.sx
        }}
        {...props}
        ref={ref}
      />
    );
  }
);

export default InputTextField;
