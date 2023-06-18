import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Container, Typography, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";
import map from "../../images/panapaanMap.jpg";
import FBpost1 from "../../images/fbpost1.jpg";
import FBpost2 from "../../images/fbpost2.jpg";
const DentistPanapaan = () => {
  const [dentists, setdentists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    let url = `${process.env.REACT_APP_API_URL}/dentists/panapaan`;

    const requestOptions = {
      signal: controller.signal,
      method: "GET"

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
  }, []);

  return (
    <>
    <NavbarMUI />
    <Box  className="background">
    <Container sx={{py:10}}>
    <Typography variant="h4" align="center" color={"palevioletred"}> Guiban Dental Clinic Panapaan </Typography>
    <Grid container>
      <Grid item md={6} sm={12} align="center">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.6522993226517!2d120.95069767581133!3d14.447190680812762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cda0e3f8d9a1%3A0x337ae87aa24709!2sGuiban%20Dental%20Clinic%20Panapaan%20Branch!5e0!3m2!1sen!2sph!4v1682406881331!5m2!1sen!2sph" 
        width="100%" 
        height={400} 
        style={{ border: "0" }}
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
        title="Rosario googlemaps">
        </iframe>
        <Typography variant="h5" align="center" color={"palevioletred"} sx={{py:5}}> We are located at #249 V. Aguistin Bldg., Panapaan 1, Bacoor City, Cavite </Typography>
      </Grid>
      <Grid item md={6} sm={12} align="center">
        <img src={map} className="map" alt="Panapaan map"></img>
      </Grid>
    </Grid>
    <Typography variant="h4" align="center" color={"palevioletred"}                     
        sx={{fontSize: {xs: "20px",sm: "25px",md: "30px",lg: "35px",}, py: { xs: 2, sm: 5 }, px:{ xs: 1, sm: 5 }}}> 
                      Meet our talented team of dentists, ready to provide exceptional care for your oral health. </Typography>
      {loading ? (
        <Typography variant="h6" align="center" color={"palevioletred"}> Loading...</Typography>
      ) : (
        <Container sx={{py:10}}>

          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell sx={{ display: { xs: 'none', sm:'table-cell',md: 'table-cell' } }}>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Email</TableCell>
            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Contact Number</TableCell>
            <TableCell sx={{ display: { xs: 'none', sm:'table-cell',md: 'table-cell' } }}>Branch</TableCell>
            <TableCell >View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dentists.map((dentists) => (
            <TableRow
              key={dentists.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ display: { xs: 'none', sm:'table-cell',md: 'table-cell' } }}>{dentists.dentistsId}</TableCell>
              <TableCell >{dentists.firstName} {dentists.middleName} {dentists.lastname} {dentists.prefix}</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{dentists.email}</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>+63 {dentists.contact_number}</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm:'table-cell',md: 'table-cell' } }}>{dentists.branches}</TableCell>
              <TableCell >
                <Link to={`/Dentists/public/${dentists._id}`} style={{ color: 'pink'}}><VisibilityIcon /></Link>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Container>
      )}
            <Grid container>
      <Grid item md={6} sm={12} align="center" sx={{ px: 3, py: 3 }}>
          <img src={FBpost1} alt="Progress" style={{ width: "100%", maxHeight: "700px" }}></img>
      </Grid>
      <Grid item md={6} sm={12} align="center" sx={{ px: 3, py: 3 }}>
          <img src={FBpost2} alt="Progress" style={{ width: "100%", maxHeight: "700px" }}></img>
      </Grid>
      </Grid>
    </Container>
    </Box>
    <FooterMUI />
    </>
  );
};

export default DentistPanapaan;