import {useLayoutEffect, useEffect, useCallback, useState, useRef} from 'react';
import {Effect, Config, GridProps as GP} from '../types'
import {defaultConfig, defaultMedia, convertPropsToList as cP2L, shallowEqual} from '../utils'
import {useView} from './useView'
type BasicProps<T>  = (()=>T) | T
type BasicState<T>  = ((pre:T)=>T) | T
type BasicAction<T> = (fn:BasicState<T>) => void


const createGrid = (effect:Effect) => <T extends any>(
    initialGrid:BasicProps<GP<T>>,
    refs?:React.RefObject<Element>[] | Element[] | null,
    { defaultView,once,timeout=0,...initialConfig}:Config=defaultConfig,
) : [T, BasicAction<GP<T>>] => {
    // ********** ➊ grid : output value that match your media query ********** //
    if (typeof initialGrid === 'function')
        initialGrid = initialGrid()
    const gridRef = useRef<GP<T>>(initialGrid)
    const [list, setList] = useState<[string,T][]>( cP2L(initialGrid, initialConfig) )
    const [grid, setGrid] = useState<T>(list[0][1])
    const _view = useView(refs?refs[0]:null)
    //const [view, setView] = useState<boolean>(false)
    //const [none, setNone] = useState<T>(list[0][1])
    const noneRef = useRef<T>(list[0][1])
    const configRef = useRef(initialConfig)
    // ********** ➋ set : Functions to change media conditions later ********** //
    const set = useCallback<BasicAction<GP<T>>>( (updateGrid:BasicState<GP<T>>) => {
        if (typeof updateGrid==="function")
            updateGrid = updateGrid(gridRef.current)
        gridRef.current = updateGrid
        setList ( cP2L(updateGrid, configRef.current) )
    }, [])

    // ********** ➌ effect : Set to track condition ********** //
    effect ( () => {
        if ( !shallowEqual(configRef.current, initialConfig) )
            configRef.current = initialConfig
    }, [initialConfig] )
    // ********** 📺 for useMedia 📺 ********** //
    effect ( () => {
        let mounted = true;
        const medias = list.map( ([query,value]:[string,T]) => {
            if (query==="none")
                noneRef.current = value
            const media = typeof window==="undefined"
              ? defaultMedia
              : window.matchMedia(query)
            const fn=()=>mounted&&Boolean(media.matches)&&setGrid(value)
            media.addListener(fn)
            mounted && Boolean(media.matches) && setGrid(value);
            return { media, fn }
        })
        return ()=>{medias.map(({media,fn})=>media.removeListener(fn));mounted=false}
    }, [list] )
    // ********** 👀 for useView 👀 ********** //
    // TODO
    return [_view?grid:noneRef.current, set]
}

export const useGrid        = createGrid (useEffect);
export const useLayoutGrid  = createGrid (useLayoutEffect);
