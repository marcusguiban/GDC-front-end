import React from "react";
import { Container, Typography,  Box, Grid } from "@mui/material";
import { NavbarMUI } from "../GDCOneLuxDental/Navbar";
import { FooterMUI } from "../GDCOneLuxDental/footer";
import Post1 from "../../OneLuxDental/One-Lux-Post1.jpg"
import Clinic1 from "../../OneLuxDental/One-Lux-Clinic1.jpg"
import Clinic2 from "../../OneLuxDental/One-Lux-Clinic2.jpg"
import Clinic3 from "../../OneLuxDental/One-Lux-Clinic3.jpg"
import Clinic4 from "../../OneLuxDental/One-Lux-Clinic4.jpg"
import Post2 from "../../OneLuxDental/One-Lux-Post2.jpg";
import DrZee from "../../OneLuxDental/One-Lux-Dr_Zee.jpg"
import DrBell from "../../OneLuxDental/One-Lux-Dr_Bel.jpg"



const DentistLasPinas = () => {
  // const [dentists, setdentists] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const controller = new AbortController();

  //   let url = `${process.env.REACT_APP_API_URL}/dentists/LasPinas`;

  //   const requestOptions = {
  //     signal: controller.signal,
  //     method: "GET"

  //   };

  //   setLoading(true);
  //   fetch(url, requestOptions)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setdentists(json);
  //       setLoading(false);
  //     });

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  return (
    <>
    <NavbarMUI />
    <Box  className="LuxBG">
    <Container sx={{py:10}}>
    <Typography variant="h4" align="center" color={"gold"} sx={{pb:10}}> CREATORS OF GOLD STANDARD SMILES </Typography>
    <Grid item md={6} sm={12} align="center" sx={{pb:5}}>
        <img src={Clinic1} alt="Clinic" style={{ width: "100%", maxHeight: "700px", border: "10px solid #FFC000",  borderRadius: "30px"}}></img>
      </Grid>
      <Grid container>

      <Grid item md={6} sm={12} align="center" sx={{px:2, py:2}}>
        <img src={Clinic3} alt="Clinic" style={{ width: "100%", maxHeight: "500px", border: "10px solid #FFC000",  borderRadius: "30px"}}></img>
      </Grid>
      <Grid item md={6} sm={12} align="center" sx={{px:2, py:2}}>
        <img src={Clinic4} alt="Clinic" style={{ width: "100%", maxHeight: "500px", border: "10px solid #FFC000",  borderRadius: "30px"}}></img>
      </Grid>
      </Grid>
      <Grid container>
      <Typography variant="h3" align="center" color={"#FFC000"} sx={{py:5}}> Get to know our qualified team of esthetic dentists and founders</Typography>
        <Grid item md={6} sm={12} align="center" sx={{ px: 3, py: 3 }}>
            <img src={DrZee} alt="Progress" style={{ width: "100%", maxHeight: "700px" }}></img>
        </Grid>
        <Grid item md={6} sm={12} align="center" sx={{ px: 3, py: 3 }}>
            <img src={DrBell} alt="Progress" style={{ width: "100%", maxHeight: "700px" }}></img>
        </Grid>
      </Grid>

      
    <Grid container>
      <Grid item  sm={12} align="center">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.9364329360833!2d121.01243277563337!3d14.430826886035641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d1bc971c86f5%3A0xb4597a25462a7ec2!2sGDC%20One%20Lux%20Dental!5e0!3m2!1sen!2sph!4v1687020733617!5m2!1sen!2sph" 
        width="100%" 
        height={400} 
        style={{ border: "0" }}
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
        title="Rosario googlemaps">
        </iframe>
        <Typography variant="h5" align="center" color={"#FFC000"} sx={{py:5}}> We are located at VOR Building, No.478 Alabang Zapote Road Barangay Almanza Uno Las Pinas City (in front of Excelsior Hotel)</Typography>
      </Grid>
    </Grid>
    
      <Grid container>
        <Grid item md={6} sm={12} align="center" sx={{ px: 3, py: 3 }}>
            <img src={Post1} alt="Progress" style={{ width: "100%", maxHeight: "700px" }}></img>
        </Grid>
        <Grid item md={6} sm={12} align="center" sx={{ px: 3, py: 3 }}>
            <img src={Post2} alt="Progress" style={{ width: "100%", maxHeight: "700px" }}></img>
        </Grid>
      </Grid>
      <Grid item md={6} sm={12} align="center" sx={{pb:5}}>
        <img src={Clinic2} alt="Clinic" style={{ width: "100%", maxHeight: "700px", border: "10px solid #FFC000",  borderRadius: "30px"}}></img>
      </Grid>
    </Container>
    </Box>
    <FooterMUI />
    </>
  );
};

export default DentistLasPinas;