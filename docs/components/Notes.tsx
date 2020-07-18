import React, {FC, cloneElement, CSSProperties, Children, useRef} from 'react'
import { useSprings, animated } from 'react-spring'
import { useGesture, } from 'react-use-gesture'
//import {useGrid} from '../../src'
//import {NotesProps} from '../types'

export const NoteCard :FC<any> = ({children, scale, zIndex, bind, fontSize=50, width=500, height=500, dark=false}) => {
    const boxShadow = scale.to((s:number)=>`0px 1px 50px rgba(0,0,0,${s-0.8})`)
    const ref = useRef<HTMLDivElement|null>(null)  //TODO 1907
    const style = {
        scale,zIndex,boxShadow,width,height,//TODO 1903
        position:"absolute",
        background:dark?"#212121":"#fff",
        color     :dark?"#818181":"#000",padding:`${fontSize/2}px 0px 0px 0px`,
        borderRadius:`${fontSize/2}px`, } as CSSProperties
    return (
        <animated.div style={style}>
            <div {...{ref, children}}/>
        </animated.div>
    )
}

const clamp = (x:number, min=0, max=1) :number  => (x < min)?min:(x>max)?max:x
const swap=(arr:number[],ind:number,row:number) => {
    const ret = [...arr.slice(0, ind), ...arr.slice(ind+1, arr.length)]
    return [...ret.slice(0, row), ...arr.slice(ind, ind+1), ...ret.slice(row)]
}
export const Notes:FC<any> =
    ({  position={x:window.innerWidth/2,y:0}, depth=0, rate=1,
        children, fontSize=50, width=500, height=500, dark=false, open=false}) => {
    const length = children?.length || 1
    const childHeight = useRef( Array(length).fill(height) )
    const notes = Children.map(children, (child,key) => {
        const grandLength = Children.count(child.props.children) || 0
        childHeight.current[key] = (grandLength+1)*height
        return (grandLength > 0)
          ? cloneElement(child, { children :
                <Notes {...{fontSize, width, dark, open,
                    depth:depth+1,
                    position:{x:0,y:height}}}>
                    {child.props.children}</Notes>
            })
          : child
    })
    console.log(`Render Note:${depth}`)
    const order = useRef<number[]>(notes.map((c:any,i:number)=>i))
    const getY=({arr=order.current,pre=0})=>position.y+(pre>0?arr.slice(0,pre).map(i=>childHeight.current[i]).reduce((a,b)=>a+b):0)
    const fn = ({arr=order.current,index=-1,pre=-1,h=0,mx=0,my=0,down=false}) => {
        console.log(getY({arr,pre:arr.indexOf(2)}))
        return (i:number) => (down && i===index)
            ? {x:down?mx:0, y:getY({pre})+my, scale:0.9, zIndex:'1', shadow:15, immediate:(n:string)=>n==='y'||n=== 'zIndex'}
            : {x:0, y:getY({arr,pre:arr.indexOf(i)}), scale:1  , zIndex:'0', shadow:1 , immediate:false}
    }
    const [springs, set] = useSprings(notes.length, fn({arr:order.current,h:height}))
    const bind = useGesture({
        onDrag:({down, args:[index], movement:[mx,my]}) => {
            const pre = order.current.indexOf(index)
            const row = clamp( Math.round(pre+my/height), 0, notes.length-1 )
            const arr = swap(order.current, pre, row)
            if(!down) order.current = arr
            set( fn({arr, index, pre, mx, my, h:height, down}) )
        }
    })
    //console.log("Render Notes");
    const background = "rgba(0,100,0,0.5)"
    const style = {width,position:"absolute",transformOrigin:"50% 50% 0px"} as React.CSSProperties
    return (
        <div style={{position:depth===0?"relative":"absolute",top:position.y,
            left:"50%",transform:"translateX(-50%)",
            width,height:childHeight.current.reduce((a,b)=>a+b)}}>
            {springs.map( ({x,y,scale,zIndex}, key) =>
                <animated.div {...{key}} {...bind(key)} style={{x,y,background,...style}}>
                    <NoteCard {...{scale, zIndex, bind, fontSize, width, dark}}>
                        {notes[key]}{position.y}
                    </NoteCard>
                </animated.div>
            )}
        </div>
    )
}
