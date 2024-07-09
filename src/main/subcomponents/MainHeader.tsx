/* Header component for app, rendered at top of every webpage */
import { useEffect, useState } from "react";
import { Typewriter, useTypewriter, Cursor } from 'react-simple-typewriter'
import arrayShuffle from "array-shuffle";
import React from "react";

//Imgs
const Q = "Man, despite his artistic pretensions, his sophistication, and his many accomplishments - owes the fact of his existence to a six-inch layer of topsoil and the fact that it rains.";
const A = "Paul Harvey";

interface HeaderQuote {
    q?: string,
    a?: string
}

//Name title info
const NAMES = ["Jack Welsh", "J. Henry", "J. Henry Welsh", "Jack Henry Welsh"];
const LONG_NAMES = (arr: Array<string>) => {
    let newArr = new Array<string>();
    for (let index = 0; index < 1000; index++) {
        newArr.push(arrayShuffle(arr)[0]);
    }
    return newArr;
}
    const NAME_INTERVAL = 10000;
    const TYPEWRITER_DELAY = 3000;
    const WORD_SPEED = NAME_INTERVAL - TYPEWRITER_DELAY;
    const BASE_TYPE_SPEED = 180;
function Header(props: HeaderQuote)  {

    /* STATES */
    const [name, setName] = useState<string>(NAMES[0]);

    /* EFFECTS */
    useEffect(() => {
        setInterval(()=> { setName(arrayShuffle(NAMES)[0])}, NAME_INTERVAL)
    }, [])
    
    /* Functions */


    //NARROW COMPENT NameTitle
    const NameTitle = () => {
        return (
            <div className="row name-title-wrapper">
                <h1 className="name-title">
                    <span>
                <Typewriter
                    words={new Array(name)}
                    loop={0}
                    cursor
                    cursorStyle='|'
                    typeSpeed={BASE_TYPE_SPEED}
                    deleteSpeed={BASE_TYPE_SPEED}
                    delaySpeed={TYPEWRITER_DELAY}
                    />
                </span>
                </h1>
            </div>
        );
    }//END NAME TITLE

    
    //NARROW COMPENT NameTitle
    let quote: HeaderQuote = (Object.keys(props).length!==0) ? props : {q: Q, a: A};
    const Quote = () => {
        return (
            <div className="quote-wrapper">
                <div className="header-quote">
                    "{quote.q}"
                </div>
                <div className="header-quote-attrib">
                    - {quote.a}
                </div>
            </div>
        );
    }//END NAME TITLE


    return (
        <>
            <div className="col-8 g-0 header-col">
                    {NameTitle()}
            </div>
                
            <div className="col-4 g-0 header-col">
                {Quote()}
            </div>
        </>
    ); {/* END WRAPPER COL */}

}

export default Header;