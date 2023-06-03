import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
import { Typography, Box, Button, Stack, Container, TextField } from "@mui/material"
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";
const DentistCreate = () => {
  const [dentists, setDentists] = useState({
  });

  const navigate = useNavigate();
//   const { token } = useAuth();

  const handleChanged = (e) => {
    setDentists((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
                <TextField helperText="Full Name" variant="standard" type="text" required  name="name" onChange={handleChanged} value={dentists.name}/>
                <TextField helperText="Email" variant="standard" type="email" name="email" onChange={handleChanged} value={dentists.email}/>
                <TextField helperText="Password" variant="standard" type="password" name="password" onChange={handleChanged} value={dentists.password}/>

                <TextField helperText="Contact Number" variant="standard" type="number" required  name="contact_number" onChange={handleChanged} value={dentists.contact_number}/>
                </Stack>
              </Stack>
              <Stack>
                <Stack direction={"row"} spacing={4} justifyContent={"center"} >
                <TextField helperText="Age" variant="standard" type="number" required  name="age" onChange={handleChanged} value={dentists.age}/>
                <TextField helperText="PRC Number" variant="standard" type="number" required  name="prc_number" onChange={handleChanged} value={dentists.prc_number}/>
                <TextField helperText="PTR Number" variant="standard" type="number " required  name="ptr_number" onChange={handleChanged} value={dentists.ptr_number}/>
                <TextField helperText="Branch" variant="standard" type="text" required  name="branches" onChange={handleChanged} value={dentists.branches}/>

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