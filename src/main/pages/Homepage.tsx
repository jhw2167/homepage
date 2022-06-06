//React Imports
import React, { useEffect, useState } from 'react';


//Project Imports

//misc
import * as c from '../../resources/constants';
import { useWindowSize } from '../subcomponents/misc/WindowDims';



function Homepage() 
{
    //const [windowDims, setWindowDims] = useState<c.Dims2D>(useWindowDimensions());
    let windowDims: c.Dims2D = useWindowSize();

    
    return (
      <div className="container-fluid">
          <div className="row outer-row">
            <p> This is a normal homepage </p>
            <div> {windowDims.w} , {windowDims.h}  </div>
          </div> {/*END OUTER ROW */}
      </div> 
    ); {/*END WRAPPER CONTAINER */}

  }
  
  export default Homepage;
  