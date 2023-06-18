import React from "react";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";
import DentistList from "../Dentists/DentistsList";
import PatientList from "../Patients/PatientList";
import { Box } from "@mui/material";
import AppointmentList from "../Appointments/AppointmentList";
const OverviewAdmin = () => {

    return (
        <>
        <NavbarMUI />
        <Box className="background"> 
        <DentistList />
        <PatientList />
        <AppointmentList />
        </Box>
        <FooterMUI />
        </>
    );
};
export default OverviewAdmin;

  