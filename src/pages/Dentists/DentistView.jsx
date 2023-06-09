import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Stack,
  Container,
  Grid,
  Modal,
} from "@mui/material";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";

const DentistsView = () => {
  const { id } = useParams();
  const [dentists, setDentists] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [nextId, setNextId] = useState(null);
  const [prevId, setPrevId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    let url = `http://localhost:5000/api/dentists/${id}`;

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

    fetch('http://localhost:5000/api/dentists')
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

  const [profilePicture, setProfilePicture] = useState(null);
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleProfilePictureUpload = () => {
    if (profilePicture) {
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);

      let url = `http://localhost:5000/api/dentists/profile-pic/${id}`;

      const requestOptions = {
        method: "PUT",
        body: formData,
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((json) => {
          const updatedDentist = {
            ...dentists,
            profilePicture: json.profilePicture,
          };
          setDentists(updatedDentist);
          setProfilePicture(null);
        })
        .then(() => navigate(`/dentists/${id}`))
        .catch((error) => console.log(error));
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      let url = `http://localhost:5000/api/dentists`;

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      };

      fetch(url, requestOptions)
        .then(() => {
          navigate("/dentists");
        })
        .catch((error) => console.log(error));
    }
  };
  const handleProfilePictureClick = () => {
    openModal(imgurl);
  };
  const imgurl = `http://localhost:5000/${dentists.profilePicture}`;

  return (
    <>
      <NavbarMUI />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#F2E7EB",
          fontFamily: "cursive",
        }}
      >
        <Typography variant="h4" sx={{ my: 5 }} align="center" color="palevioletred">
          Dentists Details
        </Typography>
        <Typography variant="h4" sx={{ my: 5 }} align="center" color="palevioletred">
          {dentists.dentistsId}
        </Typography>

        {loading ? (
          <Typography variant="h4" sx={{ my: 5 }} align="center">
            Loading...
          </Typography>
        ) : (
          <Container maxWidth="sm">
{dentists.profilePicture && (
  <Box textAlign="center" my={4} >
    <Stack direction="column" alignItems="center" spacing={2}>
      <Box onClick={handleProfilePictureClick}>
      <img
        src={imgurl}
        alt="Profile"
        width={200}
        height={200}
        style={{ borderRadius: "50%", objectFit: "cover" }}
      />
      </Box>

      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePictureChange}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleProfilePictureUpload}
      >
        Update Profile Picture
      </Button>
    </Stack>
  </Box>
)}


            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Name:</Typography>
                  <Typography variant="h6">{dentists.name}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Email:</Typography>
                  <Typography variant="h6">{dentists.email}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Contact Number:</Typography>
                  <Typography variant="h6">+63 {dentists.contact_number}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Age:</Typography>
                  <Typography variant="h6">{dentists.age}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Gender:</Typography>
                  <Typography variant="h6">{dentists.gender}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">PRC Number:</Typography>
                  <Typography variant="h6">{dentists.prc_number}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">PTR Number:</Typography>
                  <Typography variant="h6">{dentists.ptr_number}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Branch:</Typography>
                  <Typography variant="h6">{dentists.branches}</Typography>
                </Stack>
              </Grid>
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
          <Link to={`/dentists/${prevId}`}>
            <Button variant="contained" color="primary">
              Previous Dentist
            </Button>
          </Link>
        )}

        {/* Next Dentist Button */}
        {nextId && (
          <Link to={`/dentists/${nextId}`}>
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
                  <Link to={`/dentists/edit/${dentists._id}`}>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Link to="/dentists/new">
                    <Button variant="contained" color="primary">
                      Add
                    </Button>
                  </Link>
                  <Link to={`/dentists/edit/update/${dentists._id}`}>
                    <Button variant="contained" color="primary">
                      Update
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

export default DentistsView;



