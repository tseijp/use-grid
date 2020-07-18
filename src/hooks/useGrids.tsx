import { useGrid } from './useGrid'
import {queryFunctionToList as qF2L} from '../utils'
export const useGrids = <T extends any>(length:number, fn:(i:number)=>T) => {
    const [state, set] = useGrid( qF2L(length, fn) )
    const setGrid = (f:((i:number)=>T)) => set( qF2L(length, f) )
    if ( state.filter((s:any)=> typeof s === "number" && s < 1).length!==0 )
        return [state.map((s:number)=>~~(s*window.innerWidth)), setGrid]
    return [state, setGrid]
}

/*
Object.assign(...Object.keys(state[0]).map( k => {k:states.map(s=>s[k])} ))
[ {x:0,y:0}
  {x:1,y:1}
  {x:2,y:2} ]
=>
{x:[0,1,2],y:[0,1,2]}
*/


/*
import React from 'react'
import { useGrids } from 'use-grid'
import './styles.css'

export function App () {
    const faces = ['🙄','🤣','🧐','🤯','🤮']
    const [w] = useGrids(faces.length, i=>({md:1/5 xl:i/15}))
    return (
        <div>
            {faces.map( (face, i) =>
                <div style={{width:w[i]}}>{face}</div>
            )}
        </div>
    )
};
*/
