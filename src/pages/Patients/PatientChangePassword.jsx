import React, { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, Button, TextField, Grid, Container } from "@mui/material";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";

const PatientChangePassword = () => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [passwords, setPasswords] = useState({
    password: " ",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    let url = `http://localhost:5000/api/patients/${id}`;

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
      .then((json) => setPasswords(json));

    return () => {
      controller.abort();
    };
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `http://localhost:5000/api/patients/Change-password`;
  
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passwords.password,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword,
        id: id,
      }),
    };
  
    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to change password.");
        }
      })
      .then(() => navigate(`/patients/${id}`))
      .catch((error) => setError(error.message));
  };

  return (
    <>
      <NavbarMUI />
      <div
        style={{
          backgroundColor: "#F6E7EA",
          transition: "background-color 0.5s ease",
          minHeight: "100vh",
        }}
      >
        <Container sx={{ mt: 0, mb: 0 }} justifyContent="center">
          <Typography variant="h4" sx={{ px: 2, py: 3 }} align="center" color="palevioletred">
            Change Password
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ mt: 5, px: 3, py: 5, maxWidth: 500, margin: "0 auto" }}
          >
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>

              <TextField
  fullWidth
  variant="standard"
  type="password"
  name="password"
  label="Current Password"
  value={passwords.password}
  onChange={handleInputChange}
  required
  inputProps={{ style: { color: "black" } }}
/>

{error && (
  <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
    {error}
  </Typography>
)}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  type="password"
                  name="newPassword"
                  label="New Password"
                  value={passwords.newPassword}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  type="password"
                  name="confirmPassword"
                  label="Confirm New Password"
                  value={passwords.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ pt: 2 }}>
              <Button type="submit" variant="outlined" size="large">
                Change Password
              </Button>
            </Grid>
          </Box>
        </Container>
      </div>
      <FooterMUI />
    </>
  );
};

export default PatientChangePassword;
