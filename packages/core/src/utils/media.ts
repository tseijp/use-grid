import {MediaObject, MediaString, Config} from '../types'
import {is} from './helpers'

export const defaultMedia : MediaString = {
    media: '',
    matches: false,
    onchange: () => {},
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: (_: Event) => true,
};

export const defaultSize = {xs: 1, sm: 576, md: 768, lg: 992, xl: 1200};

export const defaultConfig: Config = {
    mediaConfig:{
        size: defaultSize,
        width: 0,
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
};

export function convertNumToPix <T=any> (
    value: T,
    config?: Config
): T

export function convertNumToPix (value: any, config=defaultConfig) {
    let target = config.widthRef
    if (target && 'current' in target)
        target = target.current
    let width = target
        ? target.clientWidth
        : config.width || 0 // todo window.innerWidth

    if (is.num(value) && value**2 < 1 )
        return value < 0
            ? width*(Number(value) + 1) << 0
            : width*Number(value) << 0

    if ( value instanceof Array && value.every(v => is.num(v)) ) {
        const border = value.filter(v => v>0).map(v => v<1? width*Number(v): v)
        const margin = width - (border.length? border.reduce((a, b) => a+b): 0)
        return value.map(v => v === 0
            ? 0
            : v < 0
            ? (v>-1 ? ~~( margin*Number(-v) ) : v)
            : (v< 1 ? ~~(  width*Number( v) ) : v)
        )
    }
    return value
};

export function convertObjToStr<T = string|number|boolean>(
    query: string|MediaObject<T>,
    config?: Config,
): string;

export function convertObjToStr (query: any, config=defaultConfig){
    if (is.str(query)) return query;
    return [
        config.mediaType || '',
        ...Object
        .entries(query)
        .map(([key, val]) =>
            [ key.replace(/[A-Z]/g, s => `-${s.toLowerCase()}`).toLowerCase(), val ])
        .map( ([key, val]) => is.bol(val)
            ? `${val?'':'not '}${key}`
            : `(${key}: ${is.num(val) && /[height|width]$/.test(key + "")
            ? `${convertNumToPix(val,config)}px`
            : val })`)
    ].filter(Boolean).join(' and ');
};
