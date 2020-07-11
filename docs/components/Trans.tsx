import React, {FC,Fragment,CSSProperties,useCallback,useMemo,useState,useRef} from 'react';
import { useSpring, animated, config, UseSpringProps } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import {useGrid} from '../../src'
import {BindsProps, TransProps} from '../types'
export interface TransAreaProps {bind:any, fontSize:string,spring:any,}
export const TransArea :FC<BindsProps> = ({spring, bind, fontSize}) => {
    const background = spring.scale.to((s:number) => `linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,${s-1}))`)
    const width    = spring.rotateZ.to((r:number) => `calc(${fontSize}*${Math.cos(r/90*Math.PI)+1} + ${fontSize})`)
    const style = {position:"fixed",top:0,right:0,height:"100%",zIndex:1,overflow:"hidden"}
    return <animated.div style={{...style,width,background}} {...bind()} />
}

export interface TransToggleProps {bind:any, fontSize:string, spring:any}
export const TransToggle : FC<BindsProps> = ({fontSize, spring, bind}) => {
    const getX = useCallback((x:number)=>window.innerWidth-x, [])
    const styles = useMemo<CSSProperties[]>(()=> [
        {position:"absolute",top:fontSize,right:fontSize,fontSize},
        {position:"fixed",textAlign:"center",transform:`translate(-50%,-50%)`,
        color:"#212121",userSelect:"none",}, ], [fontSize])
    return (
        <animated.div {...bind()} style={{...styles[0], ...spring}}>
            <i className={`fas fa-${"align-justify"}`} style={styles[1]}/>
        </animated.div>
    )
}

export interface TransContainerProps {bind:any, fontSize:string, spring:any,}
export const TransContainer : FC<BindsProps> = ({bind, fontSize, spring, children}) => {
    const margin = `calc(${fontSize}*2 - 4%) 0px 0px 0px`
    const style = { position:"fixed",height:`96%`,top:"2%",right:0,zIndex:1,overflow:"hidden", }
    const width = spring.rotateZ.to((r:number)=>`calc(${fontSize}*${Math.cos(r/90*Math.PI)+1})`)
    return (
        <animated.div {...bind()} style={{...style,width}}>
            <div style={{position:"absolute",margin}}>{children}</div>
        </animated.div>
    )
}

export interface TransItemProps {fontSize:string, spring:any, width:number}
export const TransItem :FC<BindsProps> = ({children, fontSize, /*spring, width*/}) => { // TODO1701
    const styles = useMemo<CSSProperties[]>( () => [
        { margin:`calc(${fontSize}/4) 0px`, borderRadius:`${fontSize} 0px  0px ${fontSize}`,
          backgroundColor:"#212121",color:"#818181", display:"inline-block" },
        { margin:`auto calc(${fontSize}/2)`,height:fontSize,fontSize,
          display:"flex",alignItems:"center"} ], [fontSize])
    return (
        <animated.div style={styles[0]}>
            <div style={styles[1]}>{children}</div>
        </animated.div>
    )
}

export const Trans : FC<TransProps> = ({children, onOpen=()=>null}={}) => {
    const opened = useRef<boolean>(false)
    const setOpened = useCallback((bool:boolean)=>( (opened.current=bool), onOpen&&onOpen() ),[])
    const width = useGrid<number>({xs:400,md:600})
    const fontSize = useGrid<string>({xs:"50px",md:"75px"})
    const [spring, set] = useSpring<UseSpringProps>( () => ({x:0, y:0, rotateX:0, rotateY:0, rotateZ:90, scale:1,}) )
    const getrz = (velocity=0) => {
        const pre  = ~~(spring.rotateZ.animation.to/90) //  Math.round( spring.rotateZ.animation.to/90 || 0 ) //
        const unit = ((opened.current?1:0) === (pre%2)?0:1) ? 0:1 //to change:1 no diff:0
        const next = 90 * ( pre + unit * (velocity<0?-1:1) )
        return next // Math.sign(velocity) //
    }
    const open  =(velocity:number)=>(setOpened(true) ,set({rotateZ:getrz(velocity), config:velocity!==0?config.wobbly:config.slow}))
    const close =(velocity:number)=>(setOpened(false),set({rotateZ:getrz(velocity), config:{...config.stiff }}))
    const onBind = useCallback( ({mx=0,vx=0,down=false,last=false}) => {
        if (!last) return set({rotateZ:spring.rotateZ.animation.to+(down?2*(-mx)/width:0)})
        if(!opened.current) return (mx===0||mx<-width*0.5||vx<-0.5) ?  open(-vx) : close(-vx)
        if( opened.current) return (mx===0||mx<-width*0.5||vx<-0.5) ? close(-vx) :  open(-vx)
    }, [spring])
    const bind = useGesture({
        onHover : ({hovering}) => set({scale:hovering?1.2:1}),
        onPinch : ({last,down,offset :[_,a]})  => onBind({down,last,vx:0,mx:a}),
        onDrag  : ({last,down,vxvy:[vx,],movement:[mx,my],}) => onBind({down,last,vx,mx:mx-my})
    })
    return (
        <Fragment>
            <TransToggle    {...{fontSize, spring, bind, }} />
            <TransArea      {...{fontSize, spring, bind, }} />
            <TransContainer {...{fontSize, spring, bind}}>
            {React.Children.map(children, ((child, key:number)=>
                <TransItem {...{fontSize, spring, width, key}} >{child}</TransItem>
            ))}
            </TransContainer>
        </Fragment>
    )
}
