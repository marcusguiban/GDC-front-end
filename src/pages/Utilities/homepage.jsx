import React from "react";
import { NavbarMUI } from "./Navbar";
import { FooterMui } from "./footer";
import HomeIMG from "../../images/Homepage.png"
import { Container } from "@mui/material";

const HomePage = () => {
    return (
        <>
        <NavbarMUI />
        <Container sx={{px:10, py:10}}>
        <h1>Welcome!</h1>
        <img src={HomeIMG} className="img1" alt="logo"></img>
        </Container>

        <FooterMui />
        </>

    );
};
export default HomePage;
