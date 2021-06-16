//  ************************* 📺 useMedia 📺 *************************  //
import {MediaObject, MediaString, Config} from '../types'
import {is} from './helpers'
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

export const defaultConfig: Config = {
    mediaConfig:{
        size: {xs:1,sm:576,md:768,lg:992,xl:1200},
        width: is.und(window)? 0: window.innerWidth,
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
    const element = widthRef instanceof Element
        ? widthRef
        : widthRef?.current
    const width = element
        ? element.clientWidth
        : is.und(window)
        ? 0
        : window.innerWidth

    if (is.num(value) && value**2 < 1 )
        return value < 0
            ? width*(Number(value) + 1) << 0 as unknown as T
            : width*Number(value) << 0 as unknown as T

    if ( value instanceof Array && value.every(v => is.num(v)) ) {
        const border = value.filter(v=>v>0).map(v=>v<1?width*Number(v):v)
        const margin = width - (border.length? border.reduce((a,b)=>a+b):0)
        return value.map(v => v === 0
            ? 0
            : v < 0
            ? (v>-1 ? ~~( margin*Number(-v) ) : v)
            : (v< 1 ? ~~(  width*Number( v) ) : v)
        ) as unknown as T
    }

    return value
}

export function convertObjToStr<T = string|number|boolean>(
    query: string|MediaObject<T>,
    config: Config = defaultConfig,
) : string {
    if (is.str(query)) return query;
    return [
        config.mediaType || '',
        ...Object
        .entries(query)
        .map(([key,val]:[string,T]) : [string,T] =>
            [ key.replace(/[A-Z]/g,s=>`-${s.toLowerCase()}`).toLowerCase(), val ])
        .map( ([key,val]:[string,T]) : string => is.bol(val)
            ? `${val?'':'not '}${key}`
            : `(${key}: ${is.num(val) && /[height|width]$/.test(key)
            ? `${convertNumToPix(val,config)}px`
            : val })`)
    ].filter(Boolean).join(' and ');
}
