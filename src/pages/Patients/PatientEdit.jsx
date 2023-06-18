import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Typography, Box, Button, Stack, TextField, Grid, Container, InputAdornment, MenuItem } from "@mui/material"
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";

const PatientEdit = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({
    first_name: "",
    middleName: "",
    lastName: "",
    age: 0,
    email: "",
    contactNumber: "",
    id: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/patients/${id}`;

    const controller = new AbortController();

    const requestOptions = {
      method: "GET",
      headers: {
        signal: controller.signal,
        "Content-Type": "application/json",

      },
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => setPatient(json));

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleChanged = (e) => {
    setPatient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_API_URL}/patients`;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: patient.firstName,
        lastname: patient.lastname,
        middleName: patient.middleName,
        prefix: patient.prefix,
        email: patient.email,
        gender: patient.gender,
        birthday: patient.birthday,
        contactNumber: patient.contactNumber,
        branches: patient.branches,
        id: id
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then(() => navigate(`/patients/${id}`))
      .catch((error) => console.log(error));
  };
  function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) {
      return ""; // Return an empty string or any default value when phoneNumber is undefined
    }
    const cleaned = phoneNumber.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  }
  return (
    <>
    <NavbarMUI />
    <div style={{ backgroundColor: "#F6E7EA", transition: "background-color 0.5s ease",minHeight: "100vh",}}
    >
      <Container sx={{ mt: 0, mb: 0 }} justifyContent="center">
        <Typography variant="h4" sx={{ px: 2, py: 3 }} align="center" color="palevioletred" >Edit Dentists</Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 5, px: 3, py: 5, maxWidth: 500, margin: "0 auto" }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField helperText="Full Name" variant="standard" type="text" required name="firstName" onChange={handleChanged} value={patient.firstName} fullWidth/>
            </Grid>
            <Grid item xs={12}>
              <TextField helperText="Last Name" variant="standard" type="text" required name="lastname" onChange={handleChanged} value={patient.lastname} fullWidth/>
            </Grid>
            <Grid item xs={12}>
              <TextField helperText="Middle Name" variant="standard" type="text" name="middleName" onChange={handleChanged} value={patient.middleName} fullWidth/>
            </Grid>
            <Grid item xs={12}>
              <TextField helperText="Prefix" variant="standard" type="text" name="prefix" onChange={handleChanged} value={patient.prefix} fullWidth/>
            </Grid>
            <Grid item xs={12}>
              <TextField helperText="Email" variant="standard" type="email" name="email" onChange={handleChanged} value={patient.email} fullWidth/>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth helperText="Contact Number" variant="standard" type="tel" required unique name="contactNumber" onChange={(e) => {
                  const phoneNumber = e.target.value.replace(/\D/g, "");
                  const formattedNumber = phoneNumber.slice(-10);
                  setPatient((prev) => ({ ...prev, contactNumber: formattedNumber }));
                }}
                value={formatPhoneNumber(patient.contactNumber)} InputProps={{ startAdornment: <InputAdornment position="start">+63</InputAdornment> }}
                inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}", onInvalid: (e) => {
                    e.target.setCustomValidity("Please input a valid 10-digit phone number");
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth helperText="Birthday" variant="standard" type="date" required name="birthday"  onChange={handleChanged} value={patient.birthday}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth helperText="Select Gender" select variant="standard" type="text" required name="gender" onChange={handleChanged} value={patient.gender}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              </Grid>

              <Grid item xs={12}>
              <TextField helperText="Select Location" select variant="standard" type="text" fullWidth required name="branches" onChange={handleChanged} value={patient.branches}>
                <MenuItem value="Carmona">Carmona</MenuItem>
                <MenuItem value="Molino">Molino</MenuItem>
                <MenuItem value="Rosario">Rosario</MenuItem>
                <MenuItem value="Dasmarinas">Dasmarinas</MenuItem>
                <MenuItem value="Las pinas">Las Pinas</MenuItem>
              </TextField>
              </Grid>
          </Grid>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ px: 2, pb: 2, pt: 2 }}>
            <Button type="submit" value="Update" variant="outlined" size="large">
              Edit
            </Button>
            <Link to={`/patients/edit/Change-password/${patient._id}`}>
                  <Button variant="contained" color="primary">
                    Change password
                  </Button>
                </Link>
          </Stack>
        </Box>
      </Container>
    </div>
    <FooterMUI />
  </>
  );
};

export default PatientEdit;
