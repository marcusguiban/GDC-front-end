import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, Stack, Container, TextField, MenuItem, InputAdornment, IconButton,} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";
import defaultProfilePicture from "../../images/default-profile-pic.png";

const Input = styled("input")({
  display: "none",
});

const DentistCreate = () => {
  const [dentists, setDentists] = useState({
    name: "",
    email: "",
    password: "",
    contact_number: "",
    birthday: "",
    prc_number: "",
    ptr_number: "",
    branches: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "prc_number" || name === "ptr_number") {
      const formattedValue = value.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
      setDentists((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setDentists((prev) => ({ ...prev, [name]: value }));
    }
  };




  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

  // Check if profilePicture is null
  if (profilePicture) {
    formData.append("profilePicture", profilePicture);
  } else {
    // Append default image to formData
    formData.append("profilePicture", defaultProfilePicture);
  }


    Object.entries(dentists).forEach(([key, value]) => {
      formData.append(key, value);
    });

    fetch("http://localhost:5000/api/dentists", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create dentist");
        }
      })
      .then((data) => {
        navigate("/dentists");
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
            Add new Dentists
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5, px: 3, py: 5, maxWidth: 500, margin: "0 auto" }}>
            <Stack spacing={2}>
              <TextField helperText="First Name" variant="standard" type="text" required name="firstName" onChange={handleChange} value={dentists.firstName} />
              <TextField helperText="Last Name" variant="standard" type="text" required name="lastname" onChange={handleChange} value={dentists.lastname} />
              <TextField helperText="Middle Name" variant="standard" type="text" name="middleName" onChange={handleChange} value={dentists.middleName} />
              <TextField helperText="prefix" variant="standard" type="text" name="prefix" onChange={handleChange} value={dentists.prefix} />
              <TextField helperText="Email" variant="standard" type="email" name="email" value={dentists.email} onChange={handleChange} />
              <TextField helperText="Password" variant="standard" type={showPassword ? "text" : "password"} name="password" value={dentists.password} onChange={handleChange}
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
              <TextField helperText="Birthday" variant="standard" type="date" required name="birthday" onChange={handleChange} value={dentists.birthday} />
              <TextField helperText="Select Gender" select variant="standard" type="text" required name="gender" onChange={handleChange} value={dentists.gender}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField helperText="PRC Number" variant="standard" type="text" required name="prc_number" onChange={handleChange} value={dentists.prc_number}
                InputProps={{startAdornment: <InputAdornment position="start">PRC-</InputAdornment>,}}/>
              <TextField helperText="PTR Number" variant="standard" type="text" required name="ptr_number" onChange={handleChange} value={dentists.ptr_number}
                InputProps={{startAdornment: <InputAdornment position="start">PTR-</InputAdornment>,}}/>
              <TextField helperText="Select Location" select variant="standard" type="text" required name="branches" onChange={handleChange} value={dentists.branches}>
                <MenuItem value="Carmona">Carmona</MenuItem>
                <MenuItem value="Molino">Molino</MenuItem>
                <MenuItem value="Rosario">Rosario</MenuItem>
                <MenuItem value="Dasmarinas">Dasmarinas</MenuItem>
                <MenuItem value="Las pinas">Las Pinas</MenuItem>
              </TextField>
              <label htmlFor="profilePicture">
                <Input accept="image/*" id="profilePicture" type="file" name="profilePicture" onChange={handleProfilePictureChange} />
                <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} fullWidth>
                  Upload Profile Picture
                </Button>
              </label>
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

export default DentistCreate;
