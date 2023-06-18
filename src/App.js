
import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import HomePage from './pages/Utilities/homepage';
import AboutUsPage from './pages/GDCOneLuxDental/AboutUs';
import DentistsViewPublic from './pages/PublicPages/DentistViewPublic';

import DentistList from './pages/Dentists/DentistsList';
import DentistCreate from './pages/Dentists/DentistCreate';
import DentistsView from './pages/Dentists/DentistView';
import DentistEdit from './pages/Dentists/DentistEdit';
import DentistPanapaan from './pages/branches/Panapaan';
import DentistRosario from './pages/branches/Rosario';
import DentistDasmarinas from './pages/branches/Dasmarinas';
import DentistLasPinas from './pages/branches/Laspinas';
import DentistMolino from './pages/branches/Molino';
import DentistCarmona from './pages/branches/Carmona';
import ChangePassword from './pages/Dentists/DentistChangePassword';

import DentistUpdate from './pages/Dentists/DentistUpdate';
import PatientList from './pages/Patients/PatientList';
import PatientView from './pages/Patients/PatientView';
import PatientEdit from './pages/Patients/PatientEdit';
import PatientCreate from './pages/Patients/PatientCreate';
import PatientChangePassword from './pages/Patients/PatientChangePassword';


import CreateDentalChartPage from './pages/DentalCharts/DentalChartCreate';


import AppointmentList from './pages/Appointments/AppointmentList';
import AppointmentView from './pages/Appointments/AppointmentsView';
import AppointmentCreate from './pages/Appointments/AppointmentCreate';

import Login from './pages/PublicPages/Login';

import SecureRoute from "./SecureRoutes"; 
import AuthContextProvider  from "./pages/Contexts/AuthContex";
function App() {
  return (
    <>
    <AuthContextProvider>

    
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<HomePage />}></Route>
       <Route path="*" element={<HomePage />}></Route>
       <Route path="/GDC-One-Lux-Dental/AboutUs" element={<AboutUsPage />}></Route>

       <Route path="/Dentists/public/:id" element={<DentistsViewPublic />}></Route>

       <Route path="/Login" element={<Login />}></Route>
       <Route path="/Dentists/Panapaan" element={<DentistPanapaan />}></Route>
       <Route path="/Dentists/Dasmarinas" element={<DentistDasmarinas />}></Route>
       <Route path="/Dentists/Rosario" element={<DentistRosario />}></Route>
       <Route path="/Dentists/Molino" element={<DentistMolino />}></Route>
       <Route path="/Dentists/Carmona" element={<DentistCarmona />}></Route>
       <Route path="/Dentists/Laspinas" element={<DentistLasPinas />}></Route>




       <Route element = {<SecureRoute />}>
       <Route path="/Dentists/edit/:id" element={<DentistEdit />}></Route>
       <Route path="/Dentists/edit/Change-password/:id" element={<ChangePassword />}></Route>
       <Route path="/Dentists/edit/update/:id" element={<DentistUpdate />}></Route>
       <Route path="/Dentists/:id" element={<DentistsView />}></Route>
       <Route path="/Dentists" element={<DentistList />}></Route>
       <Route path="/Dentists/new" element={<DentistCreate />}></Route>

       <Route path="/Patients" element={<PatientList />}></Route>
       <Route path="/Patients/:id" element={<PatientView />}></Route>
       <Route path="/Patients/edit/:id" element={<PatientEdit />}></Route>
       <Route path="/Patients/new" element={<PatientCreate />}></Route>
       <Route path="/Patients/edit/Change-password/:id" element={<PatientChangePassword />}></Route>

       <Route path="/Appointments" element={<AppointmentList />}></Route>
       <Route path="/Appointments/:id" element={<AppointmentView />}></Route>
       <Route path="/Appointments/new" element={<AppointmentCreate />}></Route>

       <Route path="/DentalCharts/new" element={<CreateDentalChartPage />}></Route>
       </Route>
    </Routes>
</BrowserRouter>
</AuthContextProvider>
    </>

  );
}

export default App;
