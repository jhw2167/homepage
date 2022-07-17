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
  const imageUri: string = props.image;
  const BG_IMG: CSS.Properties = {
    ['backgroundImage' as any]: `url(${props.image})`,
    ['width' as any]: '100%',
    ['height' as any]: '100%',
  };
  const setModIndex = (props.setModuleHovered) ? props.setModuleHovered : (i: number) => {};

  //States
  const [hov, setHov] = useState<Boolean>(false);

  //effects

  useEffect( () => {
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
      if(props.options.data.length==0)
        return null;

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
          <div className={consts.addStyleClass(PRE, 'image-wrapper') + ((hov)?
          ' hh-image-wrapper-hover':'')}>
            <div style={BG_IMG}></div>
          </div>
          {/*END IMAGE */}
          
          {titleJSX()}
          {dropDownJsx()}
      </div> 
    );  {/*END OUTER ROW */}
    {/*END WRAPPER CONTAINER */}

  }
  
  export default Module;
  