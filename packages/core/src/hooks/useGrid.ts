import React, {useCallback, useState, useRef} from 'react';
import {Effect, Config, GridProps as GP, ExtendProps as EP, BasicProps, BasicState, BasicAction} from '../types'
import {is, defaultConfig, defaultMedia, convertPropsToList as cP2L, mergeConfig} from '../utils'

type OneOrMore<T = any> = T | T[]

const createGrid = (effect: Effect) => <T extends any>(
    initProps: BasicProps<GP<T|EP>>,
    targetRef: (React.RefObject<Element> | Element)[] = [],
    initConfig: Config=defaultConfig,
): [T, BasicAction<GP<T|EP>>] => {
    if (is.fun(initProps))
        initProps = initProps()
    if (is.len(0, targetRef))
        targetRef = []

    const props = initProps instanceof Array ? initProps : Object.entries(initProps)
    const [config] = useState(() => mergeConfig<T|EP>(props, initConfig)) //TODO:set

    // ********** ➊ grid : output value that match your media query ********** //
    const [list, setList] = useState(cP2L<T|EP>(props,config) as [string,T|EP][])
    const [view, setView] = useState(config.defaultView)
    const [grid, setGrid] = useState((list.filter(l=>l[0]==="init")[0]||list[0])[1] as T)
    const noneRef = useRef(null as T | null)
    const gridRef = useRef(initProps as GP<T|EP>)
    const viewRef = useRef(Array(targetRef?.length).fill(view))

    // ********** ➋ set : Functions to change media conditions later ********** //
    const set = useCallback((initState: BasicState<GP<T|EP>>) => {
        if (is.fun(initState))
            initState = initState(gridRef.current)
        gridRef.current = initState
        const state = Array.isArray(initState)
            ? initState
            : Object.entries(initState)
        setList( cP2L(state, config) )
    }, [config])

    // ********** 📺 ➌ effect : for useMedia 📺 ********** //
    effect(() => {
        let mounted = true;
        const {prefix} = config;
        const mediaSet = list.map(([query, value]) => {
            if (query==="none")
                noneRef.current = value as T
            if (prefix?.some(q => q === query))
                return {media:null, fn:null}

            const media = is.und(window)
                ? defaultMedia
                : window.matchMedia(query)
            const fn = () => {
                if (mounted && media.matches)
                    setGrid(value as T)
            }

            media.addListener(fn)
            if (mounted && media.matches)
                setGrid(value as T);
            return { media, fn }
        })

        return () => {
            mounted = false;
            mediaSet.map(({media,fn})=>fn&&media?.removeListener(fn));
        }
    }, [list, config])

    // ********** 👀 ➍ effect : for useView 👀 ********** //
    effect(()=> {
        let mounted = true;
        const {timeout=0, once=false, onView=null} = config;
        const observers = targetRef?.map((ref,i) => {
            const el = (ref as any)?.current || ref
            if (!el)
                return {observer:null, el}

            const observer = new IntersectionObserver(entries => {
                const entry = entries[entries.length-1]
                if (!mounted) return
                setTimeout( () => {
                    viewRef.current[i] = entry.isIntersecting
                    if (onView)
                        onView(entry.isIntersecting) // TODO input entry
                    if (noneRef.current)
                        setView(viewRef.current.some(Boolean))
                }, timeout)
                if (entry.isIntersecting && once)
                    observer.unobserve(el)
            }, { root: config?.root?.current || null })

            observer.observe(el)
            return {observer, el}
        })

        return () => {
            mounted = false;
            if (once)
                observers.map(({observer, el}) => el && observer?.unobserve(el))
        }
    }, [config])

    return [view || !noneRef.current ? grid : noneRef.current, set]
}

export const useGrid = createGrid (React.useEffect);
export const useLayoutGrid  = createGrid (React.useLayoutEffect);
