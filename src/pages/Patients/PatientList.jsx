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

const PatientList = () => {

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const controller = new AbortController();

    let url = `${process.env.REACT_APP_API_URL}/patients`;

    const requestOptions = {
      signal: controller.signal,
      method: "GET"
    };

    setLoading(true);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        const updatedPatients = json.map((patients) => {
          const age = calculateAge(patients.birthday);
          return { ...patients, age };
        });
        setPatients(updatedPatients);
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

      <Container>
        <Typography variant="h4" align="center" color={"palevioletred"}> Current Patients </Typography>

        {loading ? (
          <Typography variant="h6" align="center" color={"palevioletred"}> Loading...</Typography>
        ) : (
          <Container sx={{ py: 10 }}>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm:'table-cell',md: 'table-cell' } }}>Email</TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Contact Number</TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Age</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm:'table-cell',md: 'table-cell' } }}>Branch</TableCell>
                    <TableCell>View</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow
                      key={patient.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{patient.patientId}</TableCell>
                      <TableCell>{patient.firstName} {patient.middleName} {patient.lastname} {patient.prefix}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm:'table-cell',md: 'table-cell' } }}>{patient.email}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>+63 {patient.contactNumber}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{patient.age}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm:'table-cell',md: 'table-cell' } }}>{patient.branches}</TableCell>
                      <TableCell>
                        <Link to={`/patients/${patient._id}`} style={{ color: 'pink' }}>
                          <VisibilityIcon />
                        </Link>

                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack direction={"row"} spacing={4} justifyContent={"center"} sx={{ mx: 5, my: 5 }}>
              <Link to="/patients/new">
                <Button variant="outlined" color="secondary">Add New Patient</Button>
              </Link>
            </Stack>
          </Container>
        )}
      </Container>

    </>
  );
};

export default PatientList;