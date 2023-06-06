import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, Button, Stack, TextField, Grid, IconButton, Container } from "@mui/material";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const DentistEdit = () => {
  const { id } = useParams();
  const [dentists, setDentists] = useState({
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/api/dentists/${id}`;

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
      .then((json) => setDentists(json));

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleChanged = (e) => {
    const { name, value } = e.target;

    // Apply formatting for PRC Number
    if (name === "prc_number" || name === "ptr_number") {
      const formattedValue = value.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
      setDentists((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setDentists((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_API_URL}/dentists`;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: dentists.name,
        email: dentists.email,
        password: dentists.password,
        contact_number: dentists.contact_number,
        birthday: dentists.birthday,
        prc_number: dentists.prc_number,
        ptr_number: dentists.ptr_number,
        branches: dentists.branches,
        Profile_pic: dentists.Profile_pic,
        Resume: dentists.Resume,
        id: id,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then(() => navigate(`/dentists/${id}`))
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
                <TextField helperText="Name" variant="standard" type="text" required name="name" onChange={handleChanged} value={dentists.name} fullWidth/>
              </Grid>
              <Grid item xs={12}>
                <TextField helperText="Email" variant="standard" type="email" name="email" onChange={handleChanged} value={dentists.email} fullWidth/>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth helperText="Password" variant="standard" type={showPassword ? "text" : "password"} name="password" onChange={handleChanged} InputProps={{endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setShowPassword(!showPassword)} onMouseDown={(e) => e.preventDefault()}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth helperText="Contact Number" variant="standard" type="tel" required unique name="contact_number" onChange={(e) => {
                    const phoneNumber = e.target.value.replace(/\D/g, "");
                    const formattedNumber = phoneNumber.slice(-10);
                    setDentists((prev) => ({ ...prev, contact_number: formattedNumber }));
                  }}
                  value={formatPhoneNumber(dentists.contact_number)} InputProps={{ startAdornment: <InputAdornment position="start">+63</InputAdornment> }}
                  inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}", onInvalid: (e) => {
                      e.target.setCustomValidity("Please input a valid 10-digit phone number");
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth helperText="Birthday" variant="standard" type="date" required name="birthday"  onChange={handleChanged} value={dentists.birthday}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth helperText="PRC Number" variant="standard" type="text" required name="prc_number" onChange={handleChanged} value={dentists.prc_number}
                  InputProps={{startAdornment: <InputAdornment position="start">PRC-</InputAdornment>,}}/>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth helperText="PTR Number" variant="standard" type="text" required name="ptr_number" onChange={handleChanged} value={dentists.ptr_number}
                  InputProps={{ startAdornment: <InputAdornment position="start">PTR-</InputAdornment>,}}/>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth helperText="Branch" variant="standard" type="text" name="branches" onChange={handleChanged} value={dentists.branches}/>
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ px: 2, pb: 2, pt: 2 }}>
              <Button type="submit" value="Update" variant="outlined" size="large">
                Update
              </Button>
            </Stack>
          </Box>
        </Container>
      </div>
      <FooterMUI />
    </>
  );
};
export default DentistEdit;


