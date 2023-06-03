import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
import { Typography, Box, Button, Stack, Container } from "@mui/material"

import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";

const DentistsView = () => {
  const { id } = useParams();
  const [dentists, setdentists] = useState({});

//   const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    setLoading(true);

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setdentists(json);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleDelete = (e) => {
    if (window.confirm("Are you really sure you want to delete this record?")) {
      let url = 'http://localhost:5000/api/dentists';

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id
        }), 
      };

      fetch(url, requestOptions)
        .then(() => {
          navigate("/dentists");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>

<NavbarMUI />
    <Box sx={{px:5, py:5}}>
    <Typography variant="h4" sx={{mx:5, my:5}} align="center" color={"palevioletred"}>Dentists Details</Typography>

{loading ? (
     <Typography variant="h4" sx={{mx:5, my:5}} align="center">Loading...</Typography>
) : (
  <>

<Container >
    <Stack direction={"row"} justifyContent={"center"}>
    <Stack direction={"column"}>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}} >
        <Typography variant="h6" >Name:</Typography>
        </Stack>
        <Stack px={10}  >
        <Typography variant="h6" >{dentists.name}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}} >
        <Typography variant="h6" >Email:</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{dentists.email}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}} >
        <Typography variant="h6" >Contact Number:</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{dentists.contact_number}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}} >
        <Typography variant="h6" >Age:</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{dentists.age}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}}>
        <Typography variant="h6" >PRC Number</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{dentists.prc_number}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}}>
        <Typography variant="h6" >PTR Number</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{dentists.ptr_number}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}}>
        <Typography variant="h6" >Branch</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{dentists.branches}</Typography>
        </Stack>
      </Stack>

    </Stack>
    </Stack>
        <Stack direction={"row"} spacing={4} justifyContent={"center"} sx={{px:5, pb:10, pt:5}}>
          <Link to="/dentists">
          <Button variant="contained" color="primary" sx={{ color: "White" }} >Dentist List</Button>
          </Link>
          <Link to={`/dentists/edit/${dentists._id}`}>
          <Button variant="contained" color="primary" sx={{ color: "White" }} >Edit</Button>
          </Link>
          <Button variant="contained" color="primary" sx={{ color: "White" }} onClick={handleDelete}>Delete</Button>
          <Link to="/dentists/new">
          <Button variant="contained" color="primary" sx={{ color: "White" }} > Add </Button>
          </Link>
        </Stack>
        </Container>
  </>
)}

    </Box>
      <FooterMUI />
    </>


  );
};

export default DentistsView;