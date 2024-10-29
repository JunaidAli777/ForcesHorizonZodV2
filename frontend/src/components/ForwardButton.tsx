import React from 'react';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface ForwardButtonProps {
  label?: string;
}

const ForwardButton: React.FC<ForwardButtonProps> = ({ label }) => {
  return (
    <Button
      variant="text"
      style={{ color: '#1E3452', textTransform: 'none' }}
      size="large"
      endIcon={<ChevronRightIcon />}
    >
      {label}
    </Button>
  );
}

export default ForwardButton;