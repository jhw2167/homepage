//React Imports
import React, { useEffect, useState } from 'react';


//Project Imports
import MobileHomepage from './MobileHomepage';

//Components
import MainHeader from '../subcomponents/MainHeader';


//misc
import * as c from '../../resources/constants';
import { useWindowSize } from '../subcomponents/misc/WindowDims';

const PRE = 'hh';

function Homepage() 
{
    //const [windowDims, setWindowDims] = useState<c.Dims2D>(useWindowDimensions());
    let windowDims: c.Dims2D = useWindowSize();
    let headerProps = {q:"", a:""};

    //Module Information
    

    //RETURN 
    if(windowDims.w < c.MOBILE_WIDTH) 
            return <MobileHomepage/>;
    else 
    {
    return (
        <div className="container-fluid">
            <div className="row outer-row g-0">
                <div className="col-1"></div>
                <div className={'col g-0 '+c.addStyleClass(PRE, 'center-col')}>


                    <div className={'row g-0 '+c.addStyleClass(PRE, 'header-row')}>
                     <MainHeader />
                     </div> 
                     {/* END HEADER ROW */}



                    <div className={'row g-0 '+c.addStyleClass(PRE, 'body-row')}>
        
                    </div>
                     {/* END BODY ROW */}

                    <div className={'row g-0 '+c.addStyleClass(PRE, 'footer-row')}>
            
                    </div>
                     {/* END FOOTER ROW */}


                </div> {/* END CENTER WRAPPER COL */}

                <div className="col-1"></div>
                
            </div> {/*END OUTER ROW */}
        </div> 
        ); {/*END WRAPPER CONTAINER */}
    
    }//END ELSE


    
  }//END FUNCTIONAL COMPONENT
  
  export default Homepage;
  