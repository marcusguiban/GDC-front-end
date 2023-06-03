import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
import { Typography, Box, Button, Stack, Container, TextField, MenuItem } from "@mui/material"
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";
import InputAdornment from '@mui/material/InputAdornment';
const DentistCreate = () => {
  const [dentists, setDentists] = useState({
  });

  const navigate = useNavigate();
//   const { token } = useAuth();

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
    const controller = new AbortController();
    let url = 'http://localhost:5000/api/dentists';

    const requestOptions = {
      signal: controller.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      
      body: JSON.stringify({
        
        name: dentists.name,
        email: dentists.email,
        password: dentists.password,
        contact_number: dentists.contact_number,
        age: dentists.age,
        prc_number: dentists.prc_number,
        ptr_number: dentists.ptr_number,
        branches:dentists.branches
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then(() => {navigate('/dentists');});

    return () => {
      controller.abort();
    };
  };

  return (
    <>
    <NavbarMUI />
    <Container >

      <Typography variant="h4" sx={{px:5, py:5}} align="center" >Add new Dentists</Typography>
        <Container xs={{pt:10, py:10}}>

        <Box component="form" onSubmit={handleSubmit} >


          <Stack direction={"column"} spacing={8} align="center" sx={{pt:10}}>
              <Stack>
                <Stack direction={"row"} spacing={4} justifyContent={"center"} >
                <TextField helperText="Full Name" variant="standard" type="text" required name="name"  onChange={handleChanged} value={dentists.name}/>
                <TextField helperText="Email" variant="standard" type="email" unique name="email" onChange={handleChanged} value={dentists.email}/>
                <TextField helperText="Password" variant="standard" type="password" name="password" onChange={handleChanged} value={dentists.password}/>
                <TextField
                      helperText="Contact Number"
                      variant="standard"
                      type="tel"
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

                      

                </Stack>
              </Stack>
              <Stack>
                <Stack direction={"row"} spacing={4} justifyContent={"center"} >
                <TextField helperText="Age" variant="standard" type="number" required  name="age" onChange={handleChanged} value={dentists.age}/>
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
                <TextField helperText="Select Location" select variant="standard" type="text" required  name="branches" onChange={handleChanged} value={dentists.branches}>
                                <MenuItem value="Carmona">Carmona</MenuItem>
                                <MenuItem value="Molino">Molino</MenuItem>
                                <MenuItem value="Carmona">Carmona</MenuItem>
                                <MenuItem value="Rosario">Rosario</MenuItem>
                                <MenuItem value="Dasmarinas">Dasmarinas</MenuItem>
                                <MenuItem value="Las Pinas">Las Pinas</MenuItem>
                            </TextField>



                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={4} justifyContent={"center"} sx={{px:5, pt:5, pb:10}}>
              <Button type="submit" value="Save" variant="outlined">Save</Button>
              </Stack>
                </Stack>
        </Box>
      
      </Container>
      
    </Container>
    <FooterMUI />
    </>
  );
};

export default DentistCreate;