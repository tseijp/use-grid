import {useLayoutEffect, useEffect, useCallback, useState, useRef} from 'react';
import {Effect, GridProps as G,/*MediaList, MediaObject, MediaString*/} from '../types'
import {mockMediaString, convertPropsToList as cP2L} from '../utils'

type BasicProps<T>  = (()=>T) | T
type BasicState<T>  = ((pre:T)=>T) | T
type BasicAction<T> = (fn:BasicState<T>) => void


const createGrid = (effect:Effect) => <T extends any>(
    initialGrid:BasicProps<G<T>>,
    initialConfig={},
):[T, BasicAction<G<T>>] => {
    if (typeof initialGrid === 'function')
        initialGrid = initialGrid()
    /*----- ➊ grid : Outputs value that match your media query -----*/
    const gridRef = useRef<G<T>>(initialGrid)
    const [queries, setQueries] = useState<[string,T][]>( cP2L(initialGrid, initialConfig) )
    const [grid, set] = useState<T>(queries[0][1])

    /*----- ➋ set : Functions to change media conditions later -----*/
    const setGrid = useCallback<BasicAction<G<T>>>( (updateGrid:BasicState<G<T>>) => {
        if (typeof updateGrid === "function")
            updateGrid = updateGrid(gridRef.current)
        gridRef.current = updateGrid
        setQueries ( cP2L(updateGrid, initialConfig) )
    }, [initialConfig])

    /*----- ➌ effect : Set the window to track the specified condition -----*/
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
    return [grid, setGrid]
}

export const useGrid        = createGrid (useEffect);
export const useLayoutGrid  = createGrid (useLayoutEffect);
