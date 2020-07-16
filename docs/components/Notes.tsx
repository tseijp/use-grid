import React, {Fragment, FC, cloneElement, Children, useState, useRef} from 'react'
import { useSprings, animated, config } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import {useGrid} from '../../src'
import {NotesProps} from '../types'

export const NotesContainer :FC<any> = ({children, height=500}) => {
    const style = {height,display:"flex",justifyContent:"center", }
    return <div style={style}>{children}</div>
}

export const NoteCard :FC<any> = ({children, scale, bind, fontSize=50, width=500, height=500, dark=false}) => {
    const boxShadow = scale.to((s:number)=>`0px 1px 50px rgba(0,0,0,${s-0.8})`)
    const ref = useRef<HTMLDivElement|null>(null)  //TODO 1907
    const style = {
        scale, width :`${width -fontSize}px`, boxShadow,
        background:dark?"#212121":"#fff",
        color     :dark?"#818181":"#000",
        height:`${height-fontSize}px`, padding:`${fontSize/2}px 0px 0px 0px`,
        borderRadius:`${fontSize/2}px`, overflow:"hidden"}
    return (
        <animated.div {...{style,...bind()}}>
            <div {...{ref, children}}/>
        </animated.div>
    )
}

const clamp = (x:number, min=0, max=1) :number  => (x < min)?min:(x>max)?max:x
//const swap = (arr:number[],from=0,to=1):number[]=> Object.assign([],arr,{[from]:arr[to],[to]:arr[from]})
const swap=(arr:number[],ind:number,row:number) => {
    const ret = [...arr.slice(0, ind), ...arr.slice(ind+1, arr.length)]
    return [...ret.slice(0, row), ...arr.slice(ind, ind+1), ...ret.slice(row)]
}
export const Notes:FC<any> = ({children, fontSize=50, width=500, dark=false, open=false}) => {
    //const notes = open ? children : [children[0]]////'Lorem ipsum dolor foge'.split(' ')
    const notes = Children.map(children, (child,key) => {
        return (child?.props?.children)
          ? cloneElement(child, { children :
                <Notes {...{fontSize, width, dark, open}}>
                    {child.props.children}</Notes>
            })
          : child
    })
    const order = useRef<number[]>(notes.map((c:any,i:number)=>i))
    const [height, /*setHeight*/] = useState(500)
    const fn = ({arr=order.current,index=-1,pre=-1,h=0,mx=0,my=0,down=false}) => {
        return (i:number) => (down && i===index)
            ? {x:down?mx:0, y:pre*h+my, scale:0.9, zIndex:'1', shadow:15, immediate:(n:string)=>n==='y'||n=== 'zIndex'}
            : {x:0, y:arr.indexOf(i)*h, scale:1  , zIndex:'0', shadow:1 , immediate:false}
    }
    const [springs, set] = useSprings(notes.length, fn({arr:order.current,h:height}))
    const bind = useGesture({
        onDrag:({down, args:[index], movement:[mx,my]}) => {
            const pre = order.current.indexOf(index)
            const row = clamp( Math.round(pre+my/height), 0, notes.length-1 )
            const arr = swap(order.current, pre, row)
            set( fn({arr, index, pre, mx, my, h:height, down}) )
            if(!down) order.current = arr // TODO authorized
        }
    })
    //console.log("Render Notes");
    const background = "rgba(0,100,0,0.5)"
    const style = {width,position:"absolute",padding:`${fontSize/2}px`,transformOrigin:"50% 50% 0px"} as React.CSSProperties
    return (
        <Fragment>
            <NotesContainer {...{fontSize, width}} height={notes.length*height}>
                {springs.map( ({x,y,scale,zIndex}, key) =>
                    <animated.div {...{key}} {...bind(key)} style={{x,y,background,height,...style}}>
                        <NoteCard {...{scale, bind, fontSize, width, dark}}>
                            {notes[key]}
                        </NoteCard>
                    </animated.div>
                )}
            </NotesContainer>
        </Fragment>
    )
}
