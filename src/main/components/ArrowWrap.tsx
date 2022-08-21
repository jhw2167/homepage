//React imports
import React, { Children, useDebugValue, useEffect, useState } from "react";
import { clone } from "underscore";
import * as CSS from 'csstype';

//Project Imports
import * as consts from '../../resources/constants';



//misc
import { useSwipeable } from 'react-swipeable';

// # # # # # #

export interface ArrowWrapProps {
  children: JSX.Element;
  styleClass: string;
  arrowUpdate: (direction: number) => void;
  arrowType?: string;
}


//CSS


const generateArrow = (a: string, dir: string, sc: string, upd: Function) => {
  if(a==='div') {
    return (<div className={sc+' mobile-arrow arrow-btn-'+dir}
    onClick={() => upd((dir=='right')?1:-1)}>
     <div className={"arrow-"+dir}></div>
   </div>)
    
  } else if (a==='char') {
    return <div onClick={() => upd((dir=='right')?1:-1)}
    className={sc +"col-2 arrow "+dir}>{(dir=='right') ? '>' : '<'}</div>
  } else if (a==='svg') {

  } else {

  }
}

function ArrowWrap(props: ArrowWrapProps) 
{
  const PRE = props.styleClass;
  const upd = props.arrowUpdate;
  const aType = (props.arrowType) ? props.arrowType : 'div';

    return (
      <>
      {generateArrow(aType, 'left', props.styleClass, upd)}
        {props.children}
      {generateArrow(aType, 'right', props.styleClass, upd)}
    </>
    );  {/*END OUTER ROW */}
    {/*END WRAPPER CONTAINER */}

  }
  
  export default ArrowWrap;
  