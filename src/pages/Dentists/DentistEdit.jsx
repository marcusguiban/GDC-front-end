import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
import { Typography, Box, Button, Stack, TextField } from "@mui/material"
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";

const DentistEdit = () => {
  const { id } = useParams();
  const [dentists, setdentists] = useState({
password: " "
  });
  const navigate = useNavigate();
//   const { token } = useAuth();

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
      .then((json) => setdentists(json));

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleChanged = (e) => {
    setdentists((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        age: dentists.age,
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
            <TextField helperText="Name" variant="standard" type="text" required  name="name" onChange={handleChanged} value={dentists.name}/>
            <TextField helperText="Email" variant="standard" type="email" name="email" onChange={handleChanged} value={dentists.email}/>
            <TextField helperText="Password" variant="standard" type="password" required  name="password" onChange={handleChanged}/>
            </Stack>
          </Stack>
          <Stack>
            <Stack direction={"row"} spacing={4} justifyContent={"center"} >
            <TextField helperText="Contact Number" variant="standard" type="number"   name="contact_number" onChange={handleChanged} value={dentists.contact_number}/>
            <TextField helperText="Age" variant="standard" type="number"   name="age" onChange={handleChanged} value={dentists.age}/>
            <TextField helperText="PRC Number" variant="standard" type="number"   name="prc_number" onChange={handleChanged} value={dentists.prc_number}/>
            <TextField helperText="PTR Number" variant="standard" type="number "   name="ptr_number" onChange={handleChanged} value={dentists.ptr_number}/>
            <TextField helperText="PTR Number" variant="standard" type="number "   name="ptr_number" onChange={handleChanged} value={dentists.ptr_number}/>
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