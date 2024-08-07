/*

*/

import React, { Ref } from "react";

export const axios = require('axios').default;

//GENERLA CONSTANTS
export const MOBILE_WIDTH = 860;

//MEDIA CONSTANTS
export const MODULE_DEFAULT_IMG_PATH= "components/default_module.jpg";

declare module '*.jpg';
declare module '*.png';


/* # # # # # */

/* Interfaces */
export interface Dims2D {
    h: number,
    w: number,
}

export interface LinkedText {
    text: string;
    url?: string;
    openIn?: number;
}
    export const REDIRECT=0;    //constants for openIn
    export const NEW_TAB=1;
	export const NEW_PAGE=2;

export interface ModuleDataDDProps {
    data: LinkedText[]
}

export interface ModuleData {
    title: string;
    img: string;
    options: ModuleDataDDProps;
}

export interface ModuleProps {
    //size: Dims2D;
    title: string;
    index: number;
    image: string;
    options: DropDownProps;
    setModuleHovered: (i: number) => void;
    
    page_prefix: string;
  }

  export interface DropDownProps {
    data: Array<LinkedText>;
    charLimit?: number;
    styleClass: string                  //namespace for styles
    addStyleClasses?: DDHtmlStructure;            //list of space seperated addtional style classes
    inlineStyles?: Object;
    hovCellFunc?: Function;
    setSelectedData?: Function; //sets data selected by DD menu to container
    setFuncSetDDPosExternally?: Function;   //takes a "setStateFunction" that sets the state of a 
    /* container with a setState function internally in dropDown, so the dropDownPlace state can
    be adjusted from outside this component e.g. const [myDDPlaceSetter, SetMyDDPlaceSetter] = useState<Function>(),
    pass "SetMyDDPlaceSetter" to this field then use myDDPlaceSetter(somePlace) to set DDplace externally */
    animCellHeight?: number;
    cellHeight?: number;
    afterClick?: (val: string) => void;  //sets drop down items to do something after they are clicked, e.g. pass
                                        // a setState function for the selected value here
}

export interface DDHtmlStructure {
    div?: string;
    table?: string;
    tbody?: string;
    tr?: string;
    td?: string;
}


export interface PhotoData { 
    dateTime: string; 
    description: string; 
    details: {
         aperture: string;
         exposure: string; 
         focalLength: string; 
         lens: string; 
         make: string; 
         model: string; 
         shutterSpeed: string;
         }; 
    filename: string; 
    location: string; 
    resolution: string; 
    title: string; 
}
/* # # # # # */

//Data Structure Constants


/* # # # # # */

/* COLORS */
    export const PRIM_COLOR = 'rgb(255, 80, 10)';
    export const SEC_COLOR = 'black';
    export const TERT_COLOR = 'white';
    export const TRANS_GREY = 'rgba(196, 196, 196, 0.2)';

    export const PRIM_FONT_COLOR = 'white';
    export const SEC_FONT_COLOR = PRIM_COLOR;

    export const DATA_FONT = 'Lucida Sans';
    export const TITLE_FONT = PRIM_COLOR;

    export const PASTEL_PALETE = [
        //Blues
        '#3D426B',
        '#89CFF0',
        '#abc4ff',

        //Reds
        '#ffe5ec',
        '#ffb3c6',
        '#fb6f92',

        //Greens
        '#a0e8ce',
        '#DAF7A6',
        '#14563e',

        //Yellow
        '#ffde89',
        '#ffca42',
        '#f9b400',

        //Pinks/Purp
        '#D77FA1',
        '#FF0048',
        '#B983FF',

        //Greens Again 
        '#C6D57E',
        '#CDF2CA',
        '#E7FBBE',

        //Red/Orange
        '#FF7878',
        '#F6AE99',
        '#ff8000',

        //Blues again
        '#99FEFF',
        '#316B83',
        '#11324D'


        //Mix 1:  #a7bed3 // #c6e2e9 // #f1ffc4 // #ffcaaf // #dab894
        //Mix 2:  #70d6ff // #ff70a6 // #ff9770 // #ffd670 // #e9ff70
    ];

  //Color picker
    export const colorPicker = function(start: number, total: number): string[]  {
            let picked = new Set<string>();
            let index = start;
            const ERR_COLOR = '#1D1C1A';
            for (let i = 0; i < total; i++) {
                if(index >= PASTEL_PALETE.length) {
                    index %= PASTEL_PALETE.length;
                }
                //console.log("L: %d, Index: %d, val: %s", PASTEL_PALETE.length, index, PASTEL_PALETE.at(index));

                let nextCol = PASTEL_PALETE.at(index);
                if(nextCol) {
                    if(!picked.has(nextCol)) {
                        picked.add(nextCol);
                    } else if(total > PASTEL_PALETE.length) {
                        picked.add(nextCol);
                    } else {
                        i--;
                    }
                }
                
                
                index += ((Math.random() * 3) + 3);
            }

            let res: string[] = [];
            picked.forEach( (value) => {
            //console.log("------- Col: " + value);
            res.push(value);
        })

        return res;
    }


