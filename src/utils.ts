//import {useLayoutEffect, useEffect, useState, useRef} from 'react';
import {/*Effect,*/ GridProps, MediaList, MediaObject, MediaString} from './types'


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

export function queryObjectToString (query:string|MediaObject) : string {
    if (typeof query === 'string') return query;
    const toS = ([key, val]:[string,string|number|boolean]) => {
        const feature = key.replace(/[A-Z]/g,s=>`-${s.toLowerCase()}`).toLowerCase();
        if ( typeof val==='boolean' ) return `${val?'':'not '}${feature}`;
        const isN = typeof val==='number' && /[height|width]$/.test(feature)// ?
        return `(${feature}: ${isN ? `${val<0 ? Number(val)*window.innerWidth : val}px` : val})`;
        //return `(${feature}: ${val}${isNumber?'px':''})`;
    }
    return Object.entries(query).map(toS).join(' and ');
}

export function queryPropsToList <T=any> ( initialProps:GridProps<T> ) : [string, T][] {
    const SIZE = ["xs","sm","md","lg","xl"]
    const toN = (key:string) : number => {
        if ("xs"!==key&&"sm"!==key&&"md"!==key&&"lg"!==key&&"xl"!==key) return 0
        return {xs:1,sm:576,md:768,lg:992,xl:1200}[key]
    }
    const toS = (key:string, next:string|null) : string => {
        const turn = next!==null ? ` and (max-width:${toN(next)-1}px)` : ''
        return `(min-width:${toN(key)}px)${turn}`
    }
    const getMedia = (props:[string,T][]) : [string,T][] => { // [[sm,red], [md,blue], ...]
        const grid:[string,T][] = SIZE.map(s=>props.find(p=>p[0]===s)||null).filter((m):m is [string,T]=>m!==null)
        const xsGr:[string,T][] = (grid.length)? grid.find(g=>g[0]==="xs")?[]:[["xs",grid[0][1]]]: []
        const noGr:[string,T][] = (grid.length)? props.filter(p=>!SIZE.find(s=>s===p[0]))        : props
        return [...noGr, ...[...xsGr,...grid].map((g,i)=>[toS(g[0],i<grid.length-1?grid[i+1][0]:null), g[1]]) as [string,T][] ]
    }
    if ( !initialProps?.length )
        initialProps = Object.entries(initialProps) as MediaList<T>[]
    return getMedia((initialProps as MediaList<T>[]).map( ([key,val]) => [queryObjectToString(key),val] ))
}

export function queryFunctionToList <T=any> ( length:number, initfn:((i:number)=>any) ) {
    const toL =(fn:((i:number)=>any)) => [...Array(length)].map( (_,i:number) => fn(i) )
    const toT =(st:{[key:string]:T}[])=> Object.keys(st[0]).map(k=>({[k]:st.map(s=>s[k])}))
    return Object.assign({},...toT( toL(initfn) ))
}
/*
```javascript
export function queryObjectToString (query) {
    if (typeof query === 'string') return query;
    const toS = ([key, val]) => {
        const feature = key.replace(/[A-Z]/g,s=>`-${s.toLowerCase()}`).toLowerCase();
        const isNumber = typeof val==='number' && /[height|width]$/.test(feature)// ?
        if ( typeof val==='boolean' ) return `${val?'':'not '}${feature}`;
        return `(${feature}: ${val}${isNumber?'px':''})`;
    }
    return Object.entries(query).map(toS).join(' and ');
}

export function queryPropsToList ( props ) {
    const SIZE = ["xs","sm","md","lg","xl"]
    const toN =(key)=> SIZE.find(s=>s===key)? {xs:1,sm:576,md:720,lg:960,xl:1140}[key] : 0
    const toS =(key,next)=>`(min-width:${ toN(key) }px)${ next?` and (max-width:${toN(next)-1}px)`:'' }`
    const getMedia = (props) => {
        const grid = SIZE.map(s=>props.find(p=>p[0]===s)||null).filter((m)=>m!==null)
        const xsGr = (grid.length)? grid.find(g=>g[0]==="xs")?[]:[["xs",grid[0][1]]]: []
        const noGr = (grid.length)? props.filter(p=>!SIZE.find(s=>s===p[0]))        : props
        return [...noGr, ...[...xsGr,...grid].map((g,i)=>[toS(g[0],i<grid.length-1?grid[i+1][0]:null), g[1]])]
    }
    return getMedia( props.map( ([key,val]) => [queryObjectToString(key),val] ) )
}v
```
*/
