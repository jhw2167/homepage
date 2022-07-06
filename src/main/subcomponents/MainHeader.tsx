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
    const [newName, setNewName] = useState<string>('');
    const [typeSpeed, setTypeSpeed] = useState<number>(0)
    const [updateSpan, setUpdateSpan] = useState<boolean>(true);
    /* EFFECTS */
    useEffect( () => {
        console.log("new: %s, curr: %s", newName, name[2]);
        if(updateSpan) {
            name[0] = updateName(newName, name[2])[0];
        } else if(newName) {
            let nameArr = updateName(newName, name[2]);
            nameArr[0] = name[0]; //updateName will pick a new prefix each time, we dont
            console.log("name arr: ");
            console.log(nameArr);
            setName(JSON.parse(JSON.stringify(nameArr)));       //want a new one here, so set to previous
        }
       
        console.log("UPDATED: new: %s, curr: %s", newName, name[2]);
        setTypeSpeed(name[1].length/WORD_SPEED);
        setUpdateSpan(!updateSpan);
        console.log(("===\n\n"));
    }, [newName]);

    /* INTERVALS */
    const WORD_SPEED = NAME_INTERVAL -  TYPE_DELAY;
    useEffect(() => {
        setInterval(() => {
            console.log("\n\n --TRIGGER-- \n\n")
            setNewName(JSON.parse(JSON.stringify(arrayShuffle(NAMES)[0])));
        }, NAME_INTERVAL)
    }, [])
    

    /* Functions */
    const updateName: Function = (updated: string, oldName: string) => {
        console.log('Current: %s, new: %s', oldName, updated);
        
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
        return Array([sub, updated.substring(sub.length), updated]);
    }


    //NARROW COMPENT NameTitle
    const NameTitle = () => {
        return (
            <div className="row name-title-wrapper">
                <h1 className="name-title">
                    <span>
                        {name[0]}
                <Typewriter
                    words={new Array('hi')}
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