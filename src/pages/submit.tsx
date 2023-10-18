import Header from '@/components/subpages/Header';
import { Box, Typography } from '@mui/material';

export default function Submission() {
  return (
    <>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4">Thanks for submitting a form!</Typography>
      </Box>
    </>
  );
}
