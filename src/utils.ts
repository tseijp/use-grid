import {MediaList, MediaObject, MediaString, Config} from './types'
//  ************************* 📺 useMedia 📺 *************************  //
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
    mediaConfig:{
        size: {xs:1,sm:576,md:768,lg:992,xl:1200},
        width: window.innerWidth,
        widthRef: null,
        mediaType: null,
    },
    viewConfig:{
        once: false,
        onView: null,
        timeout: 0,
        defaultView: true,
    },
    prefix : ['none','init','onView','mediaConfig','viewConfig']
}
export function convertNumToPix <T=any> (
    value:T, config:Config=defaultConfig
) : T {
    const widthRef = config.widthRef
    const element = widthRef instanceof Element?widthRef:widthRef?.current
    const width = element ? element.clientWidth : window.innerWidth
    if ( typeof value==="number" && value**2 < 1 )
        return value<0
            ? ~~( width*(Number(value)+1) ) as unknown as T
            : ~~( width*Number(value)     ) as unknown as T
    if ( value instanceof Array && value.every(v=>typeof v==="number") ) {
        const border = value.filter(v=>v>0).map(v=>v<1?width*Number(v):v)
        const margin = width - (border.length? border.reduce((a,b)=>a+b):0)
        return value.map(v=> v===0 ? 0 : v<0
            ? (v>-1 ? ~~( margin*Number(-v) ) : v)
            : (v< 1 ? ~~(  width*Number( v) ) : v)
        ) as unknown as T
    }
    return value
}
export function convertObjToStr<T=string|number|boolean>(
    query:string|MediaObject<T>,
    config:Config = defaultConfig,
) : string {
    if (typeof query==='string') return query;
    return [ config.mediaType||'', ...Object
        .entries(query)
        .map( ([key,val]:[string,T]) : [string,T] =>
            [ key.replace(/[A-Z]/g,s=>`-${s.toLowerCase()}`).toLowerCase(), val ])
        .map( ([key,val]:[string,T]) : string => (typeof val==='boolean')
          ? `${val?'':'not '}${key}`
          : `(${key}: ${  typeof val==='number' && /[height|width]$/.test(key)
              ? `${convertNumToPix(val,config)}px`
              : val })`)
    ].filter(v=>v).join(' and ');
}
//  ************************* 👌 useGrid 👌 *************************  //
//  * mergeConfig
//  *   * initProps :{...size, ...prefix}
//  *   * initConfig:{xConfig, prefix, ...xConfig, ...prefix}
//  *   *  => {...xConfig, ...prefix} = defaultProps
//  * convertPropsToList
//  *   * {md:0, lg:.5, {min...}:1}      =Object.entries=>
//  *   * [[md,0],[lg,.5],[min...,1]]    =[convertObjToStr,convertNumToPix]=>
//  *   * [[md,0],[lg:100],[min...,200]] =convertPrefixToList=>
//  *   * [['min-width...',0],[min-width...,.5]]
//  ************************* ************* *************************  //
export const mergeConfig = <T=any>(
    props:MediaList<T>[], config:Config
) : Config => {
    const {prefix, viewConfig, mediaConfig, ...initConfig} = config
    const configs = {viewConfig, mediaConfig, initConfig}
    return Object.assign({},
        Object.fromEntries( props.filter(p=>prefix.some(key=>key===p[0])) ),
     ...Object.entries(configs).map( ([key,conf]:[string,any])=>({
            ...(( props.find(p=>p[0]===key) || [null,{}] )[1]), ...conf
        }) ),
    )
}
export function convertPrefixToList <T=any>(
    props:[string,T][],
    {size={xs:1,sm:576,md:768,lg:992,xl:1200}}:Config
) : [string,T][] {
    const keys = Object.keys(size)
    const toN = (key:string) :number => keys.find(k=>k===key)? size[key] : 0
    const toS = (key:string,i:number,grid:[string,T][]) =>`(min-width:${ toN(key) }px)${
        i+1-grid.length<0 ? ` and (max-width:${toN(grid[i+1][0])-1}px)` : ''
    }`
     //const rmNone =(key:string):string=>key.replace(/(-none|none)/gi, '')  // ??
    const grid = keys.map(s=>props.find(p=>p[0]===s)||null).filter(m=>m!==null) as [string,T][]
    const xsGr = (grid.length)?grid.find(g=>g[0]==="xs")?[]:[["xs",grid[0][1]]] as [string,T][]:[]
    const gtos = [...xsGr,...grid].map((g,i)=>[toS(g[0],i,grid), g[1]])         as [string,T][]
    const noGr = (grid.length)?props.filter(p=>!keys.find(s=>s===p[0])) : props
    return [...noGr, ...gtos]  // as [string,T][]
}
export function convertPropsToList <T=any> (
    props:MediaList<T>[], config:Config
) : [string,T][] {
    const prefix = props.map( ([key,val])=>[  //TODO
        convertObjToStr(key, config),
        convertNumToPix<T>(val, config)
    ]) as [string,T][]
    return convertPrefixToList<T>(prefix, config)
}
//  ************************* 👌👌 useGrids 👌👌 *************************  //
//  *Inputting an array as "return value of initialFunc" is not yet implemented.
//  *That is, it supports only the left side of the following types
//  *    GridProps<T=any> = {[key:string]:T} | MediaList<T>[]
//  *So you cant use G<T> Type as previous code!
//  ***********************************************************  //
export function convertFuncToList <T=any> (
    props:{[key:string]:T}[]
) {
    const list = props.map((p:any)=>p instanceof Array?p:Object.entries(p))
    return list[0].map(p=>p[0]).map(key =>
        [key, list.map(p=>(p.find(v=>v[0]===key) as any)[1])]
    ) as [string, T[]][]
}
//  ************************* 🥰 shallowEqual 🥰 *************************  //
//  * Ref : https://github.com/dashed/shallowequal/blob/master/index.js
//  ************************* ******************* *************************  //
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
