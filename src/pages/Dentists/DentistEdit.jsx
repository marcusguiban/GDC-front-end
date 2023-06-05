import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
import { Typography, Box, Button, Stack, TextField } from "@mui/material"
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const DentistEdit = () => {
  const { id } = useParams();
  const [dentists, setDentists] = useState({
    password: ""
  });
  const navigate = useNavigate();
//   const { token } = useAuth();
const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    let url = `http://localhost:5000/api/dentists/${id}`;

    const controller = new AbortController();

    const requestOptions = {
      method: "GET",
      headers: {
        signal: controller.signal,
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
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
    let url = 'http://localhost:5000/api/dentists';

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
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
        id: id
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then(() => navigate(`/dentists/${id}`))
      .catch((error) => console.log(error));
  };

  return (
    <>
    <NavbarMUI />
      <Typography variant="h4" sx={{px:5, py:5}} align="center" color={"palevioletred"}>Edit Dentists</Typography>

      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ px:10, py:10}}>
<Stack direction={"column"} spacing={8} align="center">
          <Stack>
            <Stack direction={"row"} spacing={4} justifyContent={"center"} >
            {/* Name */}
            <TextField helperText="Name" variant="standard" type="text" required  name="name" onChange={handleChanged} value={dentists.name}/>
            {/* Email */}
            <TextField helperText="Email" variant="standard" type="email" name="email" onChange={handleChanged} value={dentists.email}/>
            {/* Password */}
            <TextField helperText="Password" variant="standard" type={showPassword ? 'text' : 'password'} name="password" onChange={handleChanged}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}/>
            </Stack>
          </Stack>
          <Stack>
            <Stack direction={"row"} spacing={4} justifyContent={"center"} >
              {/* Contact Number */}
            <TextField helperText="Contact Number" variant="standard" type="tel"
                      
                      
                      
                      required
                      unique
                      name="contact_number"
                      onChange={(e) => {
                        const phoneNumber = e.target.value.replace(/\D/g, "");
                        const formattedNumber = phoneNumber.slice(-10);

                        setDentists((prev) => ({ ...prev, contact_number: formattedNumber }));
                      }}
                      value={dentists.contact_number}
                      InputProps={{ startAdornment: <InputAdornment position="start">+63</InputAdornment> }}
                      inputProps={{
                        pattern: "[0-9]{10}",
                        onInvalid: (e) => {
                          e.target.setCustomValidity("Please input a valid 10-digit phone number");
                        },
                      }}
                    />
            <TextField
  helperText="Birthday"
  variant="standard"
  type="date"
  required
  name="birthday"
  onChange={handleChanged}
  value={dentists.birthday}
/>


            <TextField
                  helperText="PRC Number"
                  variant="standard"
                  type="text"
                  required
                  name="prc_number"
                  onChange={handleChanged}
                  value={dentists.prc_number}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">PRC-</InputAdornment>,
                  }}
                />
                                <TextField
                  helperText="PTR Number"
                  variant="standard"
                  type="text"
                  required
                  name="ptr_number"
                  onChange={handleChanged}
                  value={dentists.ptr_number}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">PTR-</InputAdornment>,
                  }}
                />
            <TextField helperText="Branch" variant="standard" type="text"   name="branches" onChange={handleChanged} value={dentists.branches}/>
            </Stack>
            <Stack direction={"row"} spacing={4} justifyContent={"center"} >

            </Stack>
          </Stack>
          <Stack direction={"row"} spacing={4} justifyContent={"center"} sx={{px:5, pb:10, pt:5}}>
          <Button type="submit" value="Update" variant="outlined" size="large">Update</Button>
          </Stack>
</Stack>

      </Box>
      <FooterMUI />
    </>
  );
};

export default DentistEdit;