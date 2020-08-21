import React from 'react';
import {useGrid, useView} from '../../src';
export const View = () => {
    const ref1 = React.useRef(null)
    const ref2 = React.useRef(null)
    const isView = useView(ref1)
    const [fontSize,set] = useGrid({none:150, md:100,lg:200}, [ref1])
    const [background]   = useGrid({
        none:"#fff", init:"#000",
        onView:(bool) =>
            set(bool
                ? {md:150, lg:250}
                : {md:100, lg:200})
    }, [ref1, ref2])
    return (
        <div style={{fontSize,background,transition:"1s"}}>
            <div ref={ref1}>{'😎'}</div>
            {[...Array(5)].map((_,i)=>
                <div key={i}>{isView?'😘':'🤣'}</div>
            )}
            <div ref={ref2}>{'😎'}</div>
        </div>
    )
}
