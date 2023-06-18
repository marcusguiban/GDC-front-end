import React, { useEffect, useRef } from "react";
import { NavbarMUI } from "./Navbar";
import { FooterMUI } from "./footer";
import HomeIMG from "../../images/Homepage.png";
import Image1 from "../../images//info5.jpg";
import Image2 from "../../images/info4.jpg";
import Walkin from "../../images/info6.jpg";
import Panapaan1 from "../../images/Panapaan1.jpg";
import { Container, Grid, Stack, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ContactUsEmailSender from "./ContactUs";
import OneLuxDental from "../../OneLuxDental/One-Lux-Clinic1.jpg"
const HomePage = () => {
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { current: image1 } = image1Ref;
      const { current: image2 } = image2Ref;

      if (image1 && image2) {
        const image1Position = image1.getBoundingClientRect().top;
        const image2Position = image2.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (image1Position < windowHeight) {
          image1.style.opacity = 1;
        }

        if (image2Position < windowHeight) {
          image2.style.opacity = 1;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <NavbarMUI />
      <div className="background">
        <Container sx={{ px: { xs: 1, sm: 5 }, py: { xs: 1, sm: 5 }, }}>
          <Grid item sm={12}>
            <img src={HomeIMG} className="img1" alt="logo" />
            <Typography variant="h3" align="center" color={"palevioletred"}
                    sx={{
                        fontSize: {
                          xs: "24px",
                          sm: "32px",
                          md: "40px",
                          lg: "50px",
                        }, pt:5, 
                      }}
            >Discover exceptional dental care for a radiant smile you'll adore.</Typography>
           
          </Grid>
          <Grid container sx={{ px: { xs: 1, sm: 5 }, py: { xs: 1, sm: 5 } }}>
  <Grid item sx={12} md={6}>
    <img src={Walkin} className="img1" alt="logo" style={{ width: "100%", maxWidth: "600px" }}/>
  </Grid>
  <Grid item sx={12} md={6}>
    <Typography variant="h4" align="center" color="palevioletred"
      sx={{
        fontSize: {
          xs: "20px",
          sm: "28px",
          md: "36px",
          lg: "44px",
        },
        pt: { xs: 1, sm: 5 }, px:{ xs: 1, sm: 5 }
      }}
    >
      Experience outstanding care as you visit us daily from 9:00am to 5:00pm.
    </Typography>
  </Grid>
</Grid>     
          <Grid container>
          <Grid xs={12} md={6}
          ref={image1Ref}
          style={{
            opacity: 0,
            transition: "opacity 1s ease",
            marginTop: "50px",
            textAlign: "center", 
          }}
        >
          <img
            src={Image1}
            alt="image1"
            style={{ width: "100%", maxWidth: "500px" }}
          />
        </Grid>
        <Grid item xs={12} md={6}
          ref={image2Ref}
          style={{
            opacity: 0,
            transition: "opacity 1s ease",
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          <img
            src={Image2}
            alt="image2"
            style={{ width: "100%", maxWidth: "500px" }}
          />
        </Grid>
          </Grid>
          <Container sx={{ px: { xs: 1, sm: 5 }, py: { xs: 1, sm: 5 } }}>
          <Typography variant="h3" align="center" color={"palevioletred"}
                    sx={{
                        fontSize: {
                            xs: "20px",
                            sm: "28px",
                            md: "36px",
                            lg: "44px",
                        }, pt: { xs: 1, sm: 5 }, px:{ xs: 1, sm: 5 }
                      }}
            >Explore our clinic branches for top-notch dental care near you!</Typography>
          </Container>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Stack direction="row" justifyContent={"center"}>
              <Grid className="Clinics">
            <Link to="/dentists/panapaan" className="link">
                <Stack>
                <img src={Panapaan1} alt="Panapaan" style={{ width: "100%", maxHeight: "300px" }}/>
                </Stack>
                <Stack>
                <Typography variant="p"  className="link-text">2nd floor, Fynn Commercial Complex, Panapaan 4, Bacoor, Cavite, Bacoor, Philippines</Typography>
                </Stack>
                <Stack>
                <Button justifycontent="center" size="lg" variant="contained" style={{ backgroundColor: "#FFC0CB", color: "#FFFFFF"}}>
                <Typography>Panapaan</Typography>
                </Button>
                </Stack>

            </Link>
            </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Stack direction="row" justifyContent={"center"}>
              <Grid className="Clinics">
            <Link to="/dentists/Molino" className="link">
                <Stack>
                <img src={Panapaan1} alt="Panapaan" style={{ width: "100%", maxHeight: "300px" }}/>
                </Stack>
                <Stack>
                <Typography variant="p"  className="link-text">3rd Floor, Avon Bldg., L. 2 Blk. 3, Molino Road, Molino 3, Molino, Bacoor City, Cavite</Typography>
                </Stack>
                <Stack>
                <Button justifycontent="center" size="lg" variant="contained" style={{ backgroundColor: "#FFC0CB", color: "#FFFFFF" }}>
                <Typography>Molino</Typography>
                </Button>
                </Stack>
            </Link>
            </Grid>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Stack direction="row" justifyContent={"center"}>
              <Grid className="Clinics">
            <Link to="/dentists/Dasmarinas" className="link">
                <Stack>
                <img src={Panapaan1} alt="Panapaan" style={{ width: "100%", maxHeight: "300px" }}/>
                </Stack>
                <Stack>
                <Typography variant="p"  className="link-text">L.E.A Building 084, Palapala, Sampaloc 1, Dasmarinas, Cavite</Typography>
                </Stack>
                <Stack>
                <Button justifycontent="center" size="lg" variant="contained" style={{ backgroundColor: "#FFC0CB", color: "#FFFFFF" }}>
                <Typography>Dasmarinas</Typography>
                </Button>
                </Stack>
            </Link>
            </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Stack direction="row" justifyContent={"center"}>
              <Grid className="Clinics">
            <Link to="/dentists/Rosario" className="link">
                <Stack>
                <img src={Panapaan1} alt="Panapaan" style={{ width: "100%", maxHeight: "300px" }}/>
                </Stack>
                <Stack>
                <Typography variant="p"  className="link-text">RRE Bld, Blk4 Lot 14 Costaverde Subd. Tejeros Convention Rosario, Cavite</Typography>
                </Stack>
                <Stack>
                <Button justifycontent="center" size="lg" variant="contained" style={{ backgroundColor: "#FFC0CB", color: "#FFFFFF" }}>
                <Typography>Rosario</Typography>
                </Button>
                </Stack>
            </Link>
            </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Stack direction="row" justifyContent={"center"}>
              <Grid className="Clinics">
            <Link to="/dentists/Carmona" className="link">
                <Stack>
                <img src={Panapaan1} alt="Panapaan" style={{ width: "100%", maxHeight: "300px" }}/>
                </Stack>
                <Stack>
                <Typography variant="p"  className="link-text">Lot 3 Blk 5 GF JabezTech Bldg. Macaria Business Center Carmona, Cavite</Typography>
                </Stack>
                <Stack>
                <Button justifycontent="center" size="lg" variant="contained" style={{ backgroundColor: "#FFC0CB", color: "#FFFFFF" }}>
                <Typography>Carmona</Typography>
                </Button>
                </Stack>
            </Link>
            </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Stack direction="row" justifyContent={"center"}>
              <Grid className="GDCOneLuxDental">
            <Link to="/dentists/Laspinas" className="link">
                <Stack>
                <img src={OneLuxDental} alt="Panapaan" style={{ width: "100%", maxHeight: "300px" }}/>
                </Stack>
                <Stack>
                <Typography variant="p"  className="link-text-One">VOR Building, No.478 Alabang Zapote Road Barangay Almanza Uno Las Pinas City (in front of Excelsior Hotel)</Typography>
                </Stack>
                <Stack>
                <Button justifycontent="center" size="lg" variant="contained" style={{ backgroundColor: "#FFD700", color: "#000000" }}>
                <Typography>GDC One Lux Dental</Typography>
                </Button>
                </Stack>
            </Link>
            </Grid>
              </Stack>
            </Grid>

          </Grid>
          <ContactUsEmailSender />
          <iframe
          src="https://www.youtube.com/embed/kVWfeBSM0fQ"
          title="YouTube video player"
          width="100%"
          height="415"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
        </Container>

      </div>
      <FooterMUI />
    </>
  );
};

export default HomePage;
