import {  AppBar, Container, Stack, Toolbar, Typography, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MapIcon from '@mui/icons-material/Map';
import { Link } from 'react-router-dom';

export const FooterMUI = () => {
  return (
<AppBar position="static" style={{ background: '#111111' }} sx={{ px: 5, py: 5 }}>
  <Container maxWidth="xl" align="center">
    <Toolbar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Stack direction={{ xs: 'column', md: 'column' }} color="white" textAlign={{ xs: 'center', md: 'center' }}>
            <Typography variant="body1" display="block" gutterBottom>
              Branches
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              <Link to="/Dentists/Panapaan" style={{ color: 'inherit', textDecoration: 'none' }}>Panapaan</Link>
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              <Link to="/Dentists/Rosario" style={{ color: 'inherit', textDecoration: 'none' }}>Rosario</Link>
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              <Link to="/Dentists/Molino" style={{ color: 'inherit', textDecoration: 'none' }}>Molino</Link>
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              <Link to="/Dentists/Dasmarinas" style={{ color: 'inherit', textDecoration: 'none' }}>Dasmarinas</Link>
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              <Link to="/Dentists/Carmona" style={{ color: 'inherit', textDecoration: 'none' }}>Carmona</Link>
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              <Link to="/Dentists/Laspinas" style={{ color: 'inherit', textDecoration: 'none' }}>GDC One Lux Dental</Link>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Stack color="white" textAlign={{ xs: 'center', md: 'center' }}>
            <Typography variant="body1" display="block" gutterBottom>
              Contact us
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              Contact Number:
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              0956-5423-123
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              0956-5423-123
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              Email Us:
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              gdconeluxdental@gmail.com
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} sx={{ pt: 2 }} textAlign={{ xs: 'center', md: 'center' }}>
  <Typography variant="body1" display="block" color="white" gutterBottom>Social Media Links:</Typography>
  <Stack direction="row" spacing={5} color="white" justifyContent="center">
    <Link to="https://www.facebook.com/gdconeluxdental" style={{ color: 'inherit', textDecoration: 'none' }}>
      <FacebookIcon fontSize='large'></FacebookIcon>
    </Link>
    <Link to="https://www.instagram.com/gdconeluxdental" style={{ color: 'inherit', textDecoration: 'none' }}>
      <InstagramIcon fontSize='large'></InstagramIcon>
    </Link>
    <Link to="https://goo.gl/maps/e5X7B4gHe8VaWj2T6" style={{ color: 'inherit', textDecoration: 'none' }}>
      <MapIcon fontSize='large'></MapIcon>
    </Link>
  </Stack>
</Grid>

      </Grid>
    </Toolbar>
  </Container>
</AppBar>

  );
};
