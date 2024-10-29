import Button from '@mui/material/Button';
import { FcGoogle } from 'react-icons/fc'; // Using react-icons for Google logo

const GoogleButton = () => {
  const handleClick = () => {
    console.log("Google button clicked");
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <Button
        onClick={handleClick}
        variant="outlined"
        startIcon={<FcGoogle />}
        style={{
          maxWidth: '90vw',
          textTransform: 'none',
          color: '#242A2D',
          borderRadius: '9999px',
          padding: '10px 20px',
          fontSize: '16px',
          width: '34rem',
          height: '2.5rem',
          border: '1px solid #90A4AE'
        }}
      >
        Continue with Google
      </Button>
    </div>
  );
};

export default GoogleButton;
