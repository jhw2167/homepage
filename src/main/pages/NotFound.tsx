//React Imports
import { useEffect, useState, useCallback } from "react";
import { Route, Routes, Navigate, useSearchParams, BrowserRouter} from "react-router-dom";

//imports
import * as c from '../../resources/constants';
import { Typewriter, useTypewriter, Cursor } from 'react-simple-typewriter'
import Header from "../narrowcomponents/Header";

const PRE='nf'

const INTERVAL =  8000;
const TYPEWRITER_DELAY = 4000;
const BASE_TYPE_SPEED = 100;

const DESCR = ["Couldn't find that page :/", "Working on it!"];
function NotFound() {

    /* States */
    const [descr, setDescr] = useState<string>(DESCR[0]);
    const [it, setIt] = useState<number>(0);

    /* Effects */
    useEffect(() => {
        setInterval(()=> {setIt((it>0)?0:1)}, INTERVAL)
    }, [])

    useEffect( () => {
        setDescr(DESCR[it]);
    }, [it])

  return (
    <div className="container-fluid nf-container d-flex flex-column g-0 align-items-center">
      <Header />
         <div className={"row g-0 align-self-center h-100 " +c.addStyleClass(PRE, 'outer-row')}>
                <div className={'col g-0 '+c.addStyleClass(PRE, 'center-col')}>
                    <div className={PRE+'-title'}>404</div>
                    <Typewriter
                    words={new Array(descr)}
                    loop={0}
                    cursor
                    cursorStyle='|'
                    typeSpeed={BASE_TYPE_SPEED}
                    deleteSpeed={BASE_TYPE_SPEED}
                    delaySpeed={TYPEWRITER_DELAY}
                    />
                </div>
        </div>
    </div>
  );
}

export default NotFound;
