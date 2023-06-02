
import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import HomePage from './pages/Utilities/homepage';
import NotFound from './pages/Utilities/NotFound';
import DentistList from './pages/Dentists/DentistsList';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<HomePage />}></Route>
       <Route path="*" element={<NotFound />}></Route>
       <Route path="/Dentists" element={<DentistList />}></Route>
    </Routes>
</BrowserRouter>
    </>

  );
}

export default App;
