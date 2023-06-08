
import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import HomePage from './pages/Utilities/homepage';
import NotFound from './pages/Utilities/NotFound';

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
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<HomePage />}></Route>
       <Route path="*" element={<NotFound />}></Route>

       <Route path="/Dentists/Panapaan" element={<DentistPanapaan />}></Route>
       <Route path="/Dentists/Dasmarinas" element={<DentistDasmarinas />}></Route>
       <Route path="/Dentists/Rosario" element={<DentistRosario />}></Route>
       <Route path="/Dentists/Molino" element={<DentistMolino />}></Route>
       <Route path="/Dentists/Carmona" element={<DentistCarmona />}></Route>
       <Route path="/Dentists/Laspinas" element={<DentistLasPinas />}></Route>

       <Route path="/Dentists/edit/:id" element={<DentistEdit />}></Route>
       <Route path="/Dentists/edit/Change-password/:id" element={<ChangePassword />}></Route>
       <Route path="/Dentists/:id" element={<DentistsView />}></Route>
       <Route path="/Dentists" element={<DentistList />}></Route>
       <Route path="/Dentists/new" element={<DentistCreate />}></Route>
    </Routes>
</BrowserRouter>
    </>

  );
}

export default App;
