//import {useLayoutEffect, useEffect, useState, useRef} from 'react';
import {/*Effect,*/ GridProps as G, MediaList, MediaObject, MediaString} from './types'


export const mockMediaString : MediaString = {
    media: '',
    matches: false,
    onchange: ()=>{},
    addListener: ()=>{},
    removeListener: ()=>{},
    addEventListener: ()=>{},
    removeEventListener: ()=>{},
    dispatchEvent: (_: Event) => true,
};
interface Config {
    size:{[key:string]:number},
    width:number,
    widthRef:any,
}
export const defaultConfig : Config = {
    size  : {xs:1,sm:576,md:768,lg:992,xl:1200},
    width : window.innerWidth,
    widthRef:null,
}

export function convertNumToPix <T=any> (value:T, config:Config) :T {
    const width = config.widthRef?.current?.offsetWidth || config.width
    if ( typeof value==="number" && value < 1 )
        return ~~( Number(value) * width ) as unknown as T
    if ( value instanceof Array && value.every(v=>typeof v === "number") )
        return value.map(v=> ~~( Number(v) * width )) as unknown as T
    return value
}

export function convertObjToStr (
    query:string|MediaObject,
    initialConfig = {},
) : string {
    const config = {...defaultConfig, ...initialConfig}
    if (typeof query === 'string') return query;
    const toS = ([key, val]:[string,string|number|boolean]) => {
        const feature = key.replace(/[A-Z]/g,s=>`-${s.toLowerCase()}`).toLowerCase();
        if ( typeof val==='boolean' ) return `${val?'':'not '}${feature}`;
        const isN = typeof val==='number' && /[height|width]$/.test(feature)// ?
        return `(${feature}: ${isN ? `${ convertNumToPix(val,config) }px` : val})`;
    }
    return Object.entries(query).map(toS).join(' and ');
}

export function convertPropsToList <T=any> (
    initialProps:G<T>,
    initialConfig = {}
) : [string,T][] {
    const config = {...defaultConfig, ...initialConfig}
    const keys = Object.keys(config.size)
    const toN = (key:string) : number => {
        if ( keys.find(k=>k===key) )
            return config.size[key]
        return 0
    }
    const toS = (key:string, next:string|null) : string => {
        const turn:string = next!==null ? ` and (max-width:${toN(next)-1}px)` : ''
        return `(min-width:${toN(key)}px)${turn}`
    }
    const getMedia = (props:[string,T][]) : [string,T][] => { // [[sm,red], [md,blue], ...]
        const grid:[string,T][]=keys.map(s=>props.find(p=>p[0]===s)||null).filter((m):m is [string,T]=>m!==null)
        const xsGr:[string,T][]=(grid.length)? grid.find(g=>g[0]==="xs")?[]:[["xs",grid[0][1]]] : []
        const noGr:[string,T][]=(grid.length)? props.filter(p=>!keys.find(s=>s===p[0]))         : props
        const grds:[string,T][]=[...xsGr,...grid].map((g,i)=>[ toS(g[0], i<grid.length-1?grid[i+1][0]:null), g[1] ])
        return [...noGr, ...grds]
    }
    if ( !initialProps?.length )
        initialProps = Object.entries(initialProps)// as MediaList<T>[]
    return getMedia((initialProps as MediaList<T>[]).map( ([key,val])=>[
            convertObjToStr(key, config),
            convertNumToPix<T>(val, config)
        ]) )
}

/* Caution!
Inputting an array as "return value of initialFunc" is not yet implemented.
That is, it supports only the left side of the following types
    GridProps<T=any> = {[key:string]:T} | MediaList<T>[]
So you cant use G<T> Type as previous code!
*/
export function convertFuncToList <T=any> (
    length:number,
    initialFunc:(i:number)=>{[key:string]:T}
) {
    const toL =(fn:(i:number)=>{[key:string]:T}) => [...Array(length)].map( (_,i:number) => fn(i) )
    const toT =(st:{[key:string]:T}[])=>Object.keys(st[0]).map((k:string)=>({[k]:st.map((s:any)=>s[k])}))
    return Object.assign({},...toT( toL(initialFunc) ))
}
