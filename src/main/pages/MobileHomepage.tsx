//React Imports
import React, { useEffect, useState } from 'react';

//Project Imports
import * as c from '../../resources/constants';
import * as api from '../../resources/api';
import MobileHomepage from './MobileHomepage';
import Module from '../components/Module';

//Constants
const PRE='hh';

function Homepage() 
{
    return (
      <div className="container-fluid hh-container d-flex flex-column g-0 align-items-center">
        <div className={"row g-0 " +c.addStyleClass(PRE, 'mobile-outer-row')}>
        <div className={'col g-0'}>

          <div className="row g-0 mobile-name-title-wrapper">
                <h1 className="name-title mobile-name-title">
                    <div>Jack</div>
                    <div>Henry</div>
                    <div>Welsh</div>
                </h1>
          </div>
        
          <div className={"row g-0" +c.addStyleClass(PRE, 'mobile-body')}>
            <p> This is a mobile homepage </p>
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
  