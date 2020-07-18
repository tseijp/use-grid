import React, {FC} from 'react'
import {useMedia, useGrid} from '../../src'
export const Basic:FC<any> = () => {
    const isMedium = true//useMedia({minWidth:720, maxWidth:960});
    const fontSize = 50//useGrid({xs:"2em", md:"50px", xl:"75px"});
    return (
        <div style={{fontSize}}>
            {isMedium?'😃':'😢'}
        </div>
    );
};
