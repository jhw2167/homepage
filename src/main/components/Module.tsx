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
  const setModIndex = (props.setModuleHovered) ? props.setModuleHovered : (i: number) => {};

  //States
  const [hov, setHov] = useState<Boolean>(false);

  //effects

  useEffect( () => {
    console.log(props.index);
    if(hov)
      setModIndex(props.index);
    else
      setModIndex(-1);
  }, [hov])



    //JSX for title
    const titleJSX = () => {
      let h = (hov) ? ' ' + PRE +'-title-wrapper-hover' : '';
            return ( 
            <div className={consts.addStyleClass(PRE, 'title-wrapper') + h}>
                {props.title}
            </div> );
    }

    //jsx for DropDown
    const MIN_DATA_FOR_SCROLL_BAR = 4;
    const dropDownJsx = () => {
      let ddProps: consts.DropDownProps = clone(props.options);
      ddProps.addStyleClasses = {};
      ddProps.addStyleClasses.tr = PRE + '-dd-row-anim';
      ddProps.addStyleClasses.div = (ddProps.data.length <  MIN_DATA_FOR_SCROLL_BAR ) ? ' no-scroll ' : '';
      ddProps.addStyleClasses.div += (hov) ? ' ' + PRE +'-dd-hover' : '';
        return <DropDown {...ddProps}/>;
    }

    return (
      <div className={"container " + consts.addStyleClass(PRE, 'module-wrapper')}
      onMouseEnter={()  => setHov(true)}
      onMouseLeave={()  => setHov(false)}
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
  