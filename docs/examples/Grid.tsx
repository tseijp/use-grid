import React from 'react'
import { useGrids } from '../../src'
export const Grid = () => {
    const face = ['🙄','🤣','🧐','🤯','🤮'];
    const ref  = React.useRef(null)
    const [ws] = useGrids(face.length, (i)=>(i%2===0)
        ? { md: 1/5, xl:i/face.length/3 }
        : { md:1/10, xl:i/face.length/6 }
    , [ref]);
    return (
        <div ref={ref} style={{display:"grid", width:"95%"}}>
            {face.map( (emoji, i) =>
                <div key={i} style={{width:ws[i]}}>{emoji}</div>
            )}
        </div>
    );
};
