//React Imports
import React from 'react';
import { Route, Routes, Navigate, useSearchParams, BrowserRouter} from "react-router-dom";

//Project Imports
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import Resume from './pages/content/resume/resume';

//Project CSS Imports
import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/General.css';

  //Components

  //Pages
  import '../css/pages/homepage.css';
  import '../css/pages/mobilehomepage.css';
  import '../css/pages/notfound.css';
  

  //Animations
  import '../css/animations.scss';
  



function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/resume" element={<Resume />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound/>} />
    </Routes>
    </BrowserRouter>    
  );
}

export default App;
