import {useLayoutEffect, useEffect, useCallback, useState, useRef} from 'react';
import {Effect, GridProps as G,/*MediaList, MediaObject, MediaString*/} from '../types'
import {mockMediaString, /*queryObjectToString,*/queryPropsToList as qP2L} from '../utils'

type BasicProps<T>  = (()=>T) | T
type BasicState<T>  = ((pre:T)=>T) | T
type BasicAction<T> = (fn:BasicState<T>) => void

const createGrid = (effect:Effect) =>
    <T extends any>(initialGrid:BasicProps<G<T>>):[T|number, BasicAction<G<T>>] => {
    if (typeof initialGrid === 'function')
        initialGrid = initialGrid()
    const gridRef = useRef<G<T>>(initialGrid)
    const [queries, setQueries] = useState<[string,T][]>( qP2L(initialGrid) )
    const [state, set] = useState<T>(queries[0][1])

    const setGrid = useCallback( (updateGrid:BasicState<G<T>>) => {
        if (typeof updateGrid === "function")
            updateGrid = updateGrid(gridRef.current)
        gridRef.current = updateGrid
        setQueries ( qP2L(updateGrid) )
    }, [])

    effect ( () => {
        let mounted = true;
        const medias = queries.map( ([query,value]:[string,any]) => {
            const media = typeof window==="undefined"? mockMediaString:window.matchMedia(query)
            const onChange =()=> mounted && Boolean(media.matches) && set(value)
            media.addListener(onChange);
            mounted && Boolean(media.matches) && set(value);
            return {media, onChange}
        })
        return () => {
            mounted = false;
            medias.map( ({media,onChange}) => media.removeListener(onChange) )
        }
    }, [queries] )

    if (typeof state==="number" && state < 1)
        return [~~((state as number) * window.innerWidth), setGrid] as [number, BasicAction<G<T>>]
    return [state, setGrid] as [T, BasicAction<G<T>>]
}

export const useGrid        = createGrid (useEffect);
export const useLayoutGrid  = createGrid (useLayoutEffect);
