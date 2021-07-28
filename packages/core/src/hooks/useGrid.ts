import {RefObject, useCallback, useState, useRef} from 'react';
import {Effect, Config, GridProps, ExtendProps, BasicProps, BasicAction} from '../types'
import {is, defaultConfig, defaultMedia, convertPropsToList as $, mergeConfig} from '../utils'

export const createGrid = (effect: Effect) => <T extends any>(
    initProps: BasicProps<GridProps<T|ExtendProps>>,
    targetRef: (RefObject<Element> | Element)[] = [],
    initConfig: Config=defaultConfig,
): [T, BasicAction<GridProps<T|ExtendProps>>] => {
    if (is.fun(initProps))
        initProps = initProps()
    if (is.len(0, targetRef))
        targetRef = []
    const props = is.arr(initProps)? initProps: Object.entries(initProps)
    const [config] = useState(() => mergeConfig<T|ExtendProps>(props, initConfig))

    // ********** ➊ grid: output value that match your media query ********** //
    const [list, setList] = useState($<T|ExtendProps>(props,config))
    const [view, setView] = useState(config.defaultView)
    const [grid, setGrid] = useState((): T => {
        const prop = list.find(l => l[0]==="init") || list[0]
        return prop?.length > 1? prop[1]: null as any // TODO
    })
    const noneRef = useRef<T>()
    const gridRef = useRef(initProps)
    const viewRef = useRef(Array(targetRef?.length).fill(view))

    // ********** ➋ set: Functions to change media conditions later ********** //
    const set = useCallback(initState => {
        if (is.fun(initState))
            initState = initState(gridRef.current)
        gridRef.current = initState
        const state = Array.isArray(initState)
            ? initState
            : Object.entries(initState)
        setList($(state, config))
    }, [config])

    // ********** 📺 ➌ effect: for useMedia 📺 ********** //
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
                setGrid(value as T)
            return { media, fn }
        })

        return () => {
            mounted = false;
            mediaSet.map(({media,fn})=>fn&&media?.removeListener(fn));
        }
    }, [list, config])

    // ********** 👀 ➍ effect : for useView 👀 ********** //
    effect(() => {
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
};
