
import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import HomePage from './pages/Utilities/homepage';
import NotFound from './pages/Utilities/NotFound';

import DentistList from './pages/Dentists/DentistsList';
import DentistCreate from './pages/Dentists/DentistCreate';
import DentistsView from './pages/Dentists/DentistView';
import DentistEdit from './pages/Dentists/DentistEdit';
import DentistPanapaan from './pages/Branches/Panapaan';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<HomePage />}></Route>
       <Route path="*" element={<NotFound />}></Route>

       <Route path="/Dentists/Panapaan" element={<DentistPanapaan />}></Route>
       <Route path="/Dentists/edit/:id" element={<DentistEdit />}></Route>
       <Route path="/Dentists/:id" element={<DentistsView />}></Route>
       <Route path="/Dentists" element={<DentistList />}></Route>
       <Route path="/Dentists/new" element={<DentistCreate />}></Route>
    </Routes>
</BrowserRouter>
    </>

  );
}

export default App;
