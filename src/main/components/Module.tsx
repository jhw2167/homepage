//React imports
import React, { useDebugValue, useEffect, useState } from "react";


//Project Imports
import * as consts from '../../resources/constants';
import {Dims2D, ModuleProps} from '../../resources/constants';
import DropDown from "../subcomponents/DropDown";


//misc

// # # # # # #



function Module(props: ModuleProps) 
{
  const PRE = props.page_prefix;
  const imageUri: string = consts.checkLocalFile(props.image, consts.MODULE_DEFAULT_IMG_PATH);

    //JSX for title
    const titleJSX = () => {
            return ( 
            <div className={"row" + consts.addStyleClass(PRE, 'title-wrapper')}>
              <div> 
                {props.title}
              </div>
            </div> );
    }

    //jsx for DropDown
    const dropDownJsx = () => {
        return <DropDown {...props.options}/>;
    }

    //States
    const [hov, setHov] = useState<Boolean>(false);

    return (
      <div className={"container " + consts.addStyleClass(PRE, 'module-wrapper')}
      onMouseEnter={()  => setHov(true)}
      onMouseLeave={()  => setHov(false)}
      >  
          { (hov) ? titleJSX() : null }
          <div className={"row" + consts.addStyleClass(PRE, 'image-wrapper')}>
            <img src={imageUri} />
          </div> 
          {/*END IMAGE */}
          
          {(hov) ? dropDownJsx() : titleJSX()}
      </div> 
    );  {/*END OUTER ROW */}
    {/*END WRAPPER CONTAINER */}

  }
  
  export default Module;
  