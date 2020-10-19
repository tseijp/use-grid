import React, {FC, useRef} from 'react'
import {useMedia, useGrid, Grid} from '../src'
import {Props,Notes, Card, Split} from '@tsei/core'
import {Mdmd} from '@tsei/mdmd'
import md from './About.md'

const EG1 = () => {
    const ref = useRef(null)
    const isMedium = useMedia({ minWidth:720, maxWidth:960 });
    const [fontSize] = useGrid({xs:37.5, md:50, lg:75}, [ref])
    return (
            <Card min={1} style={{fontSize, textAlign:"center"}}>
                <Split>
                    <div style={{background:"rgba(255,0,0,.5)"}}/>
                    <div ref={ref}>{isMedium? "😋":"😎" }</div>
                    <div style={{background:"rgba(0,0,255,.5)"}}/>
                </Split>
            </Card>
    )
}
export const About:FC<Props> = ({size, dark}) => {
    return (
        <>
            <Mdmd md={md} />
            <EG1 />
        </>
    );
};
