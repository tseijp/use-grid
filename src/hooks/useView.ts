import {useLayoutEffect, useEffect, useState, useRef} from 'react'
import {Effect, ViewConfig,ViewChangeHandler} from '../types'
import {shallowEqual,defaultConfig} from '../utils'

const createView = (effect:Effect) => (
    target: React.RefObject<Element> | Element | null,
    callback?: ViewChangeHandler,
    { defaultView,once,timeout,...initialConfig }:ViewConfig=defaultConfig.viewConfig,
) => {
    const [view,set] = useState<boolean>(defaultView===true)
    const configRef = useRef(initialConfig)
    effect(() => {
        if (!shallowEqual(configRef.current, initialConfig))
            configRef.current = initialConfig
    }, [initialConfig] )
    effect(() => {
        let mounted = true;
        const element = target instanceof Element?target:target&&target.current
        if ( !element ) return ()=>{mounted = false;}
        const observer = new IntersectionObserver( (entries) => {
            const entry = entries[entries.length-1]
            callback && callback(entry);
            mounted  && setTimeout(()=>set(entry.isIntersecting), timeout)
            mounted  && entry.isIntersecting && once && observer.unobserve(element);
        } , { ...configRef.current, root:configRef.current?.root?.current || null })
        observer.observe(element)
        return ()=>{
            mounted = false;
            once && observer.unobserve(element)
        }
    }, [configRef.current, target])
    return view
}

export const useView       = createView(useEffect)
export const useLayoutView = createView(useLayoutEffect)