/* UTILITY */
export const MONTHS= ["january","february","march","april","may","june","july",
            "august","september","october","november","december"];
export const MNTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul","aug", "sep", "oct", "nov", "dec"];

    export const convMnYrToTimeFrame = function(mn: string | undefined | null,
         yr: string | undefined | null, asStrings: boolean = false): [Date, Date] {

        //Get Iso month and year
        let temp = -1;
        mn = mn ? mn?.toLocaleLowerCase() : "";
        if(!mn || ( (MNTHS.indexOf(mn)===-1) && (MNTHS.indexOf(mn)===-1) ) ) {
            temp = (new Date(Date.now())).getMonth()+1;
        } else if (mn?.length === 3) {
            temp = MNTHS.indexOf(mn)+1;
        } else {
            temp = MONTHS.indexOf(mn)+1;
        }

        const month: number = temp;
        const year: number = yr ? Number(yr) : (new Date(Date.now())).getFullYear();
        //console.log("M: %d : %s, y: %s : %s", month, mn, year, yr)
        //return dates
        let start: any = new Date(year + "-" + month + "-01");
        let end: any = new Date(( (month === 11) ? year+1 : year) + "-"
         + ((month === 11) ? "1" : month+1) + "-01");

        return [start, end];
    }

    export const truncString = function(a: string, l: number): string {
        return (a.length > l) ? a.slice(0, Math.min(l, a.length)) + '...' : a;
    }

    export const properCase = function(a: string): string {
        return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase();
    }

    export const titleCase = function(a: string): string {
        switch(a) {
          default:
              break;
        }
        const result = a.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    //to 'Title Case'
    //function toTitles(s: string){ return s.replace(/\w\S*/g, function(t) { return t.charAt(0).toUpperCase() + t.substring(1).toLowerCase(); }); }


    export const addStyleClass = function(styleClass: string, type: string): string {
        return type + ' ' + styleClass + '-' + type;
    }

    export const formatDBDate = function(date: string): string {
        let split = date.split('-'); //[2022, MM, YY]
        return Number(split[1]) + '/' + Number(split[2]) +
        '/' + ( Number(split[0]) - 2000);
    }

    export const formatISODate = function(date: Date | number): string {
        if(isNaN(date as number)) return 'NaN Passed';
        return new Date((new Date(date)).toLocaleString('en-US', { timeZone: 'America/Chicago' })
        .split(",")[0]).toISOString().split('T')[0];
    }

/* FUNCTION CONSTANTS */
export const avg = (arr: Array<number>) => { return arr.reduce((a, b) => a + b) / arr.length };

export const normVect = (vect: number[], norm: number[]) => {
    let [mVect, mNorm] = [1, 1];
    mVect = vect.reduce((prev, curr) => {return curr*prev}, mVect);
    mNorm = norm.reduce((prev, curr) => {return curr*prev}, mNorm);

    mVect = Math.sqrt(mVect); mNorm = Math.sqrt(mNorm)

    const NORM = (dim: number) => {return (dim/mVect)*mNorm};
    //console.log("NORM h: %s, w: %s", vect[0], NORM(vect[0]));
    return vect.map((v) => NORM(v));
}

/* FILE IO */
export const checkLocalFile = (uri: string, def: string): string => {
    console.log(uri);
    try {
        return require(""+uri).default;
       } catch (err) {
           console.log(err)
        return def;
       }
}