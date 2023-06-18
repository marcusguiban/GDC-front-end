import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Typography, Box, Button, Stack, Container } from "@mui/material";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";



const AppointmentView = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState({
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/appointments/${id}`;

    const controller = new AbortController();

    const requestOptions = {
      method: "GET",
      headers: {
        signal: controller.signal,
        "Content-Type": "application/json",

      },
    };

    setLoading(true);

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setAppointments(json);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [ id]);

  const handleDelete = (e) => {
    if (window.confirm("Are you really sure you want to delete this record?")) {
      let url = `${process.env.REACT_APP_API_URL}/appointments`;

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({
          id: id
        }), 
      };

      fetch(url, requestOptions)
        .then(() => {
          navigate("/patients");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
<>
<NavbarMUI />
<Box sx={{px:5, py:5}}>
    <Typography variant="h4" sx={{mx:5, my:5}} align="center" color={"palevioletred"}>Appointment Details</Typography>

{loading ? (
     <Typography variant="h4" sx={{mx:5, my:5}} align="center" color={"palevioletred"}>Loading...</Typography>
) : (


  <Container >
    <Stack direction={"row"} justifyContent={"center"}>
    <Stack direction={"column"}>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}} >
          <Typography variant="h6" >Date:</Typography>
        </Stack>
        <Stack px={10}  >
          <Typography variant="h6" >                    
          {new Date(appointments.day).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}} >
          <Typography variant="h6" >Time:</Typography>
        </Stack>
        <Stack px={10}  >
          <Typography variant="h6" >{appointments.time}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}}>
        <Typography variant="h6" >Patient Name:</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{appointments.patientName}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}}>
        <Typography variant="h6" >Patient ID:</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{appointments.PatientID}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}}>
        <Typography variant="h6" >Patient Email:</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{appointments.PatientEmail}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}}>
        <Typography variant="h6" >Patient Contact Number:</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{appointments.PatientContactNumber}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}}>
        <Typography variant="h6" >Dentist Appointed:</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{appointments.dentistName}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}}>
        <Typography variant="h6" >Dentist ID:</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{appointments.dentistID}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} >
        <Stack px={10} style={{width: 155}}>
        <Typography variant="h6" >Branch:</Typography>
        </Stack>
        <Stack px={10} >
        <Typography variant="h6" >{appointments.branch}</Typography>
        </Stack>
      </Stack>
    </Stack>
    </Stack>
        <Stack direction={"row"} spacing={4} justifyContent={"center"} sx={{px:5, pb:10, pt:5}}>
        <Link to="/Overview">
                    <Button variant="contained" color="primary">
                      Overview
                    </Button>
                  </Link>
        <Link to={`/appointments/edit/${appointments._id}`}><Button variant="contained"  sx={{ color: "White" }}>Edit</Button></Link>
            <Button variant="contained"  sx={{ color: "White" }} onClick={handleDelete}>Delete</Button>
            <Link to="/appointments/new"><Button variant="contained"  sx={{ color: "White" }}> Add </Button></Link>
        </Stack>
        </Container>
)}
    </Box>
    <FooterMUI />
</>
  );
};

export default AppointmentView;