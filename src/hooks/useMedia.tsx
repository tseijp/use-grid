import {useLayoutEffect, useEffect, useState, /*useRef*/} from 'react';
import {Effect, /*MediaList, */MediaObject, MediaString, /*AxiosProps*/} from '../types'
import {mockMediaString, queryObjectToString, /*queryPropsToList*/} from '../utils'

const createMedia = (effect:Effect) =>
                    (rawQuery:string|MediaObject, defaultState=false) : boolean => {
    const query:string = queryObjectToString(rawQuery);
    const [state, set] = useState<boolean>(defaultState);
    effect (()=>{
        let mounted = true;
        const MediaString:MediaString = (typeof window === undefined)
            ? mockMediaString
            : window.matchMedia(query);
        const onChange =()=> mounted&&set(Boolean(MediaString.matches))
        MediaString.addListener(onChange);
        set(MediaString.matches);
        return () => 1&&(mounted=false, MediaString.removeListener(onChange) )
    }, [query])
    return state
}

export const useMedia       = createMedia(useEffect);
export const useLayoutMedia = createMedia(useLayoutEffect);

/*
export function useMedia (rawQuery={}, defaultState=false) {
    const query = useRef( queryObjectToString(rawQuery) );
    const [state, set] = useState(defaultState);
    useEffect (()=>{
        const MediaString = (typeof window===undefined) ? mockMediaString : window.matchMedia(query.current);
        const onChange =()=> mounted&&set(Boolean(MediaString.matches))
        MediaString.addListener(onChange);
        set(MediaString.matches);
        return () => (mounted=false, MediaString.removeListener(onChange) )
    }, [])
    return state
}
*/