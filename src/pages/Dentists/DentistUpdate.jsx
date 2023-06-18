import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, Button, Stack, TextField, Grid, Container } from "@mui/material";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";

const DentistUpdate = () => {
  const { id } = useParams();
  const [dentists, setDentists] = useState({
    password: "",
  });
  const navigate = useNavigate();


  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/dentists/${id}`;

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
     
      setDentists((prev) => ({ ...prev, [name]: value }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_API_URL}/dentists/update`;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        education: dentists.education,
        degree: dentists.degree,
        occupation: dentists.occupation,
        id: id,
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
      <div className="background">
        <Container sx={{ mt: 0, mb: 0 }} justifyContent="center">
          <Typography variant="h4" sx={{ px: 2, py: 3 }} align="center" color="palevioletred" >Update Dentists</Typography>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 5, px: 3, py: 5, maxWidth: 500, margin: "0 auto" }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField helperText="Education" variant="standard" type="textarea" multiline rows={4} name="education" onChange={handleChanged} value={dentists.education} fullWidth/>
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField helperText="Degree" variant="standard" type="textarea"  multiline rows={4} name="degree" onChange={handleChanged} value={dentists.degree} fullWidth/>
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField helperText="Occupation" variant="standard" type="textarea"  multiline rows={4} name="occupation" onChange={handleChanged} value={dentists.occupation} fullWidth/>
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
export default DentistUpdate;
