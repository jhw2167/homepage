//React Imports
import React, { useEffect, useState } from 'react';

//Project Imports
import * as c from '../../resources/constants';
import * as api from '../../resources/api';
import MobileHomepage from './MobileHomepage';
import Module from '../components/Module';

//Interfaces
interface MobileHomepageProps {
  modules: Array<c.ModuleProps>
}

//Constants
const PRE='hh';

function Homepage(props: MobileHomepageProps) 
{
    //consts
    const MODS_LEN=props.modules.length;
    //States
    const [moduleIdx, setModuleIdx] = useState<number>(0);

    //Effects
    useEffect(() => {
      console.log(moduleIdx);
    }, [moduleIdx])

    return (
      <div className="container-fluid hh-container d-flex flex-column g-0 align-items-center">
        <div id={PRE+'-shadowed-box'}> </div>
        <div className={"row g-0 " +c.addStyleClass(PRE, 'mobile-outer-row')}>
        <div className={'col g-0'}>

          <div className="row g-0 mobile-name-title-wrapper">
                <h1 className="name-title mobile-name-title">
                    <div>Jack</div>
                    <div>Henry</div>
                    <div>Welsh</div>
                    <div>-----------</div>
                </h1>
          </div>
        
        {/* MOBILE BODY */}
          <div className={"row g-0 " +c.addStyleClass(PRE, 'mobile-body')}>
            <div className='col-2 hh-mobile-arrow arrow-btn-left'
             onClick={() => setModuleIdx( (moduleIdx-1 < 0)?MODS_LEN-1:moduleIdx-1)}>
              <div className="arrow-left"></div>
            </div>

            <div className="col"> <Module {...props.modules[moduleIdx]}/></div>

            <div className='col-2 hh-mobile-arrow arrow-btn-right'
            onClick={() => setModuleIdx( (moduleIdx+1==MODS_LEN)?0:moduleIdx+1)}
            >
              <div className="arrow-right"></div>
            </div>

          </div>

          <div className={'row g-0 '+c.addStyleClass(PRE, 'mobile-footer-row')}>
            
          </div>
          {/* END FOOTER ROW */}

        </div> {/*END OUTER COL */}
        </div> {/*END OUTER ROW */}
      </div> 
    ); {/*END WRAPPER CONTAINER */}

  }
  
  export default Homepage;
  