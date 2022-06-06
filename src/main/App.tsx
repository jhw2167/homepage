//React Imports
import React from 'react';
import { Route, Routes, Navigate, useSearchParams, BrowserRouter} from "react-router-dom";

//Project Imports
import Homepage from './pages/Homepage';

//Project CSS Imports
import '../css/General.css';


function App() {
  return (
    <Routes>
          <Route path="/overview" element={<Homepage />} />
          <Route path="*" element={<Navigate to="/" />} />
    </Routes>          
  );
}

export default App;
