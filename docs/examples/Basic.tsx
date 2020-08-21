import React, {FC} from 'react'
import {useMedia, useGrid} from '../../src'
export const Basic:FC<any> = () => {
    const isMedium = useMedia({ minWidth:720, maxWidth:960 });
    const [ fontSize, set ]  = useGrid({ xs:37.5, md:50, lg:75 });
    return (
        <div style={{fontSize, textAlign:"center"}}
            onClick={ () => set((p:any)=>({md:p.lg,lg:p.md})) }>
            {isMedium?'😃':'😢'}
        </div>
    );
};
