import { useGrid } from './useGrid'
import { defaultConfig, convertFuncToList as cF2L} from '../utils'

type FunctionProps<T>  = (i:number) => {[key:string]:T}    // (()=>T) |   //TODO
// type FunctionState<T>  = (i:number) => ((pre:T)=>T) | T                //TODO
type FunctionAction<T> = (fn:FunctionProps<T>) => void

export const useGrids = <T extends any> (
    length:number,
    initialFunc:FunctionProps<T>,//(i:number)=>BasicProps<T>,
    refs:React.RefObject<Element>[] | Element[] | [] = [],
    initialConfig=defaultConfig,
) : [T[], FunctionAction<T>] => {
    const [grids, set] = useGrid<[]>( cF2L<T>(length, initialFunc), refs, initialConfig)
    const setGrid = (f:FunctionProps<T>) => set( cF2L(length, f) )
    return [grids, setGrid]
}

/*
Object.assign(...Object.keys(state[0]).map( k => {k:states.map(s=>s[k])} ))
[ {x:0,y:0}
  {x:1,y:1}
  {x:2,y:2} ]
=>
{x:[0,1,2],y:[0,1,2]}
*/
