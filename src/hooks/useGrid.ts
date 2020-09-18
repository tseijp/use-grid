import {useLayoutEffect, useEffect, useCallback, useState, useRef} from 'react';
import {Effect, Config, GridProps as GP, ExtendProps as EP, BasicProps, BasicState, BasicAction} from '../types'
import {defaultConfig, defaultMedia, convertPropsToList as cP2L, mergeConfig} from '../utils'

const createGrid = (effect:Effect) => <T extends any>(
    initProps : BasicProps<GP<T|EP>>,
    refs : React.RefObject<Element>[] | Element[]  = [],
    initConfig:Config=defaultConfig,
) : [T, BasicAction<GP<T|EP>>] => {
    if (typeof initProps==='function')
        initProps = initProps()
    const props = initProps instanceof Array ? initProps : Object.entries(initProps)
    const [config] = useState<Config>(()=>mergeConfig<T|EP>(props, initConfig)) //TODO:set

    // ********** ➊ grid : output value that match your media query ********** //
    const [list, setList] = useState<[string,T|EP][]>( cP2L<T|EP>(props,config) )
    const [view, setView] = useState<boolean>((config as any).defaultView)
    const [grid, setGrid] = useState<T>((list.filter(l=>l[0]==="init")[0]||list[0])[1] as T)
    const noneRef = useRef<T|null>(null)
    const gridRef = useRef<GP<T|EP>>(initProps)
    const viewRef = useRef<boolean[]>(Array(refs.length).fill(view))

    // ********** ➋ set : Functions to change media conditions later ********** //
    const set = useCallback<BasicAction<GP<T|EP>>>( (initState:BasicState<GP<T|EP>>) => {
        if (typeof initState==="function")
            initState = initState(gridRef.current)
        gridRef.current = initState
        const state = initState instanceof Array ? initState : Object.entries(initState)
        setList ( cP2L(state, config) )
    }, [config])

    // ********** 📺 ➌ effect : for useMedia 📺 ********** //
    effect ( () => {
        let mounted = true;
        const {prefix} = config;
        const medias = list.map( ([query,value]:[string,T|EP]) => {
            if (query==="none")
                noneRef.current = value as T
            if (prefix?.some(q=>q===query))
                return { media:null, fn:null }
            const media = window===undefined? defaultMedia : window.matchMedia(query)
            const fn=()=>mounted&&Boolean(media.matches)&&setGrid(value as T)
            media.addListener(fn)
            mounted && Boolean(media.matches) && setGrid(value as T);
            return { media, fn }
        })
        return ()=>{
            mounted = false;
            medias.map(({media,fn})=>fn&&media?.removeListener(fn));
        }
    }, [list,config] )

    // ********** 👀 ➍ effect : for useView 👀 ********** //
    effect ( ()=> {
        let mounted = true;
        const {timeout=0,once=false,onView=null,} = config;
        const observers = [...refs].map((ref,i) => {
            const el = ref instanceof Element?ref:ref.current
            if ( !el )
                return {observer:null, el}
            const observer = new IntersectionObserver((entries,) => {
                const entry = entries[entries.length-1]
                mounted && setTimeout( () => {
                    viewRef.current[i] = entry.isIntersecting
                    onView && onView(entry.isIntersecting) // TODO input entry
                    noneRef.current && setView(viewRef.current.some(v=>v))
                }, timeout)
                mounted && entry.isIntersecting && once && observer.unobserve(el)
            }, { root:config?.root?.current || null })
            observer.observe(el)
            return {observer, el}
        })
        return () => {
            mounted = false;
            once && observers.map(({observer,el})=> el && observer?.unobserve(el) )
        }
    }, [config] )
    return [view || !noneRef.current ? grid : noneRef.current, set]
}

export const useGrid        = createGrid (useEffect);
export const useLayoutGrid  = createGrid (useLayoutEffect);
