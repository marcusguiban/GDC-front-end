import { AppBar, Box, Button, Container, Drawer, Hidden, IconButton, List, ListItem, ListItemText, Toolbar, Typography, Stack, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, React} from "react";
import { Link } from "react-router-dom";
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
                <ListItem >
                <img src={Logo} width="100" height="100" alt="post"></img> 
        </ListItem>
      <ListItem  component={Link} to="/login">
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem  component={Link} to="/dentists">
          <ListItemText primary="Doctors" />
        </ListItem>
        <ListItem  component={Link} to="/Dentists/Panapaan">
          <ListItemText primary="Panapaan" />
        </ListItem>
        <ListItem  component={Link} to="/Dentists/carmona">
          <ListItemText primary="Carmona" />
        </ListItem>
        <ListItem  component={Link} to="/Dentists/dasmarinas">
          <ListItemText primary="Dasmarinas" />
        </ListItem>
        <ListItem  component={Link} to="/Dentists/Rosario">
          <ListItemText primary="Rosario" />
        </ListItem>
        <ListItem  component={Link} to="/Dentists/Molino">
          <ListItemText primary="Molino" />
        </ListItem>
        <ListItem  component={Link} to="/Dentists/laspinas">
          <ListItemText primary="Las Pinas" />
        </ListItem>
        <ListItem>
          <Stack direction="row" spacing={4} color="white" >
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
                  <Link to="/dentists"><Button sx={{ color: "white" }}>Dentists</Button></Link>
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
            <Box sx={{ mr: 2, display: { xs: "flex", md: "none" }}}>
                <img src={Logo} width="100" height="100" alt="post"></img> 
                </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
