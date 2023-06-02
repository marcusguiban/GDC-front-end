
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography, Stack} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Logo from "../../images/navbar-logo.jpg";
import { Link } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MapIcon from '@mui/icons-material/Map';


  
  export const NavbarMUI = () => {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorEl(null);
    };
  
    return (


 <AppBar position="static" style={{ background: 'pink' }}>

        <Container maxWidth="xl" >
          <Toolbar >
            <Box sx={{ mr: 1, display: { xs: "none", md: "flex" } }}>
            <img src={Logo} width="100" height="100" alt="post"></img>
            </Box>

        <Typography variant="h6" noWrap component="a"  sx={{ color: "white", textDecoration: "none", px:1, display: { xs: "none", md: "flex" },}}> 
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none'}}>Guiban Dental Clinic</Link> 
        </Typography>
            
            <Box sx={{ display: { xs: "none", md: "flex" , justifyContent:'center'}}}>
              <Stack direction={"row"} spacing={2}>
            <Link to="#"><Button sx={{ color: "#6C1444" }}>Login</Button></Link>
            <Link to="#"><Button sx={{ color: "white" }}>Register</Button></Link>
            <Link to="#"><Button sx={{ color: "white" }}>Overview</Button></Link>
            <Link to="/dentists"><Button sx={{ color: "white" }}>Dentists</Button></Link>
            <Link to="#"><Button sx={{ color: "white" }}>Patients</Button></Link>
              </Stack>
                    </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
            </Box>
  
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={handleCloseNavMenu}  >
              <Link to="/login"><Button sx={{ color: "White" }} variant="contained">Login</Button></Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}  >
              <Link to="/register"><Button sx={{ color: "White" }} variant="contained">Register</Button></Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}  >
              <Link to="/Overview"><Button sx={{ color: "White" }} variant="contained">Overview</Button></Link>
              </MenuItem>


              <MenuItem onClick={handleCloseNavMenu} >
              <Link to="/dentists"><Button sx={{ color: "White" }} variant="contained">Doctors</Button></Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu} >
              <Link to="/appointment/new"><Button sx={{ color: "White" }} variant="contained">Set an Appointment</Button></Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu} >
              <Link to="/patient/new"><Button sx={{ color: "White" }} variant="contained">New Patient</Button></Link>
              </MenuItem>

                    <MenuItem onClick={handleCloseNavMenu} >
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Link to="/Panapaan"><Button>Panapaan</Button></Link>
                    <Link to="/Carmona"><Button>Carmona</Button></Link>
                    <Link to="/Dasmarinas"><Button>Dasmarinas</Button></Link>
                    <Link to="/Rosario"><Button>Rosario</Button></Link>
                    <Link to="/Molino"><Button>Molino</Button></Link>
                    </ButtonGroup>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} >
              <Stack direction={"row"} spacing={5 } color="white" sx={{px:10}}>
                    <Link href="https://www.facebook.com/guibandentalclinic" style={{ color: 'pink', textDecoration: 'none'}}>
                    <FacebookIcon fontSize='large'></FacebookIcon>
                    </Link>
                    <Link href="https://www.instagram.com/guibandentalclinic/?hl=en" style={{ color: 'pink', textDecoration: 'none'}}>
                    <InstagramIcon fontSize='large'></InstagramIcon>
                    </Link>
                    <Link href="https://www.google.com/maps/place/Guiban+Dental+Clinic+Panapaan+Branch/@14.4471907,120.9506977,17z/data=!3m1!4b1!4m6!3m5!1s0x3397cda0e3f8d9a1:0x337ae87aa24709!8m2!3d14.4471855!4d120.9532726!16s%2Fg%2F11h6q80gpk" style={{ color: 'pink', textDecoration: 'none'}}>
                    <MapIcon fontSize='large'></MapIcon>
                    </Link>
                    </Stack>
                    </MenuItem>
            </Menu>
                <Box sx={{ mr: 2, display: { xs: "flex", md: "none" } }}>
                <img src={Logo} width="100" height="100" alt="post"></img>
                </Box>

            
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#"
              sx={{
                flexGrow: 1,
                color: "inherit",
                textDecoration: "none",
                display: { xs: "flex", md: "none" },
              }}
            >
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none'}}>Guiban Dental Clinic</Link> 
            </Typography>
          </Toolbar>
        </Container>
      </AppBar> 


    );
  };