import {useLayoutEffect, useEffect, useState, /*useRef*/} from 'react';
import {Effect, MediaObject, MediaString, } from '../types'
import {mockMediaString, queryObjectToString, /*queryPropsToList*/} from '../utils'

const createMedia = (effect:Effect) =>
                    (rawQuery:string|MediaObject, defaultState=false) : boolean => {
    const query = queryObjectToString(rawQuery);
    const [state, set] = useState<boolean>(defaultState);
    effect (()=>{
        let mounted = true;
        const media:MediaString = (typeof window === undefined)
            ? mockMediaString
            : window.matchMedia(query);
        const onChange =()=> mounted&&set(Boolean(media.matches))
        media.addListener(onChange);
        set(media.matches);
        return () => 1&&(mounted=false, media.removeListener(onChange) )
    }, [query])
    return state
}

export const useMedia       = createMedia(useEffect);
export const useLayoutMedia = createMedia(useLayoutEffect);
