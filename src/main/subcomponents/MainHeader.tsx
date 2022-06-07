/* Header component for app, rendered at top of every webpage */

import { useEffect } from "react";

//Imgs
const Q = "Love is delicate; but at the same time it is most vital and strong. The tiny, tender wave of love rocks the boat of life";
const A = "Marv Ellis, Contact";

interface HeaderQuote {
    q?: string,
    a?: string
}

function Header(props: HeaderQuote)  {


    //NARROW COMPENT NameTitle
    const NameTitle = () => {
        return (
            <div className="row name-title-wrapper">
                <h1 className="name-title">
                    JACK HENRY WELSH
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