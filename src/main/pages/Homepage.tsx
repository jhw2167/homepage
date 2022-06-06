//React Imports
import React, { useState } from 'react';


//Project Imports

//misc
import * as c from '../../resources/constants';
import useWindowDimensions from '../subcomponents/misc/WindowDims';



function Homepage() 
{
    const [windowDims] = useState<c.Dims2D>(useWindowDimensions());

    return (
      <div className="container-fluid">
          <div className="row outer-row">
            <p> This is a normal homepage </p>
            <p> {windowDims.h} , {windowDims.w}  </p>
          </div> {/*END OUTER ROW */}
      </div> 
    ); {/*END WRAPPER CONTAINER */}

  }
  
  export default Homepage;
  