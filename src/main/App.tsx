//React Imports
import React from 'react';
import { Route, Routes,  Navigate, useSearchParams, BrowserRouter, HashRouter } from "react-router-dom";

//Project Imports
import OGPHead from '../misc/react-ogp';

import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import Resume from './pages/content/resume/resume';
import Photos from './pages/content/photos/photos';

//Project CSS Imports
import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/General.css';

  //Components

  //Pages
  import '../css/pages/homepage.css';
  import '../css/pages/mobilehomepage.css';
  import '../css/pages/notfound.css';
  
  //content pages
  import '../main/pages/content/resume/resume.css'
  import '../main/pages/content/photos/photos.css'

  //Animations
  import '../css/animations.scss';

function App() {
  return (
    <>
    <OGPHead />
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Homepage />} />
		  <Route path="/home" element={<Homepage />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/photos" element={<Photos />} />

          <Route path="/404" element={<NotFound />} />
		  <Route path="*" element={ <Navigate to="/404" /> } />
    </Routes>
    </BrowserRouter>    
    </>
  );
}
//  <Route path="/finances" element={ <Navigate  to="http://jackhenrywelsh.com/finances" /> } />
export default App;
