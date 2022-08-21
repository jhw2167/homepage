//React Imports
import React, { useEffect, useState } from 'react';

//Project Imports
import * as c from '../../resources/constants';
import * as api from '../../resources/api';
import MobileHomepage from './MobileHomepage';
import Module from '../components/Module';
import * as CSS from 'csstype';

//Components
import MainHeader from '../subcomponents/MainHeader';

//misc
import { useWindowSize } from '../subcomponents/misc/WindowDims';
import { Link } from 'react-router-dom';

//Data
import moduleData from './Homepage/homepage-data.json';
import Footer from '../narrowcomponents/Footer';

//Homepage constants
const PRE = 'hh';
const SIZES = (width: number) => {
    let lg = Math.floor(width/2000) > 0;
    let md = Math.floor(width/1500) > 0;
    
    if(lg)
        return 'lg';
    else if(md)
        return 'md';
    else 
        return 'sm';
}

const CHAR_LIMIT = 11;

const ASSETS_PATH = 'homepage/'
const generateModules: Function = (setModuleHovered: Function) => {
return moduleData.map( (v: c.ModuleData, i) => {
    return {
        title: v.title,
        image: ASSETS_PATH + v.img,
        index: i,
        setModuleHovered: setModuleHovered,
        //return a drop down option
        options:  { 
                charLimit: CHAR_LIMIT,
                styleClass: PRE, 
                data: v.options.data
                }, //End DropDownProps
        page_prefix: PRE
}});
}

/* Function constants */
const MODULE_ROWS = 2;
const MODULE_COLS = 3;

   //Convert Modules to grid
const modulesToGrid = function(arr: Array<c.ModuleProps>): Array<Array<c.ModuleProps>> {
    let grid: Array<Array<c.ModuleProps>> = new Array<any>();
    for (let i = 0; i < MODULE_ROWS; i++) {
        grid.push(new Array<c.ModuleProps>());
        for (let j = 0; j < MODULE_COLS; j++) {
            grid[i].push(arr[MODULE_COLS*i + j]);
        }
    } // END NESTED LOOP
    return grid;
}

function Homepage() 
{
    //const [windowDims, setWindowDims] = useState<c.Dims2D>(useWindowDimensions());
    let windowDims: c.Dims2D = useWindowSize();
    let headerProps = {q:"", a:""};

    /*States */
    const [moduleHovered, setModuleHovered] = useState<number>(-1);

    /* Effects */
    useEffect( () => {
        
    }, [])

    /* Generate Page Data */
    const modules: c.ModuleProps[] = generateModules(setModuleHovered);

    const shadowedBox = document.getElementById('shadowed-box');
    useEffect( () => {
        if(!shadowedBox) return;

        let innerStyle = (moduleHovered>-1) ? 'z-index: 10' : '';
        shadowedBox.setAttribute('style', innerStyle );
    }, [moduleHovered])

    //RETURN 
    if(windowDims.w < c.MOBILE_WIDTH) 
            return <MobileHomepage modules={modules}/>;
    else
    {
    return (
        <>
        <div className="container-fluid hh-container d-flex flex-column g-0 align-items-center">
        <div id={'shadowed-box'}></div>
            <div className={"row g-0 " +c.addStyleClass(PRE, 'outer-row')}>
                <div className={'col g-0 '+c.addStyleClass(PRE, 'center-col')}>


                    <div className={'row g-0 '+c.addStyleClass(PRE, 'header-row')}>
                     <MainHeader />
                     </div> 
                     {/* END HEADER ROW */}



                    <div className={'row g-0 justify-content-center '+c.addStyleClass(PRE, 'body-row')}>
                       {modulesTableJSX(modules)}
                    </div>
                     {/* END BODY ROW */}

                    <div className={'row g-0 text-align-center '+c.addStyleClass(PRE, 'footer-row')}>
                        <Footer />
                    </div>
                     {/* END FOOTER ROW */}


                </div> {/* END CENTER WRAPPER COL */}
                
            </div> {/*END OUTER ROW */}
        </div> 
        </>
        ); {/*END WRAPPER CONTAINER */}
        
    }//END ELSE


    
  }//END FUNCTIONAL COMPONENT
  
  export default Homepage;
  

  /* Page Modules */

const modulesTableJSX = (modules: c.ModuleProps[]) => {
    return (
        <div className="hh-module-grid-wrapper container">
            {modulesToGrid(modules).map( (arr: Array<c.ModuleProps>, i) => {
                return (<div className="row g-0">{ arr.map( (val: c.ModuleProps) => {
                        return <div className="col g-0"><Module {...val}/></div>
                })}{/* END TCOL WRAPPER */}
                </div>);{/* END TR WRAPPER */}
            })}
        </div>
    );
}