import { Container, Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container style={{ padding: "2rem" }}>
      <Box display='flex' justifyContent='center'>
        <Typography variant='h3'>Page Not Found</Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
