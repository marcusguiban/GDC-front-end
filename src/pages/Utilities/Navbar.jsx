import { AppBar, Box, Button, Container, Drawer, Hidden, IconButton, List, ListItem, ListItemText, Toolbar, Typography, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MapIcon from '@mui/icons-material/Map';
import Logo from "../../images/navbar-logo.jpg";

export const NavbarMUI = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem  component={Link} to="/login">
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem  component={Link} to="/register">
          <ListItemText primary="Register" />
        </ListItem>
        <ListItem  component={Link} to="/overview">
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem  component={Link} to="/dentists">
          <ListItemText primary="Doctors" />
        </ListItem>
        <ListItem  component={Link} to="/appointment/new">
          <ListItemText primary="Set an Appointment" />
        </ListItem>
        <ListItem  component={Link} to="/patients/">
          <ListItemText primary="New Patient" />
        </ListItem>
        <ListItem>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button component={Link} to="/panapaan">Panapaan</Button>
            <Button component={Link} to="/carmona">Carmona</Button>
            <Button component={Link} to="/dasmarinas">Dasmarinas</Button>
            <Button component={Link} to="/rosario">Rosario</Button>
            <Button component={Link} to="/molino">Molino</Button>
          </ButtonGroup>
        </ListItem>
        <ListItem>
          <Stack direction="row" spacing={5} color="white" sx={{ px: 10 }}>
            <Link href="https://www.facebook.com/guibandentalclinic" style={{ color: 'pink', textDecoration: 'none' }}>
              <FacebookIcon fontSize='large'></FacebookIcon>
            </Link>
            <Link href="https://www.instagram.com/guibandentalclinic/?hl=en" style={{ color: 'pink', textDecoration: 'none' }}>
              <InstagramIcon fontSize='large'></InstagramIcon>
            </Link>
            <Link href="https://www.google.com/maps/place/Guiban+Dental+Clinic+Panapaan+Branch/@14.4471907,120.9506977,17z/data=!3m1!4b1!4m6!3m5!1s0x3397cda0e3f8d9a1:0x337ae87aa24709!8m2!3d14.4471855!4d120.9532726!16s%2Fg%2F11h6q80gpk" style={{ color: 'pink', textDecoration: 'none' }}>
              <MapIcon fontSize='large'></MapIcon>
            </Link>
          </Stack>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: 'pink' }}>
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ mr: 1, display: { xs: "none", md: "flex" } }}>
              <img src={Logo} width="100" height="100" alt="post"></img>
            </Box>
            <Typography variant="h6" noWrap component="a" sx={{ color: "white", textDecoration: "none", px: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Guiban Dental Clinic</Link>
            </Typography>
            <Hidden mdDown>
              <Box sx={{ display: { xs: "none", md: "flex", justifyContent: 'center' } }}>
                <Stack direction={"row"} spacing={2}>
                  <Link to="#"><Button sx={{ color: "#6C1444" }}>Login</Button></Link>
                  <Link to="#"><Button sx={{ color: "white" }}>Register</Button></Link>
                  <Link to="#"><Button sx={{ color: "white" }}>Overview</Button></Link>
                  <Link to="/dentists"><Button sx={{ color: "white" }}>Dentists</Button></Link>
                  <Link to="/patients"><Button sx={{ color: "white" }}>Patients</Button></Link>
                </Stack>
              </Box>
            </Hidden>
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
            >
              {drawer}
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
