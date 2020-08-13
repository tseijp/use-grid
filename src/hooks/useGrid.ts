import {useLayoutEffect, useEffect, useCallback, useState, useRef} from 'react';
import {Effect, Config, GridProps as GP, ExtendProps as EP, BasicProps, BasicState, BasicAction} from '../types'
import {defaultConfig, defaultMedia, convertPropsToList as cP2L, mergeConfig} from '../utils'

const createGrid = (effect:Effect) => <T extends any>(
    props:BasicProps<GP<T|EP>>,
    refs:React.RefObject<Element>[] | Element[]  = [],
    { viewConfig={}, mediaConfig={}, ...config }:Config=defaultConfig,
) : [T, BasicAction<GP<T|EP>>] => {
    if (typeof props==='function')
        props = props()
    props = props instanceof Array ? props : Object.entries(props)
    config = mergeConfig<T|EP>(props, {mediaConfig,viewConfig,config}, ['onView'])
    /*{widthRef:refs[0],
        ...(props.find(p=>p[0]==="mediaConfig")||[null,{}])[1],...mediaConfig,
        ...(props.find(p=>p[0]==="viewConfig") ||[null,{}])[1],...viewConfig,
        ...(props.find(p=>p[0]==="config")     ||[null,{}])[1],...config,
    }*/
    // ********** ➊ grid : output value that match your media query ********** //
    const [list, setList] = useState<[string,T|EP][]>( cP2L<T|EP>(props,config) )
    const [grid, setGrid] = useState<T>((list.filter(l=>l[0]==="init")[0]||list[0])[1] as T)
    const [view, setView] = useState<boolean>(viewConfig?.defaultView||false)
    const noneRef = useRef<T>(grid)
    const gridRef = useRef<GP<T|EP>>(props)
    const viewRef = useRef<boolean[]>(Array(refs.length).fill(false))

    // ********** ➋ set : Functions to change media conditions later ********** //
    const set = useCallback<BasicAction<GP<T|EP>>>( (state:BasicState<GP<T|EP>>) => {
        if (typeof state==="function")
            state = state(gridRef.current)
        state = state instanceof Array ? state : Object.entries(state)
        gridRef.current = state
        setList ( cP2L(state, mediaConfig) )
    }, [mediaConfig])

    // ********** 📺 ➌ effect : for useMedia 📺 ********** //
    effect ( () => {
        let mounted = true;
        const {extendKey} = config
        const medias = list.map( ([query,value]:[string,T|EP]) => {
            if (query==="none")
                noneRef.current = value as T
            if (extendKey?.some(q=>q===query))
                return {media:null, fn:null}
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
    }, [list] )

    // ********** 👀 ➍ effect : for useView 👀 ********** //
    effect ( ()=> {
        let mounted = true;
        const {timeout=0,once=false,onView=null,} = config
        const observers = [...refs].map((ref,i) => {
            const el = ref instanceof Element?ref:ref.current
            if ( !el )
                return {observer:null, el}
            const observer = new IntersectionObserver((entries,) => {
                const entry = entries[entries.length-1]
                mounted && setTimeout( () => {
                    viewRef.current[i] = entry.isIntersecting
                    onView && onView(entry.isIntersecting)
                    noneRef.current && setView(viewRef.current.some(v=>v))
                }, timeout)
                mounted && entry.isIntersecting && once && observer.unobserve(el)
            }, { ...viewConfig, root:viewConfig?.root?.current || null })
            observer.observe(el)
            return {observer, el}
        })
        return () => {
            mounted = false;
            once && observers.map(({observer,el})=> el && observer?.unobserve(el) )
        }
    }, [] )
    return [view ? grid : noneRef.current, set]
}

export const useGrid        = createGrid (useEffect);
export const useLayoutGrid  = createGrid (useLayoutEffect);
