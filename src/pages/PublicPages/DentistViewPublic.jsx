import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Box, Button, Stack, Container, Grid, Modal, IconButton } from "@mui/material";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";
import { FileCopyOutlined as FileCopyOutlinedIcon } from "@mui/icons-material"; 

const DentistsViewPublic = () => {
  const { id } = useParams();
  const [dentists, setDentists] = useState({});
  const [loading, setLoading] = useState(false);
  const [nextId, setNextId] = useState(null);
  const [prevId, setPrevId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/dentists/${id}`;
    const controller = new AbortController();
    const requestOptions = {
      method: "GET",
      headers: {
        signal: controller.signal,
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        const age = calculateAge(json.birthday);
        const updatedDentist = { ...json, age };
        setDentists(updatedDentist);
        setLoading(false);
      });
    function calculateAge(birthday) {
      const birthDate = new Date(birthday);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDifference =
        currentDate.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 &&
          currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    }

    fetch(`${process.env.REACT_APP_API_URL}/dentists`)
    .then((response) => response.json())
    .then((json) => {
      const dentistIds = json.map(dentist => dentist._id);
      const currentIndex = dentistIds.indexOf(id);
      if (currentIndex > 0) {
        setPrevId(dentistIds[currentIndex - 1]);
      }
      if (currentIndex < dentistIds.length - 1) {
        setNextId(dentistIds[currentIndex + 1]);
      }
    });
  return () => {
    controller.abort();
  };
}, [id]);

const openModal = (image) => {
  setModalImage(image);
  setIsModalOpen(true);
};
const closeModal = () => {
  setIsModalOpen(false);
  setModalImage(null);
};
  const handleProfilePictureClick = () => {
    openModal(imgurl);
  };
  const imgurl = `https://gdc-back-end.vercel.app/${dentists.profilePicture}`;
  const copyText = () => {
    navigator.clipboard.writeText(dentists.dentistsId);
  };

  return (
    <>
      <NavbarMUI />
      <Box className="background">
        <Typography variant="h4" sx={{ my: 5 }} align="center" color="palevioletred">
        Guiban Dental Clinic {dentists.branches}
        </Typography>
        <Typography variant="h4" sx={{ my: 5 }} align="center" color="palevioletred">
          {dentists.dentistsId} <IconButton onClick={copyText}>
            <FileCopyOutlinedIcon />
          </IconButton>
        </Typography>

        {loading ? (
          <Typography variant="h4" sx={{ my: 5 }} align="center">
            Loading...
          </Typography>
        ) : (
          <Container maxWidth="sm">

<Grid container spacing={2}>


<Grid item sm={12} xs={12} md={6} textAlign={"center"}>

{dentists.profilePicture && (
  <Box textAlign="center" my={0} >
    <Stack direction="column" alignItems="center" spacing={2}>
      <Box onClick={handleProfilePictureClick}>
      <img src={imgurl} alt="Profile" width={300} height={300}
        style={{ borderRadius: "50%", objectFit: "cover" }}
      />
      </Box>
    </Stack>
  </Box>
)}
</Grid>
              <Grid item sm={12} xs={12} md={6} >
                <Stack spacing={2} sx={{pt:5, px:5}}>
                  <Typography variant="h6">{dentists.firstName} {dentists.middleName} {dentists.lastname} {dentists.prefix}</Typography>
                  <Typography variant="h6">{dentists.email}</Typography>
                  <Typography variant="h6">+63 {dentists.contact_number}</Typography>
                </Stack>
              </Grid>
</Grid>
            <Grid container spacing={2} sx={{pt:5, px:5}}>
              {dentists.education && (
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Education:</Typography>
                  <Typography variant="h6">{dentists.education}</Typography>
                </Stack>
              </Grid>
              )}
              {dentists.degree && (
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Degree:</Typography>
                  <Typography variant="h6">{dentists.degree}</Typography>
                </Stack>
              </Grid>
              )}
              {dentists.occupation && (
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Occupation:</Typography>
                  <Typography variant="h6">{dentists.occupation}</Typography>
                </Stack>
              </Grid>
              )}
              <Grid item xs={12} textAlign="center">
              <Container maxWidth="sm">
        {/* Previous Dentist Button */}
        {prevId && (
          <Link to={`/dentists/public/${prevId}`}>
            <Button variant="contained" color="primary">
              Previous Dentist
            </Button>
          </Link>
        )}

        {/* Next Dentist Button */}
        {nextId && (
          <Link to={`/dentists/public/${nextId}`}>
            <Button variant="contained" color="primary">
              Next Dentist
            </Button>
          </Link>
        )}
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
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  mt={4}
                >
                  <Link to="/dentists">
                    <Button variant="contained" color="primary">
                      Dentist List
                    </Button>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
      <FooterMUI />
    </>
  );
};

export default DentistsViewPublic;

