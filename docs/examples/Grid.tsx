import React, {FC} from 'react'
import { useMedia, useGrid } from '../../src'

export const Grid:FC<any> =({...props})=> {
    const isMedium = useMedia({minWidth:1/2, maxWidth:1/3});
    const width = useGrid({xs:1/2, md:1/3, xl:1/4});
    return (
        <div style={{display:"grid"}} {...props}>
            <div style={{width, background:isMedium?"red":"blue"}}>
                {isMedium?'😃':'😢'}
            </div>
        </div>
    );
};