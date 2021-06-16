import { useGrid, useLayoutGrid } from './useGrid'
import { is, defaultConfig, convertFuncToList as cF2L} from '../utils'
import { Config, Grid, FunctionProps, FunctionAction } from '../types'


export const createGrids = (usegrid: unknown) => <T extends any> (
    length: number,
    props: FunctionProps<T>,
    refs: React.RefObject<Element>[] | Element[] | [] = [],
    cofig: Config=defaultConfig,
) : [T[], FunctionAction<T>] => {
    if (is.fun(props))
        props = [...Array(length)].map((_, i) => (props as any)(i))

    const [grids, set] = (usegrid as Grid<T[]>)(cF2L(props), refs, cofig)

    const setGrid = (state:FunctionProps<T>) => {
        if (is.fun(state))
            state = [...Array(length)].map((_, i) => (state as any)(i))
        set(cF2L(state))
    }

    return [grids, setGrid]
}

export const useGrids = createGrids(useGrid);
export const useLayoutGrids  = createGrids(useLayoutGrid);

/***   (i) => {md:i,lg:i} or (i) => [[md,i],[lg,i]]
  * => [{md:0,lg:0},{md:1,lg:1}] or [[[md,0],[lg,0]],[[md,1],[lg,1]]]
  * => [[ [md,0], [lg,0] ],[ [md,1], [lg,1] ]]
  * => [[md,[0,1]],[lg,[0,1]]]
 ***/

/*
Object.assign(...Object.keys(state[0]).map( k => {k:states.map(s=>s[k])} ))
[ {x:0,y:0}
  {x:1,y:1}
  {x:2,y:2} ]
=>
{x:[0,1,2],y:[0,1,2]}
*/
