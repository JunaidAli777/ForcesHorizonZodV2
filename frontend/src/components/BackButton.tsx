import React from 'react';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const BackButton: React.FC = () => {
  return (
    <Button
      variant="text"
      style={{ color: '#1E3452', textTransform: 'none' }}
      size="large"
      startIcon={<ChevronLeftIcon />}
    >
      Back
    </Button>
  );
}

export default BackButton;