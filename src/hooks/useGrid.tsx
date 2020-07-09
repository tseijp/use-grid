import {useLayoutEffect, useEffect, useState, useRef} from 'react';
import {Effect, GridProps, MediaList, /*MediaObject, MediaString*/} from '../types'
import {mockMediaString, /*queryObjectToString,*/queryPropsToList} from '../utils'

const createGrid = (effect:Effect) => <T extends any>(...props:GridProps<T>):T => {
    const [state, set] = useState<T|null>(null)
    const queries = useRef<[string,T][]>(
        queryPropsToList<T>( props[0].length
            ? props                    as MediaList<T>[]
            : Object.entries(props[0]) as MediaList<T>[]))
    effect ( () => {
        let mounted = true;
        const medias = queries.current.map( ([query,value]:[string,any]) => {
            const media = typeof window==="undefined"? mockMediaString:window.matchMedia(query)
            const onChange =()=> mounted && Boolean(media.matches) && set(value)
            mounted&&Boolean(media.matches)&&set(value);
            media.addListener(onChange);
            return {media, onChange}
        })
        return () => {
            //mounted = false;
            medias.map( ({media,onChange}) => media.removeListener(onChange) )
        }
    }, [] )
    if (typeof state!=="number"||state>1)
        return state as T
    return state as T //TODO
    // const innerWidth = window.innerWidth //TODO get block width
    // return state as T //`${~~innerWidth*state}px` as T
}

export const useGrid        = createGrid (useEffect);
export const useLayoutGrid  = createGrid (useLayoutEffect);
