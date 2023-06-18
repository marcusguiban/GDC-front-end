import React, { useState} from "react";
import { NavbarMUI } from "../GDCOneLuxDental/Navbar";
import { FooterMUI } from "../GDCOneLuxDental/footer";
import { Box, Container, Grid, Modal, Typography } from "@mui/material";
import DrZee from "../../images/DrZee.jpg"

const AboutUsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const openModal = (image) => {
        setModalImage(image);
        setIsModalOpen(true);
      };
      const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
      };
    const handleProfilePictureClick = () => {
        openModal(DrZee);
      };
  return (
    <>
    <NavbarMUI />
    <Box className="LuxBG">
        

        
    <Container sx={{py:10}}>
    <Grid container>
        <Grid item md={6} sm={12} sx={12}> 
    <Box onClick={handleProfilePictureClick}>
      <img src={DrZee} alt="Profile" width={400} height={400}
        style={{ borderRadius: "50%", objectFit: "cover" }}
      />
      </Box>
      </Grid>
      <Grid item md={6} sm={12} sx={12}> 
      <Typography variant="h3"  color={"gold"} sx={{pt:20}}> Dr. Zandra Filoteo </Typography>
      <Typography variant="h5"  color={"gold"} sx={{pb:10}}> President </Typography>
      </Grid>
      </Grid>
    <Typography variant="h4"  color={"gold"} sx={{pt:10, pb:2}}> Welcome Message </Typography><br></br>
    <Typography variant="p"  color={"gold"} > Dear Valued Patients, </Typography><br></br>
    <Typography variant="p"  color={"gold"} > Welcome to GDC One Lux Dental. It is our pleasure to provide you with
            the best dental care possible. Our team of highly trained and
            experienced dentists, hygienists, and staff are committed to providing
            you with a comfortable, relaxing, and stress-free experience. <br></br><br></br>

            At GDC One Lux Dental, we understand that dental visits can be a
            daunting experience for many people. That is why we have created a
            warm and welcoming environment that puts you at ease from the
            moment you walk in. We believe in taking a personalized approach to
            dental care, and we will work with you to create a treatment plan that is
            tailored to your unique needs and goals. Our goal is to help you
            achieve a healthy, beautiful smile that you can be proud of. Thank you
            for choosing us as your dental care provider, and we look forward to
            serving you soon.</Typography>
            <Typography variant="h4"  color={"gold"} sx={{pt:10, pb:2}}>About our Clinic</Typography>
            <Typography variant="p"  color={"gold"} >
            We believe that dental care should be a luxurious experience. We are a premium
            dental clinic that offers a range of high-end dental services to help you achieve the
            perfect smile. <br></br><br></br>

            Our clinic is equipped with state-of-the-art technology and staffed by a team of
            highly qualified and experienced dental professionals who are committed to
            providing exceptional care to our patients. We believe in using the latest techniques
            and procedures to ensure that our patients receive the best possible care.<br></br><br></br>

            At GDC One Lux Dental, we offer a range of services that are designed to meet the
            unique needs of each patient. Our services include general dentistry, cosmetic
            dentistry, orthodontics, oral surgery, and more.<br></br><br></br>

            We are committed to providing exceptional dental care to our patients. We believe
            that everyone deserves a beautiful smile, and we are dedicated to helping our
            patients achieve their dental goals.<br></br><br></br>
            </Typography>
            <Typography variant="h4"  color={"gold"} sx={{pt:10, pb:2}}>Our Mission</Typography>
            <Typography variant="p"  color={"gold"} >
            Our mission at GDC One Lux Dental is to provide exceptional dental care that
            exceeds our patients' expectations. We strive to create a luxurious and
            welcoming environment where our patients feel comfortable and relaxed while
            receiving the highest quality dental services. We are dedicated to using the
            latest techniques and technologies to provide personalized care that meets
            the unique needs of each patient.
            </Typography>
            <Typography variant="h4"  color={"gold"} sx={{pt:10, pb:2}}>Our Vission</Typography>
            <Typography variant="p"  color={"gold"} >
            Our vision at GDC One Lux Dental is to be the leading provider of luxury dental
            care in our community. We aim to set the standard for exceptional dental care
            by offering a range of high-end services and amenities that are tailored to
            meet our patients' needs. We strive to exceed our patients' expectations by
            providing personalized care that is delivered with the utmost professionalism
            and compassion. Our goal is to help our patients achieve and maintain a
            healthy, beautiful smile that they can be proud of for years to come.
            </Typography>
    <Modal open={isModalOpen} onClose={closeModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {modalImage && (
              <img
                src={modalImage}
                alt="Profile"
                style={{ maxHeight: "90vh", maxWidth: "90vw" }}
              />
            )}
          </Box>
        </Modal>
    </Container>
    <FooterMUI />
    </Box>
    </>
  );
};

export default AboutUsPage;
