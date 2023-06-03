import React from "react";
import { NavbarMUI } from "./Navbar";
import { FooterMUI } from "./footer";
import HomeIMG from "../../images/Homepage.png"
import { Container, Grid, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
        <NavbarMUI />
        <Container sx={{px:10, py:10}}>
        <h1>Welcome!</h1>
        <img src={HomeIMG} className="img1" alt="logo"></img>
            <Grid container spacing={2}>
                <Grid item  sm={12} md={6} lg={3}>
                    <Stack direction="row" justifyContent={"center"}>
                        <Link to="/dentists/panapaan"><Button justifycontent="center" size="lg" variant="outlined" color="secondary">Panapaan</Button></Link>
                    </Stack>
                </Grid>
                <Grid item  sm={12} md={6} lg={2}>
                    <Stack direction="row" justifyContent={"center"}>
                        <Link to="/dentists/Molino"><Button size="lg" variant="outlined" color="secondary" >Molino</Button></Link>
                    </Stack>
                </Grid>
                <Grid item  sm={12} md={6} lg={3}>

                    <Stack direction="row" justifyContent={"center"}>
                        <Link to="/dentists/Dasmarinas"><Button size="lg" variant="outlined" color="secondary" >Dasmarinas</Button></Link>
                    </Stack>
                </Grid>
                <Grid item  sm={12} md={6} lg={2}>
                    <Stack direction="row" justifyContent={"center"}>
                        <Link to="/dentists/Rosario"><Button size="lg" variant="outlined" color="secondary">Rosario</Button></Link>
                    </Stack>
                </Grid>
                <Grid item  sm={12} md={6} lg={2}>
                    <Stack direction="row" justifyContent={"center"}>
                        <Link to="/dentists/Carmona"><Button size="lg" variant="outlined" color="secondary">Carmona</Button></Link>
                    </Stack>
                </Grid>
                <Grid item  sm={12} md={6} lg={2}>
                    <Stack direction="row" justifyContent={"center"}>
                        <Link to="/dentists/Laspinas"><Button size="lg" variant="outlined" color="secondary">Las Pinas</Button></Link>
                    </Stack>
                </Grid>
            </Grid>
        </Container>

        <FooterMUI />
        </>

    );
};
export default HomePage;
