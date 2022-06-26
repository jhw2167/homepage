//React Imports
import React, { useEffect, useState } from 'react';


//Project Imports
import MobileHomepage from './MobileHomepage';

//Components
import MainHeader from '../subcomponents/MainHeader';


//misc
import * as c from '../../resources/constants';
import * as api from '../../resources/api';
import { useWindowSize } from '../subcomponents/misc/WindowDims';
import Module from '../components/Module';

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

//Media Constants
const BASE_IMG_PATH = "/homepage/";
const BASE_IMG_TYPE = ".jpg";

function Homepage() 
{
    //const [windowDims, setWindowDims] = useState<c.Dims2D>(useWindowDimensions());
    let windowDims: c.Dims2D = useWindowSize();
    let headerProps = {q:"", a:""};

    //Module Information
    const MODULE_ROWS = 2;
    const MODULE_COLS = 3;

    const titles = ['Projects', 'Games', 'Music', 'None', 'Documents', 'Resume'];
    const dropDowns = ['Tracker', 'BO1 Zombies', 'Listen', '', 'Questions, Quotes', 'View']

    const CHAR_LIMIT = 10;
    const modules: Array<c.ModuleProps> = titles.map( (t, i) => {
        return {
            title: t,
            image: BASE_IMG_PATH + t.toLowerCase +'-'+ SIZES(windowDims.w) + BASE_IMG_TYPE,
            //return a drop down option
            options:  {
                        data: dropDowns[i].split(',').map( (v) => {
                            return {
                                text: v,
                                url: api.FRONT_DOMAIN + v
                            }
                        }),
                        charLimit: CHAR_LIMIT,
                        styleClass: PRE
                    }, //End DropDownProps
            page_prefix: PRE
    }});

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

    const modulesTableJSX = () => {
        return (
            <table className='hh-table'>
            <tbody>
                {modulesToGrid(modules).map( (arr: Array<c.ModuleProps>, i) => {
                    return (<tr key={i}>{ arr.map( (val: c.ModuleProps) => {
                            return <td key={val.title}><Module {...val}/></td>
                    })}{/* END TCOL WRAPPER */}
                    </tr>);{/* END TR WRAPPER */}
                })}
            </tbody>{/* END TBODY WRAPPER */}
        </table>
        );
    }

    /* END MODULES */

    //RETURN 
    if(windowDims.w < c.MOBILE_WIDTH) 
            return <MobileHomepage/>;
    else
    {
    return (
        <div className="container-fluid d-flex flex-column g-0 align-items-center">
            <div className={"row g-0 " +c.addStyleClass(PRE, 'outer-row')}>
                <div className={'col g-0 '+c.addStyleClass(PRE, 'center-col')}>


                    <div className={'row g-0 '+c.addStyleClass(PRE, 'header-row')}>
                     <MainHeader />
                     </div> 
                     {/* END HEADER ROW */}



                    <div className={'row g-0 justify-content-center '+c.addStyleClass(PRE, 'body-row')}>
                       {modulesTableJSX()}
                    </div>
                     {/* END BODY ROW */}

                    <div className={'row g-0 '+c.addStyleClass(PRE, 'footer-row')}>
            
                    </div>
                     {/* END FOOTER ROW */}


                </div> {/* END CENTER WRAPPER COL */}
                
            </div> {/*END OUTER ROW */}
        </div> 
        ); {/*END WRAPPER CONTAINER */}
    
    }//END ELSE


    
  }//END FUNCTIONAL COMPONENT
  
  export default Homepage;
  