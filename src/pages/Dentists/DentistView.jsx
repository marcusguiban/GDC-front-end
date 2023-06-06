import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Typography, Box, Button, Stack, Container, Grid } from "@mui/material";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";

const DentistsView = () => {
  const { id } = useParams();
  const [dentists, setDentists] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    return () => {
      controller.abort();
    };
  }, [id]);
  const [profilePicture, setProfilePicture] = useState(null);
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };
  const handleProfilePictureUpload = () => {
    if (profilePicture) {
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);
  
      let url = `${process.env.REACT_APP_API_URL}/api/dentists/profile-pic/${id}`;
  
      const requestOptions = {
        method: "PUT",
        body: formData,
      };
  
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((json) => {
          const updatedDentist = { ...dentists, profilePicture: json.profilePicture };
          setDentists(updatedDentist);
          setProfilePicture(null);
        })
        .then(() => navigate(`/dentists/${id}`))
        .catch((error) => console.log(error));
    }
  };
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      let url = `${process.env.REACT_APP_API_URL}/api/dentists`;

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

  const imgurl = `${process.env.REACT_APP_API_URL}/${dentists.profilePicture}`;

  return (
    <>
      <NavbarMUI />
      <Box sx={{px: 5, py: 5, backgroundColor: "#F2E7EB", minHeight: "100vh", fontFamily: "cursive",}}>
        <Typography variant="h4" sx={{ mx: 5, my: 5 }} align="center" color="palevioletred">
          Dentists Details
        </Typography>
        <Typography variant="h4" sx={{ mx: 5, my: 5 }} align="center"color="palevioletred">
          {dentists.dentistsId}
        </Typography>

        {loading ? (
          <Typography variant="h4" sx={{ mx: 5, my: 5 }} align="center">
            Loading...
          </Typography>
        ) : (
          <Container>
            <Grid container spacing={2} justifyContent="center">
              {dentists.profilePicture && (
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="center">
                  <img
        src={imgurl}
        alt="Profile"
        width={200}
        height={200}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
                  </Stack>
                  <input
      type="file"
      accept="image/*"
      onChange={handleProfilePictureChange}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={handleProfilePictureUpload}
    >
      Update Profile Picture
    </Button>
                </Grid>
              )}

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
                  <Typography variant="h6">
                    +63 {dentists.contact_number}
                  </Typography>
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

              <Grid item xs={12} textAlign="center">
                <Stack direction="row" spacing={2} justifyContent="center">
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


