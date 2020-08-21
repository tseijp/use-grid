import React, {FC, useRef} from 'react';
import { useLayoutGrids } from '../../src';

export const Grids:FC<any> = () => {
    const ref = useRef(null)
    const [widths] = useLayoutGrids(3, [
        {xs:0, md:0  , lg:-1/2},
        {xs:1, md:-.5, lg:750 },
        {xs:0, md:100, lg:-1/2}
    ], [ref])
    return (
        <div ref={ref} style={{width:"100%",display:"table"}}>
            {widths.map((width,i)=>
                <div key={i} style={{
                    display:"table-cell",width,height:200,
                    color:"white",background:`#${i*3}1${i*3}1${i*3}1`
                }}>{width}</div>
            )}
        </div>
    )
}
