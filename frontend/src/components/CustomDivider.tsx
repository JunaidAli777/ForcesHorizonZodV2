import { Divider, Box } from '@mui/material';

const CustomDivider = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '46rem', maxWidth: '90vw', mt: 2, mb: 0 }}>
      <Divider sx={{ flexGrow: 1, borderColor: '#dcdcdc' }} />
      <span style={{ padding: '0 10px', color: '#b0b0b0', fontSize: '14px', fontFamily: 'sans-serif' }}>OR</span>
      <Divider sx={{ flexGrow: 1, borderColor: '#dcdcdc' }} />
    </Box>
  );
};

export default CustomDivider;
