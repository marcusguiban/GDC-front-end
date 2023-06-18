import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, Stack, Container, TextField, MenuItem, InputAdornment, IconButton,} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://gdc-back-end.vercel.app/api/patients", {
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
      <div style={{ backgroundColor: "#F6E7EA", transition: "background-color 0.5s ease", minHeight: "100vh" }}>
        <Container sx={{ pt: 10, mb: 0 }}>
          <Typography variant="h4" align="center">
            Add New Patient
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5, px: 3, py: 5, maxWidth: 500, margin: "0 auto" }}>
            <Stack spacing={2}>
              <TextField helperText="First Name" variant="standard" type="text" required name="firstName" onChange={handleChange} value={patient.firstName} />
              <TextField helperText="Last Name" variant="standard" type="text" required name="lastname" onChange={handleChange} value={patient.lastname} />
              <TextField helperText="Middle Name" variant="standard" type="text" name="middleName" onChange={handleChange} value={patient.middleName} />
              <TextField helperText="Prefix" variant="standard" type="text" name="prefix" onChange={handleChange} value={patient.prefix} />
              <TextField helperText="Email" variant="standard" type="email" required name="email" value={patient.email} onChange={handleChange} />
              <TextField helperText="Password" variant="standard" type={showPassword ? "text" : "password"} name="password" value={patient.password} onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword(!showPassword)} onMouseDown={(e) => e.preventDefault()}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
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
