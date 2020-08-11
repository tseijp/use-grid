import {useLayoutEffect, useEffect, useState, useRef} from 'react'
import {Effect, ViewOptions,ViewChangeHandler} from '../types'
import {shallowEqual} from '../utils'

const createView = (effect:Effect) => (
    target: React.RefObject<Element> | Element | null,
    callback?: ViewChangeHandler,
    { defaultIntersecting, once, timeout=0, ...initialOptions }: ViewOptions = {},
) => {
    const [view,set] = useState<boolean>(defaultIntersecting===true)
    const optionsRef = useRef(initialOptions)
    effect(() => {
        if (!shallowEqual(optionsRef.current, initialOptions))
            optionsRef.current = initialOptions
    }, [initialOptions] )
    effect(() => {
        let mounted = true;
        const element = target instanceof Element?target:target&&target.current
        if ( !element ) return
        const observer = new IntersectionObserver( (entries) => {
            const entry = entries[entries.length-1]
            callback && callback(entry);
            mounted  && setTimeout(()=>set(entry.isIntersecting), timeout)
            mounted  && entry.isIntersecting && once && observer.unobserve(element);
        } , { ...optionsRef.current, root:optionsRef.current?.root?.current || null })
        observer.observe(element)
        return ()=>{
            mounted = false;
            once && observer.unobserve(element)
        }
    }, [optionsRef.current, target])
    return view
}

export const useView       = createView(useEffect)
export const useLayoutView = createView(useLayoutEffect)
