import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, Stack, Container, TextField, MenuItem } from "@mui/material";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";

const PatientCreate = () => {
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    password: "",
    contact_number: "",
    birthday: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create patient");
        }
      })
      .then((data) => {
        navigate("/patients");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <NavbarMUI />
      <div style={{ backgroundColor: "#F6E7EA", transition: "background-color 0.5s ease", minHeight: "100vh" }}>
        <Container sx={{ pt: 10, mb: 0 }}>
          <Typography variant="h4" align="center">
            Add New Patient
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5, px: 3, py: 5, maxWidth: 500, margin: "0 auto" }}>
            <Stack spacing={2}>
              <TextField helperText="Full Name" variant="standard" type="text" required name="name" onChange={handleChange} value={patient.name} />
              <TextField helperText="Email" variant="standard" type="email" required name="email" value={patient.email} onChange={handleChange} />
              <TextField
                helperText="Password"
                variant="standard"
                type="password"
                required
                name="password"
                value={patient.password}
                onChange={handleChange}
              />
              <TextField
                helperText="Contact Number"
                variant="standard"
                type="tel"
                required
                name="contactNumber"
                onChange={handleChange}
                value={patient.contactNumber}
              />
              <TextField helperText="Birthday" variant="standard" type="date" required name="birthday" onChange={handleChange} value={patient.birthday} />
              <TextField helperText="Select Gender" select variant="standard" type="text" required name="gender" onChange={handleChange} value={patient.gender}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField helperText="Select Location" select variant="standard" type="text" required name="branches" onChange={handleChange} value={patient.branches}>
                <MenuItem value="Carmona">Carmona</MenuItem>
                <MenuItem value="Molino">Molino</MenuItem>
                <MenuItem value="Rosario">Rosario</MenuItem>
                <MenuItem value="Dasmarinas">Dasmarinas</MenuItem>
                <MenuItem value="Las pinas">Las Pinas</MenuItem>
              </TextField>
              <Button type="submit" variant="outlined">
                Save
              </Button>
            </Stack>
          </Box>
        </Container>
      </div>
      <FooterMUI />
    </>
  );
};

export default PatientCreate;
