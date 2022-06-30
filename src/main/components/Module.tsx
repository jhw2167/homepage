//React imports
import React, { useDebugValue, useEffect, useState } from "react";
import { clone } from "underscore";
import * as CSS from 'csstype';

//Project Imports
import * as consts from '../../resources/constants';
import {Dims2D, ModuleProps} from '../../resources/constants';
import DropDown from "../subcomponents/DropDown";


//misc

// # # # # # #

//CSS


function Module(props: ModuleProps) 
{
  const PRE = props.page_prefix;
  const imageUri: string = consts.checkLocalFile(props.image, consts.MODULE_DEFAULT_IMG_PATH);

    //JSX for title
    const titleJSX = () => {
      let h = (hov) ? ' ' + PRE +'-title-wrapper-hover' : '';
            return ( 
            <div className={consts.addStyleClass(PRE, 'title-wrapper') + h}>
                {props.title}
            </div> );
    }

    //jsx for DropDown
    const dropDownJsx = () => {
      let ddProps: consts.DropDownProps = clone(props.options);
      ddProps.addStyleClasses = {};
      ddProps.addStyleClasses.tr = PRE + '-dd-row-anim-${i}';
      ddProps.addStyleClasses.div = (hov) ? ' ' + PRE +'-dd-hover' : '';
        return <DropDown {...ddProps}/>;
    }

    //States
    const [hov, setHov] = useState<Boolean>(false);

    return (
      <div className={"container " + consts.addStyleClass(PRE, 'module-wrapper')}
      onMouseEnter={()  => setHov(true)}
      onMouseLeave={()  => setHov(true)}
      >  
          {/* { (hov) ? titleJSX() : null } */}
            <img src={imageUri} className={consts.addStyleClass(PRE, 'image-wrapper')} />
          {/*END IMAGE */}
          
          {titleJSX()}
          {dropDownJsx()}
      </div> 
    );  {/*END OUTER ROW */}
    {/*END WRAPPER CONTAINER */}

  }
  
  export default Module;
  