//React imports
import React, { useDebugValue, useEffect, useState } from "react";


//Project Imports
import * as consts from '../../resources/constants';
import {Dims2D, ModuleProps} from '../../resources/constants';


//misc

// # # # # # #



function Module(props: ModuleProps) 
{
  const PRE = props.page_prefix;

    return (
      <div className={"container" + consts.addStyleClass(PRE, 'module-wrapper')}>
          <div className={"row" + consts.addStyleClass(PRE, 'image-wrapper')}>
            <img src={props.image} />
          </div> 
          {/*END IMAGE */}

          <div className={"row" + consts.addStyleClass(PRE, 'title-wrapper')}>
            <div> 
              {props.title}
            </div>
          </div> {/*END OUTER ROW */}
      </div> 
    ); 
    {/*END WRAPPER CONTAINER */}

  }
  
  export default Module;
  