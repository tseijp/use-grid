import React, {Fragment, FC, useState, useRef} from 'react'
import { useSprings, animated, config } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import {useGrid} from '../../src'
import {NotesProps} from '../types'

export const NotesContainer :FC<any> = ({children, fontSize=50, height=500}) => {
    const style = {height,display:"flex",justifyContent:"center", }
    return <div style={style}>{children}</div>
}

export const NoteCard :FC<any> = ({children, scale, bind, fontSize=50, width=500, height=500, dark=false}) => {
    const boxShadow = scale.to((s:number)=>`0px 1px 50px rgba(0,0,0,${s-0.8})`)
    const ref = useRef<HTMLDivElement|null>(null)  //TODO 1907
    const style = {
        scale, //transition:"1s",
        width :`${width -fontSize}px`, boxShadow,
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
interface fnProps { newOrder:number[], index?:number,curInd?:number,
                    mx?:number , my?:number    ,height?:number,  down?:boolean,}
export const Notes:FC<any> = ({children, fontSize=50, width=500, dark=false}) => {
    const notes = children//'Lorem ipsum dolor foge'.split(' ')
    const order = useRef<number[]>(notes.map((c:any,i:number)=>i))
    const [height, setHeight] = useState(500)
    const fn = ({newOrder, index=-1, curInd=-1, mx=0, my=0, down=false}:fnProps) => {
        return (i:number) => (down && i===index)
            ? {x:down?mx:0, y:curInd*height+my  , scale:0.8, zIndex:'1', shadow:15, immediate:(n:string)=>n==='y'||n=== 'zIndex'}
            : {x:0, y:newOrder.indexOf(i)*height, scale:1  , zIndex:'0', shadow:1 , immediate:false}
    }
    const [springs, set] = useSprings(notes.length, fn({newOrder:order.current,height}))
    const bind = useGesture({
        onDrag:({down, args:[index], movement:[mx,my]}) => {
            const curInd = order.current.indexOf(index)
            const curRow = clamp( Math.round(curInd+my/height), 0, notes.length-1 )
            const newOrder = swap(order.current, curInd, curRow)
            set( fn({newOrder, index, curInd, mx, my, height, down}) )
            if(!down) order.current = newOrder // TODO 1629 authorized
        }
    })
    const background = "rgba(0,100,0,0.5)"
    const style = {width,position:"absolute",padding:`${fontSize/2}px`,transformOrigin:"50% 50% 0px"} as React.CSSProperties
    return (
        <Fragment>
            <NotesContainer {...{fontSize, width}} height={notes.length*height}>
                {springs.map( ({x,y,scale,zIndex}, key) =>
                    <animated.div {...{key}} {...bind(key)} style={{x,y,background,height,...style}}>
                        <NoteCard {...{scale, bind, fontSize, width, dark}}>
                            {notes[key]}
                            {`y:${y.animation.to} key:${key}`}
                        </NoteCard>
                    </animated.div>
                )}
            </NotesContainer>
        </Fragment>
    )
}
