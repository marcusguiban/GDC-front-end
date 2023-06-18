import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, Stack, Container, TextField, MenuItem, InputAdornment} from "@mui/material";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";


const AppointmentCreate = () => {
  const [appointment, setAppointment] = useState({
  });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prevAppointment) => ({ ...prevAppointment, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create patient");
        }
      })
      .then((data) => {
        navigate("/appointments");
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
            Add New Appointment
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5, px: 3, py: 5, maxWidth: 500, margin: "0 auto" }}>
            <Stack spacing={2}>
              <TextField helperText="Patient Name" variant="standard" type="text" required name="patientName" onChange={handleChange} value={appointment.patientName} />
              <TextField helperText="Patient ID" variant="standard" type="text" required name="PatientID" onChange={handleChange} value={appointment.PatientID} />
              <TextField helperText="Patient Email" variant="standard" type="email" required name="PatientEmail" value={appointment.PatientEmail} onChange={handleChange} />

            <TextField fullWidth helperText="Contact Number" variant="standard" type="tel" required unique name="PatientContactNumber" onChange={(e) => {
                  const phoneNumber = e.target.value.replace(/\D/g, "");
                  const formattedNumber = phoneNumber.slice(-10);
                  setAppointment((prev) => ({ ...prev, PatientContactNumber: formattedNumber }));
                }}
                value={formatPhoneNumber(appointment.PatientContactNumber)} InputProps={{ startAdornment: <InputAdornment position="start">+63</InputAdornment> }}
                inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}", onInvalid: (e) => {
                    e.target.setCustomValidity("Please input a valid 10-digit phone number");
                  },
                }}
              />
              <TextField helperText="Dentist Name" variant="standard" type="text" name="dentistName" onChange={handleChange} value={appointment.dentistName} />
              <TextField helperText="Dentist ID" variant="standard" type="text" name="dentistID" onChange={handleChange} value={appointment.dentistID} />

              <TextField helperText="Date" variant="standard" type="date" required name="day" onChange={handleChange} value={appointment.day} />
              <TextField helperText="Select Time" select variant="standard" type="text" required name="time" onChange={handleChange} value={appointment.time}>
                <MenuItem value="09:00am-10:00am">09:00am-10:00am</MenuItem>
                <MenuItem value="10:00am-11:00am">10:00am-11:00am</MenuItem>
                <MenuItem value="11:00am-12:00pm">11:00am-12:00pm</MenuItem>
                <MenuItem value="12:00pm-01:00pm">12:00pm-01:00pm</MenuItem>
                <MenuItem value="01:00pm-02:00pm">01:00pm-02:00pm</MenuItem>
                <MenuItem value="02:00pm-03:00pm">02:00pm-03:00pm</MenuItem>
                <MenuItem value="03:00pm-04:00pm">03:00pm-04:00pm</MenuItem>
                <MenuItem value="04:00pm-05:00pm">04:00pm-05:00pm</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField helperText="Select Location" select variant="standard" type="text" required name="branch" onChange={handleChange} value={appointment.branch}>
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

export default AppointmentCreate;