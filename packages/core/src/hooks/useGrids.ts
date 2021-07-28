import {RefObject} from 'react'
import {is, defaultConfig, convertFuncionToList as $} from '../utils'
import {Config, FunctionProps, FunctionAction} from '../types'

export const createGrids = (useGrid: any) => <T extends any> (
    length: number,
    props: FunctionProps<T>,
    refs: RefObject<Element>[] | Element[] | [] = [],
    cofig: Config=defaultConfig,
): [T[], FunctionAction<T>] => {
    if (is.fun(props))
        props = [...Array(length)].map((_, i) => (props as any)(i))

    const [grids, set] = useGrid($(props), refs, cofig)

    const setGrid = (state:FunctionProps<T>) => {
        if (is.fun(state))
            state = [...Array(length)].map((_, i) => (state as any)(i))
        set($(state))
    }

    return [grids, setGrid]
};
