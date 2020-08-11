import {useLayoutEffect, useEffect, useState, /*useRef*/} from 'react';
import {Effect, MediaObject, MediaString, } from '../types'
import {defaultMedia, convertObjToStr} from '../utils'

const createView = (effect:Effect) => (
    rawQuery:string|MediaObject, defaultState=false
) : boolean => {
    const query = convertObjToStr(rawQuery);
    const [view, set] = useState<boolean>(defaultState);
    return view
}

export const useView       = createView(useEffect);
export const useLayoutView = createView(useLayoutEffect);
