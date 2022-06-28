//Project imports
import * as c from '../../resources/constants';

//other imports
import _, { PairValue, values } from 'underscore';
import * as CSS from 'csstype';
import React, { KeyboardEvent, MutableRefObject,
    ReactElement, useEffect, useRef, useState } from 'react';



/* Interfaces */
import { DropDownProps } from '../../resources/constants';

/* Global constants */

function DropDown(props: DropDownProps ) {

     /* STATES */
    const [extHovCells, setExtHovCells] = useState<Set<any>>(new Set());
    const [hovCells, setHovCells] = useState<Set<any>>(new Set());
    const [deepHovCell, setDeepHovCell] = useState<any>();

    const [data, setData] = useState<any[]>(props.data);
    const [selected, setSelected] = useState<any>('');
    const [dropDownPlace, setDropDownPlace] = useState<number>(-1);
    const [dropDownInc, setDropDownInc] = useState<number>(0);
    const [scrollPos, setScrollPos] = useState<number>(0);
    const [prevScrollDir, setPrevScrollDir] = useState<number>(0);

    const scrollableDivRef = useRef<HTMLDivElement>(null);
    const CELL_HEIGHT = (props.cellHeight) ? props.cellHeight : scrollableDivRef.current?.
    children.item(0)?.  //inner div
    children.item(0)?. //inner table;
    children.item(0)?.  //inner tbody
    children.item(data.length-1)?.clientHeight as number;
    const ANIM_CELL_HEIGHT = (props.animCellHeight) ? props.animCellHeight : 0;

    const parentAfterClick = (props.afterClick) ? props.afterClick : (v: any) => {};

    /* EFFECTS */
     /* For setting hovered cell from outside this component */
    useEffect( () => {
        if(props.hovCellFunc) {
            props.hovCellFunc((s: Set<any>) => (s: Set<any>) => setExtHovCells(s));
        }

        if(props.setFuncSetDDPosExternally) {
            props.setFuncSetDDPosExternally((i: number) => (i: number) => setDropDownInc(i));
        }
    }
    , [])
    

    useEffect( () => {
        if(extHovCells) {
            setHovCells(extHovCells);
        }
    }
    , [extHovCells])


    //Sets selected data from dropDownPlace
    useEffect( () => {
        if(dropDownPlace<0 || dropDownPlace>=data.length) {
            setSelected(''); //default, no value selected spot
        } else {
            setSelected(data.at(dropDownPlace));
        }
    }
    , [dropDownPlace])


    //updates dropDownPlace from externally set increment
    useEffect( () => {

        if(dropDownInc==0) {
            hovCells.clear();
            setDropDownPlace(-1);
            scrollableDivRef.current?.scroll({top: 0});
        } else if (dropDownInc==Infinity) {
            return;
        }

        let newDDPlace = dropDownInc + dropDownPlace;
       // console.log("inc dd place, %d : start: ", newDDPlace, dropDownPlace )
        if(newDDPlace==dropDownPlace || newDDPlace<0 || newDDPlace==data.length) {
            return; //no relevant value for this position, keep it
        } else {
            
            //when going down, IF(scrollPos + () > h / 2)
            const H = scrollableDivRef.current?.clientHeight as number;
            let n = (H - ANIM_CELL_HEIGHT) / (CELL_HEIGHT)-2;
            let d = ((n-1)*CELL_HEIGHT + ANIM_CELL_HEIGHT) / n;

            d*=dropDownInc;
            setScrollPos(scrollPos+d);
            if(dropDownInc==prevScrollDir)
            scrollableDivRef.current?.scroll(0, Math.max((scrollPos - 3*CELL_HEIGHT), 0));
           
            setPrevScrollDir(dropDownInc);
            hovCells.delete(dropDownPlace)
            hovCells.add(newDDPlace)
            setDropDownPlace(newDDPlace);
        }
        setDropDownInc(Infinity);
    }, [dropDownInc])



    useEffect( () => {
        if(props.setSelectedData)
            props.setSelectedData(selected);
    }, [selected])

    /* Functions */

    if(!data || data.length<1) {
        //console.log("ret nothing!!! %s: " + props.data.length, props.headers);
        return ( 
            <div ref={scrollableDivRef} className={c.addStyleClass(props.styleClass, 'drop-down-wrapper-div')}>
      
            <table className={c.addStyleClass(props.styleClass, 'drop-down-table')}>
                    <tbody>
                        <tr className={c.addStyleClass(props.styleClass, 'dd-row') + ' empty-drop-down'}>
                             <td>No Options</td></tr>
                    </tbody>
                    </table>
            </div>
        )
    } else {

    return (
        <div ref={scrollableDivRef} className={c.addStyleClass(props.styleClass, 'drop-down-wrapper-div')}>

            <table className={c.addStyleClass(props.styleClass, 'drop-down-table')}>
                    <tbody>
                    {/*         Now return data row      */}
                    {data.map( (value: c.LinkedText, index: number) => {
                        let isHov: number = (hovCells.has(value) || hovCells.has(index)) ? 1 : 0;
                        isHov += _.isEqual(deepHovCell, value) ? 1 : 0; //0-no hov, 1-hov, 2-deep hov
                        let hovRowStyleClass = (isHov > 0) ? 
                        c.addStyleClass(props.styleClass, 'dd-hov-row') : '';
                        let displayVal = (props.charLimit && value.text.length > props.charLimit) ?
                        value.text.slice(0, props.charLimit) + '...' : value.text;
                        
                        return <tr className= {c.addStyleClass(props.styleClass, 'dd-row')
                        + ' ' + hovRowStyleClass} 
                        onClickCapture={ () => { window.location.href= (value.url) ?
                            value.url :  window.location.href }}
                        onClick={() => {
                            parentAfterClick(value.text);
                            setDropDownPlace(index)}}
                        key={index}
                        onMouseEnter={() => {
                            hovCells.add(value);
                            setHovCells(hovCells); 
                            setDeepHovCell(value); }}
                        onMouseLeave={() => {
                            hovCells.delete(value);
                            setHovCells(hovCells); 
                            setDeepHovCell(null);}}
                         >
                            {/*         Now return data COLS      */}
                            <td className={c.addStyleClass(props.styleClass, 'dd-col')} >
                            {displayVal}
                            </td>
                        </tr>
                        })}
                    {/* END PRINT DATA */}
                    </tbody>
                </table>
        </div>
    );
    } // end ELSE
}//End COMPONENT DROP DOWN


export default DropDown;