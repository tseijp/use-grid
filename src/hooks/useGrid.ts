import {useLayoutEffect, useEffect, useCallback, useState, useRef} from 'react';
import {Effect, GridProps as GP} from '../types'
import {defaultMedia, convertPropsToList as cP2L} from '../utils'

type BasicProps<T>  = (()=>T) | T
type BasicState<T>  = ((pre:T)=>T) | T
type BasicAction<T> = (fn:BasicState<T>) => void


const createGrid = (effect:Effect) => <T extends any>(
    initialGrid:BasicProps<GP<T>>,
    initialConfig={},
) : [T, BasicAction<GP<T>>] => {
    if (typeof initialGrid === 'function')
        initialGrid = initialGrid()
    // ********** ➊ grid : output value that match your media query ********** //
    const gridRef = useRef<GP<T>>(initialGrid)
    const [list, setList] = useState<[string,T][]>( cP2L(initialGrid, initialConfig) ) // md => max...
    const [grid, setGrid] = useState<T>(list[0][1])

    // ********** ➋ set : Functions to change media conditions later ********** //
    const set = useCallback<BasicAction<GP<T>>>( (updateGrid:BasicState<GP<T>>) => {
        if (typeof updateGrid==="function")
            updateGrid = updateGrid(gridRef.current)
        gridRef.current = updateGrid
        setList ( cP2L(updateGrid, initialConfig) )
    }, [initialConfig])

    /********** ➌ remove : Remove grid from state ********** //
    const removeGrid = useCallback(()=>{
        return //TODO
    }, [])
    */
    // ********** ➍ effect : Set to track condition ********** //

    effect ( () => {
        let mounted = true;
        const medias = list.map( ([query,value]:[string,any]) => {
            const media = typeof window==="undefined"? defaultMedia:window.matchMedia(query)
            const onChange =()=> mounted && Boolean(media.matches) && setGrid(value)
            media.addListener(onChange);
            mounted && Boolean(media.matches) && setGrid(value);
            return {media, onChange}
        })
        return () => {
            mounted = false;
            medias.map( ({media,onChange}) => media.removeListener(onChange) )
        }
    }, [list] )
    return [grid, set]
}

export const useGrid        = createGrid (useEffect);
export const useLayoutGrid  = createGrid (useLayoutEffect);
