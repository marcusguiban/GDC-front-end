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
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";

const AppointmentList = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const controller = new AbortController();

    let url = 'https://gdc-back-end.vercel.app/api/appointments';

    const requestOptions = {
      signal: controller.signal,
      method: "GET"
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
  }, []);

  return (
    <>
      <NavbarMUI />
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" align="center" color={"palevioletred"}> Upcoming Appointments </Typography>
        {loading ? (
          <Typography variant="h6" align="center" color={"palevioletred"}> Loading...</Typography>
        ) : (
          <Container sx={{ py: 10 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Patient Name</TableCell>
                    <TableCell>Patient ID</TableCell>
                    <TableCell>Patient Email</TableCell>
                    <TableCell>Patient Contact Number</TableCell>
                    <TableCell>Dentist Name</TableCell>
                    <TableCell>Dentist ID</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Approved</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointments) => (
                    <TableRow
                      key={appointments.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell>
                    {new Date(appointments.day).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}
                    </TableCell>
                      <TableCell>{appointments.time}</TableCell>
                      <TableCell>{appointments.patientName}</TableCell>
                      <TableCell>{appointments.PatientID}</TableCell>
                      <TableCell>{appointments.PatientEmail}</TableCell>
                      <TableCell>{appointments.PatientContactNumber}</TableCell>
                      <TableCell>{appointments.dentistName}</TableCell>
                      <TableCell>{appointments.dentistID}</TableCell>
                      <TableCell>{appointments.branch}</TableCell>
                      <TableCell>{appointments.Approved}</TableCell>
                      <TableCell>
                        <Link to={`/appointments/${appointments._id}`} style={{ color: 'pink' }}>
                          <VisibilityIcon />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack direction={"row"} spacing={4} justifyContent={"center"} sx={{ mx: 5, my: 5 }}>
              <Link to="/Appointments/new">
                <Button variant="outlined" color="secondary">Add New Patient</Button>
              </Link>
            </Stack>
          </Container>
        )}
      </Container>
      <FooterMUI />
    </>
  );
};

export default AppointmentList;