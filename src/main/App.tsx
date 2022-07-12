//React Imports
import React from 'react';
import { Route, Routes, Navigate, useSearchParams, BrowserRouter} from "react-router-dom";

//Project Imports
import Homepage from './pages/Homepage';

//Project CSS Imports
import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/General.css';

  //Components

  //Pages
  import '../css/pages/homepage.css';
  import '../css/pages/mobilehomepage.css';

  //Animations
  import '../css/animations.scss';



function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Homepage />} />
          { /* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
    </BrowserRouter>    
  );
}

export default App;
