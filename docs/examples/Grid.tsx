import React, {FC} from 'react'
import { useGrids } from '../../src'

export const Grid:FC<any> = () => {
    const faces = ['🙄','🤣','🧐','🤯','🤮']
    const [sizes] = useGrids<number>(faces.length, (i)=>({md:1/5, lg:(i+1)/15}), null, {width:500})
    return (
        <div>
            {faces.map( (face, i) =>
                <div key={i} style={{fontSize:sizes[i], display:"inline"}}>{face}</div>
            )}
        </div>
    )
};

export const GridCode = `
import React, {FC} from 'react'
import { useGrids } from '../../src'

export const Grid:FC<any> = () => {
    const faces = ['🙄','🤣','🧐','🤯','🤮']
    const [sizes] = useGrids<number>(faces.length, (i)=>({md:1/5, lg:(i+1)/15}), {width:500})
    return (
        <div>
            {faces.map( (face, i) =>
                <div key={i} style={{fontSize:sizes[i], display:"inline"}}>{face}</div>
            )}
        </div>
    )
};
`
