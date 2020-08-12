import {useLayoutEffect, useEffect, useCallback, useState, useRef} from 'react';
import {Effect, Config, GridProps as GP, BasicProps, BasicState, BasicAction} from '../types'
import {defaultConfig, defaultMedia, convertPropsToList as cP2L, shallowEqual} from '../utils'

const createGrid = (effect:Effect) => <T extends any>(
    initialGrid:BasicProps<GP<T>>,
    refs:React.RefObject<Element>[] | Element[] | [] = [],
    { defaultView=false,once=false,timeout=0,onView=null,...initialConfig}:Config=defaultConfig,
) : [T, BasicAction<GP<T>>] => {
    // ********** ➊ grid : output value that match your media query ********** //
    if (typeof initialGrid === 'function')
        initialGrid = initialGrid()
    const gridRef = useRef<GP<T>>(initialGrid)
    const [list, setList] = useState<[string,T][]>( cP2L(initialGrid, initialConfig) )
    const [grid, setGrid] = useState<T>((list.filter(l=>l[0]==="init")[0]||list[0])[1])
    const [view, setView] = useState<boolean>(defaultView)
    const viewRef = useRef<boolean[]>(Array(refs.length).fill(false))
    const noneRef = useRef<T>(grid)
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
    // ********** 📺 effect : for useMedia 📺 ********** //
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
    // ********** 👀 effect : for useView 👀 ********** //
    effect ( ()=> {
        let mounted = true;
        const observers = [...refs].map( (ref,i) => {
            const element = ref instanceof Element?ref:ref.current
            if ( !element ) return {observer:null, element}
            const observer = new IntersectionObserver((entries,) => {
                const entry = entries[entries.length-1]
                mounted && setTimeout(() => {
                    viewRef.current[i] = entry.isIntersecting
                    onView && onView(entry.isIntersecting)
                    noneRef.current && setView(viewRef.current.some(v=>v))
                }, timeout)
                mounted && entry.isIntersecting && once && observer.unobserve(element)
            }, { ...configRef.current, root:configRef.current?.root?.current || null })
            observer.observe(element)
            return {observer, element}
        })
        return () => {
            mounted = false;
            once && observers.map(({observer,element})=>
                element && observer?.unobserve(element)
            )
        }
    }, [] )
    return [view ? grid : noneRef.current, set]
}

export const useGrid        = createGrid (useEffect);
export const useLayoutGrid  = createGrid (useLayoutEffect);
