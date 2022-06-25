//React imports
import React, { useDebugValue, useEffect, useState } from "react";


//Project Imports
import * as consts from '../../resources/constants';
import {Dims2D} from '../../resources/constants';


//misc

// # # # # # #

interface ModuleProps {
  size: Dims2D;
  image: string;
}

function Module(props: ModuleProps) 
{

    return (
      <div className="container-fluid">
          <div className="row outer-row">
            <p> This is a normal module </p>
          </div> {/*END OUTER ROW */}
      </div> 
    ); {/*END WRAPPER CONTAINER */}

  }
  
  export default Module;
  