//React Imports
import React, { useEffect, useState } from 'react';

//Project Imports
import * as c from '../../resources/constants';
import Module from '../components/Module';
import Footer from '../narrowcomponents/Footer';

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
    const [increment, incrementModules] = useState<number>(0);
    const [slideAnim, setSlideAnim] = useState<string>('');
    const modules = props.modules;

    //Effects
    useEffect( () => {
      if(increment==0)
        return;

      if(increment<0) {
        setModuleIdx( (moduleIdx-1<0)?MODS_LEN-1:moduleIdx-1);
        setSlideAnim('slide-right');
      } else {
        setModuleIdx( (moduleIdx+1==MODS_LEN)?0:moduleIdx+1);
        setSlideAnim('slide-left');
      }
      incrementModules(0);
    }, [increment])

    return (
      <div className="container-fluid mobile h-100 d-flex flex-column">
        <div className="d-flex flex-column vh-100">
          <div className="row mobile-name-title-wrapper">
                <h1 className="name-title mobile-name-title">
                    <div>Jack</div>
                    <div>Henry</div>
                    <div>Welsh</div>
                    <div>---------</div>
                </h1>
          </div>
        
        {/* MOBILE BODY */}
          <div className={"row g-0 " +c.addStyleClass(PRE, 'mobile-body')}>
            <div className='hh-mobile-arrow arrow-btn-left'
             onClick={() => incrementModules(-1)}>
              <div className="arrow-left"></div>
            </div>

            <div className={c.addStyleClass(PRE, 'carousel')}> 
                {modules.map( (m,i) => {
                  const before=(moduleIdx-1<0)?modules.length-1:moduleIdx-1,
                   after=(moduleIdx+1)%modules.length, selected=moduleIdx;
                  
                  let styleClass = c.addStyleClass(PRE, 'slide ');
                  switch(i) {
                    case before: 
                    if(slideAnim.includes('left'))
                       styleClass+=(slideAnim+'-out'); 
                    break;
                    case selected:
                       styleClass+=(' selected '+slideAnim);
                        break;
                    case after: 
                      if(slideAnim.includes('right'))
                       styleClass+=(slideAnim+'-out'); 
                      break;
                  }
                  return <div className={styleClass}><Module {...m}/></div>;
                })}
            </div>

            <div className='hh-mobile-arrow arrow-btn-right'
            onClick={() => incrementModules(1)}
            >
              <div className="arrow-right"></div>
            </div>

          </div>

          <div className={'row text-align-center '+c.addStyleClass(PRE, 'mobile-footer-row')}>
            <Footer />
          </div>
          {/* END FOOTER ROW */}

        </div> {/*END WRAPPER CONTAINER */}
      </div> 
    ); {/*END WRAPPER CONTAINER */}

  }
  
  export default Homepage;
  