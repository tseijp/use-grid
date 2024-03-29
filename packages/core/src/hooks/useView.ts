import {RefObject, useState, useRef} from 'react'
import {Effect, ViewConfig, ViewChangeHandler} from '../types'
import {is, defaultConfig} from '../utils'

export const createView = (effect:Effect) => (
    target: RefObject<Element> | Element | null,
    onView?: ViewChangeHandler,
    viewConfig: ViewConfig = defaultConfig.viewConfig,
) => {
    const {defaultView, once, timeout, ...initialConfig} = viewConfig
    const [view, set] = useState<boolean>(defaultView === true)
    const configRef = useRef(initialConfig)

    effect(() => {
        if (!is(configRef.current, initialConfig))
            configRef.current = initialConfig
    }, [initialConfig])

    effect(() => {
        let mounted = true;
        const root = configRef.current?.root?.current || null
        const el = target instanceof Element
            ? target
            : target?.current
        if (!el)
            return () => void (mounted = false)

        const observer = new IntersectionObserver( (entries) => {
            const entry = entries[entries.length-1]
            if (onView)
                onView(entry);
            if (!mounted) return
            setTimeout(() => set(entry.isIntersecting), timeout)
            if(entry.isIntersecting && once)
                observer.unobserve(el);
        } , {...configRef.current, root})

        observer.observe(el)

        return () => {
            mounted = false;
            if (once)
                observer.unobserve(el)
        }
    }, [configRef.current, target])
    return view
};
