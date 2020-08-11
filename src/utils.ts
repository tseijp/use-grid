//import {useLayoutEffect, useEffect, useState, useRef} from 'react';
import {GridProps as G, MediaList, MediaObject, MediaString, Config} from './types'

export const defaultMedia : MediaString = {
    media: '',
    matches: false,
    onchange: ()=>{},
    addListener: ()=>{},
    removeListener: ()=>{},
    addEventListener: ()=>{},
    removeEventListener: ()=>{},
    dispatchEvent: (_: Event) => true,
};
export const defaultConfig : Config = {
    size  : {xs:1,sm:576,md:768,lg:992,xl:1200},
    width : window.innerWidth,
    widthRef:null,
    mediaType:"all",
}
export function convertNumToPix <T=any> (value:T, config:Config):T {
    const width = config.widthRef?.current?.offsetWidth || config.width
    if ( typeof value==="number" && value < 1 )
        return ~~( Number(value) * width ) as unknown as T
    if ( value instanceof Array && value.every(v=>typeof v === "number") )
        return value.map(v=> ~~( Number(v) * width )) as unknown as T
    return value
}
// ************************* 📺 useMedia 📺 ************************* //
export function convertObjToStr<T=string|number|boolean>(
    query:string|MediaObject<T>,
    initialConfig = {},
) : string {
    if (typeof query==='string') return query;
    const config = {...defaultConfig, ...initialConfig}
    return [ config.mediaType, ...Object
        .entries(query)
        .map( ([key,val]:[string,T]) : [string,T] =>
            [ key.replace(/[A-Z]/g,s=>`-${s.toLowerCase()}`).toLowerCase(), val ])
        .map( ([key,val]:[string,T]) : string => (typeof val==='boolean')
          ? `${val?'':'not '}${key}`
          : `(${key}: ${  typeof val==='number' && /[height|width]$/.test(key)
              ? `${convertNumToPix(val,config)}px`
              : val })`)
    ].join(' and ');
}
// ************************* 👌 useGrid 👌 ************************* //
export function convertPropsToList <T=any> (
    initialProps:G<T>,
    initialConfig = {}
) : [string,T][] {
    const config = {...defaultConfig, ...initialConfig}
    const keys = Object.keys(config.size)
    const toN = (key:string):number => keys.find(k=>k===key)? config.size[key] : 0
    const toS = (key:string,next:any):string => `(min-width:${ toN(key) }px)${
        typeof next==="string" ? ` and (max-width:${toN(next)-1}px)` : ''
    }`
    const getMedia = (props:[string,T][]) : [string,T][] => {
        const grid = keys.map(s=>props.find(p=>p[0]===s)||null).filter((m):m is [string,T]=>m!==null)
        const xsGr = (grid.length)?grid.find(g=>g[0]==="xs")?[]:[["xs",grid[0][1]]as[string,T]]:[]
        const gtos = [...xsGr,...grid].map((g,i)=>[ toS(g[0],i+1-grid.length<0&&grid[i+1][0]),g[1] ])
        const noGr = (grid.length)?props.filter(p=>!keys.find(s=>s===p[0])) : props
        return [...noGr, ...gtos] as [string,T][]
    }
    if ( !initialProps?.length )
        initialProps = Object.entries(initialProps)// as MediaList<T>[]
    return getMedia( (initialProps as MediaList<T>[]).map( ([key,val])=>[
            convertObjToStr(key, config),
            convertNumToPix<T>(val, config)
        ]) )
}
// ************************* 👌👌 useGrids 👌👌 ************************* //
// *Inputting an array as "return value of initialFunc" is not yet implemented.
// *That is, it supports only the left side of the following types
// *    GridProps<T=any> = {[key:string]:T} | MediaList<T>[]
// *So you cant use G<T> Type as previous code!
// *********************************************************** //
export function convertFuncToList <T=any> (
    length:number,
    initialFunc:(i:number)=>{[key:string]:T}
) {
    const toL =(fn:(i:number)=>{[key:string]:T}) => [...Array(length)].map( (_,i:number) => fn(i) )
    const toT =(st:{[key:string]:T}[])=>Object.keys(st[0]).map((k:string)=>({[k]:st.map((s:any)=>s[k])}))
    return Object.assign({},...toT( toL(initialFunc) ))
}



// ************************* 🥰 shallowEqual 🥰 ************************* //
// * Ref : https://github.com/dashed/shallowequal/blob/master/index.js
// ************************* ******************* ************************* //
export function shallowEqual(objA:any, objB:any) {
    if (objA===objB)
        return true;
    if (typeof objA!=="object" || !objA|| typeof objB!=="object" || !objB)
        return false;
    const keysA = Object.keys(objA), keysB = Object.keys(objB);
    if (keysA.length !== keysB.length)
        return false;
    const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var idx = 0; idx < keysA.length; idx++) {
        const key = keysA[idx];
        if (!bHasOwnProperty(key) || objA[key]!==objB[key])
            return false;
    }
    return true;
};
