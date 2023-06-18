import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Typography, Box, Button, Stack, Container, Grid, IconButton } from "@mui/material";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";
import { FileCopyOutlined as FileCopyOutlinedIcon } from "@mui/icons-material"; 


const PatientView = () => {
  const { id } = useParams();
  const [patient, setPatients] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/patients/${id}`;

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
        const age = calculateAge(json.birthday);
        const updatedPatient = { ...json, age };
        setPatients(updatedPatient);
        setLoading(false);
      });
      function calculateAge(birthday) {
        const birthDate = new Date(birthday);
        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDifference =
          currentDate.getMonth() - birthDate.getMonth();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 &&
            currentDate.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age;
      }
    return () => {
      controller.abort();
    };
  }, [ id]);

  const handleDelete = (e) => {
    if (window.confirm("Are you really sure you want to delete this record?")) {
      let url = `${process.env.REACT_APP_API_URL}/patients`;

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
  const copyText = () => {
    navigator.clipboard.writeText(patient.patientId);
  };
  return (
<>
<NavbarMUI />
      <Box
        sx={{display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",minHeight: "100vh",
          backgroundColor: "#F2E7EB",
          fontFamily: "cursive",
        }}
      >
        <Typography variant="h4" sx={{ mt: 5 }} align="center" color="palevioletred">
          Patient Details
        </Typography>
        <Typography variant="h4" sx={{ my: 1 }} align="center" color="palevioletred">
          {patient.patientId} <IconButton onClick={copyText}>
            <FileCopyOutlinedIcon />
          </IconButton>
        </Typography>

        {loading ? (
          <Typography variant="h4" sx={{ my: 5 }} align="center">
            Loading...
          </Typography>
        ) : (
          <Container maxWidth="sm">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Name:</Typography>
                  <Typography variant="h6">{patient.firstName} {patient.middleName} {patient.lastname} {patient.prefix}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Email:</Typography>
                  <Typography variant="h6">{patient.email}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Contact Number:</Typography>
                  <Typography variant="h6">+63 {patient.contactNumber}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Age:</Typography>
                  <Typography variant="h6">{patient.age}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Gender:</Typography>
                  <Typography variant="h6">{patient.gender}</Typography>
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Branch:</Typography>
                  <Typography variant="h6">{patient.branches}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  mt={4}
                >
                  <Link to="/patients">
                    <Button variant="contained" color="primary">
                      Patient List
                    </Button>
                  </Link>
                  <Link to={`/patients/edit/${patient._id}`}>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Link to="/patients/new">
                    <Button variant="contained" color="primary">
                      Add
                    </Button>
                  </Link>
                  <Link to={`/patients/edit/update/${patient._id}`}>
                    <Button variant="contained" color="primary">
                      Update
                    </Button>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
      <FooterMUI />
    </>
  );
};

export default PatientView;