import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Container, Typography, Stack, } from "@mui/material";
import { Link} from "react-router-dom";



const DentistList = () => {

  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const controller = new AbortController();

    let url = `${process.env.REACT_APP_API_URL}/dentists`;

    const requestOptions = {
      signal: controller.signal,
      method: "GET"
    };

    setLoading(true);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        const updatedDentists = json.map((dentist) => {
          const age = calculateAge(dentist.birthday);
          return { ...dentist, age };
        });
        setDentists(updatedDentists);
        setLoading(false);
      });

    function calculateAge(birthday) {
      const birthDate = new Date(birthday);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDifference = currentDate.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <> 
      <Container sx={{ pt: 10 }}>
        <Typography variant="h4" align="center" color={"palevioletred"}> Current Dentists </Typography>

        {loading ? (
          <Typography variant="h6" align="center" color={"palevioletred"}> Loading...</Typography>
        ) : (
          <Container sx={{ py: 10 }}>

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
          {dentists.map((dentist) => (
            <TableRow
              key={dentist.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ display: { xs: 'none', sm:'table-cell',md: 'table-cell' } }}>{dentist.dentistsId}</TableCell>
              <TableCell >{dentist.firstName} {dentist.middleName} {dentist.lastname} {dentist.prefix}</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{dentist.email}</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>+63 {dentist.contact_number}</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm:'table-cell',md: 'table-cell' } }}>{dentist.branches}</TableCell>
              <TableCell >
                <Link to={`/Dentists/${dentist._id}`} style={{ color: 'pink'}}><VisibilityIcon /></Link>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            </TableContainer>
            <Stack direction={"row"} spacing={4} justifyContent={"center"} sx={{ mx: 5, my: 5 }}>
              <Link to="/dentists/new">
                <Button variant="outlined" color="secondary">Add New Doctor</Button>
              </Link>
            </Stack>
          </Container>
        )}
      </Container>
    </>
  );
};

export default DentistList;
