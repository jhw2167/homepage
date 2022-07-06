/* Header component for app, rendered at top of every webpage */
import { useEffect, useState } from "react";
import { Typewriter, useTypewriter, Cursor } from 'react-simple-typewriter'
import arrayShuffle from "array-shuffle";

//Imgs
const Q = "Love is delicate; but at the same time it is most vital and strong. The tiny, tender wave of love rocks the boat of life";
const A = "Marv Ellis, Contact";

interface HeaderQuote {
    q?: string,
    a?: string
}

//Name title info
const NAMES = ["Jack Welsh", "J. Henry", "J. Henry Welsh", "Jack Henry Welsh"];
const NAME_INTERVAL = 5000;
const TYPE_DELAY = 3000;

function Header(props: HeaderQuote)  {

    /* STATES */
                                                // span - typwriter - full - next
    const [name, setName] = useState<string[]>(['',NAMES[3],NAMES[3]]);
    const [nextName, setNextName] = useState<string>('');
    const [newName, setNewName] = useState<string[]>(['','','']);
    const [typeSpeed, setTypeSpeed] = useState<number>(200)
    const [updateSpan, setUpdateSpan] = useState<boolean>(true);

    /* EFFECTS */
    useEffect( () => {
        console.log("new: %s, curr: %s", newName, name[2]);

            if(updateSpan) {
                let arr: Array<string> = updateName(name[2], nextName);
                console.log("A: " + arr[2]);
                setNewName( arr );
                console.log("Set new name as: " + newName[2]);
                name[0] = newName[0];
                name[1] = newName[1];
            } else {
                setName(newName);
            }
           
            console.log("UPDATED: new: %s, curr: %s", newName, name[2]);
            setTypeSpeed((name[1].length/WORD_SPEED)*10000);
            setUpdateSpan(!updateSpan);
            console.log(("===\n\n"));

    }, [nextName]);

    /* INTERVALS */
    const WORD_SPEED = NAME_INTERVAL - TYPE_DELAY;
    useEffect(() => {
        setInterval(() => {
            console.log("\n\n --TRIGGER-- \n\n")
            setNextName(JSON.parse(JSON.stringify(arrayShuffle(NAMES)[0])));
        }, NAME_INTERVAL)
    }, [])
    

    /* Functions */
    const updateName: Function = (oldName: string, updated: string): Array<string> => {
        //console.log('Current: %s, new: %s', oldName, updated);
        
        //find all substrings the current has with new
        let subs = [''];
        oldName.split('').forEach((v, i) => {
            let s = oldName.substring(0, i) + v;
            if(updated.includes(s))
                subs.push(s);
        })
        console.log(subs);
        //select randome substring
        let sub = arrayShuffle(subs)[0];
        return new Array<string>(sub, updated.substring(sub.length), updated);
    }


    //NARROW COMPENT NameTitle
    const NameTitle = () => {
        return (
            <div className="row name-title-wrapper">
                <h1 className="name-title">
                    <span>
                        {name[0]}
                <Typewriter
                    words={new Array(name[1])}
                    loop={0}
                    cursor
                    cursorStyle='|'
                    typeSpeed={typeSpeed}
                    deleteSpeed={typeSpeed}
                    delaySpeed={TYPE_DELAY}
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