import { AppBar, Box, Button, Container, Drawer, Hidden, IconButton, List, ListItem, ListItemText, Toolbar, Typography,  MenuItem, Menu, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, React} from "react";
import { Link } from "react-router-dom";
import Logo from "../../OneLuxDental/GDC-one-dental.jpg";
    

export const NavbarMUI = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleOpenNavMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <div className="Mobnav">
      <List >
          <ListItem >
                <img src={Logo} width="100%" height="100%" alt="post"></img> 
        </ListItem>
                <ListItem  component={Link} to="/" >
          <ListItemText secondary="Home" />
        </ListItem>
        <ListItem  component={Link} to="/AboutUs">
          <ListItemText secondary="About Us" />
        </ListItem>
        <ListItem  component={Link} to="/Dentists/Panapaan">
          <ListItemText secondary="Panapaan" />
        </ListItem>
        <ListItem  component={Link} to="/Dentists/carmona">
          <ListItemText secondary="Carmona" />
        </ListItem>
        <ListItem  component={Link} to="/Dentists/dasmarinas">
          <ListItemText secondary="Dasmarinas" />
        </ListItem>
        <ListItem  component={Link} to="/Dentists/Rosario">
          <ListItemText secondary="Rosario" />
        </ListItem>
        <ListItem  component={Link} to="/Dentists/Molino">
          <ListItemText secondary="Molino" />
        </ListItem>
        <ListItem  component={Link} to="/Dentists/laspinas">
          <ListItemText secondary="GDC One Lux Dental" />
        </ListItem>
        <ListItem>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#111111' }}>
        <Container maxWidth="xl" sx={{display:{ xs: "flex", md: "block" }, justifyContent:"center"}}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ px: 5, display: { xs: "none", md: "flex" } }}>
              <img src={Logo} width="100" height="100" alt="post"></img>
            </Box>
            <Typography variant="h6" noWrap component="a" sx={{ color: "gold", textDecoration: "none", px: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>GDC One Lux Dental</Link>
            </Typography>
            <Hidden mdDown>
              <Box sx={{ display: { xs: "none", md: "flex", justifyContent: 'center' } }}>
                  <Link to="/dentists"><Button sx={{ color: "white" }}>Dentists</Button></Link>
                  <Link to="/GDC-One-Lux-Dental/AboutUs"><Button sx={{ color: "white" }}>About Us</Button></Link>
                  <Button sx={{ color: "white" }} color="inherit" onClick={handleOpenNavMenu}>Guiban Dental Clinics</Button>
          
              </Box>
  
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <MenuItem onClick={handleCloseNavMenu}  >
              <Link to="/Dentists/Panapaan"><Button sx={{ color: "White", background:"pink" ,transition: "none" ,
          "&:hover": {
            background: "pink"}}} variant="contained">Panapaan</Button></Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}  >
              <Link to="/Dentists/Dasmarinas"><Button sx={{ color: "White", background:"pink" ,transition: "none" ,
          "&:hover": {
            background: "pink"}}} variant="contained">Dasmarinas</Button></Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}  >
              <Link to="/Dentists/Rosario"><Button sx={{ color: "White", background:"pink" ,transition: "none" ,
          "&:hover": {
            background: "pink"}}} variant="contained">Rosario</Button></Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} >
              <Link to="/Dentists/Molino"><Button sx={{ color: "White", background:"pink" ,transition: "none" ,
          "&:hover": {
            background: "pink"}}} variant="contained">Molino</Button></Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu} >
              <Link to="/Dentists/Carmona"><Button sx={{ color: "White", background:"pink" ,transition: "none",
          "&:hover": {
            background: "pink"} }} variant="contained">Carmona</Button></Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu} >
              <Link to="/Dentists/Laspinas"><Button sx={{ color: "#FFD700", background:"#000000" ,
          "&:hover": {
            background: "#000000"}}} variant="contained">GDC One Lux Dental</Button></Link>
              </MenuItem>
              </Menu>
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
          <Box sx={{ mr: 2, display: { xs: "flex", md: "none" }}}>
                <img src={Logo} width="100" height="100" alt="post"></img> 
                </Box>
        </Container>
      </AppBar>
    </Box>
  );
};
