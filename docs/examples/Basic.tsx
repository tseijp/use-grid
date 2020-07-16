import React, {FC} from 'react'
import {useMedia, useGrid} from '../../src'
export const Basic:FC<any> = ({...props}) => {
    const isMedium = useMedia({minWidth:720, maxWidth:960});
    const fontSize = useGrid({xs:"2em", md:"50px", xl:"75px"});
    return (
        <div style={{fontSize}} {...props}>
            {isMedium?'😃':'😢'}
        </div>
    );
};
