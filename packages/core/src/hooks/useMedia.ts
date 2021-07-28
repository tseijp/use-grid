// ************************************************** //
// * Ref : https://github.com/streamich/use-media
// ************************************************** //
import {useState} from 'react';
import {Effect, MediaObject, MediaString} from '../types'
import {is, defaultMedia, convertObjToStr} from '../utils'

export const createMedia = (effect:Effect) => (
    rawQuery:string|MediaObject, defaultState=false
) : boolean => {
    const query = convertObjToStr(rawQuery);
    const [state, set] = useState(defaultState);

    effect(() => {
        let mounted = true;
        const media:MediaString = is.und(window)
            ? defaultMedia
            : window.matchMedia(query);
        const onChange = () => mounted && set(Boolean(media.matches))
        media.addListener(onChange)
        set(media.matches);
        return () => void (mounted=false, media.removeListener(onChange) )
    }, [query])
    return state
};
