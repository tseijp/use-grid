import React, {FC,CSSProperties,useCallback,useMemo,useRef} from 'react';
import { useSpring, animated, config, UseSpringProps } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import {BindsProps, TransProps} from '../types'

export const TransArea :FC<BindsProps> = ({spring, bind, size=50}) => {
    const background = spring.scale.to((s:number) => `linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,${s-1}))`)
    const width    = spring.rotateZ.to((r:number) => `${ size*( Math.cos(r/90*Math.PI)+1.5) }px`)//s*1.5~2.5
    //`calc(${size}*${Math.cos(r/90*Math.PI)+1} + ${size})`)
    const style = {position:"fixed",top:0,right:0,height:"100%",zIndex:1,overflow:"hidden"}
    return <animated.div style={{...style,width,background}} {...bind()} />
}

export const TransToggle : FC<BindsProps> = ({spring, bind, size=50}) => {
    const styles = useMemo<CSSProperties[]>(()=> [
        {position:"absolute",top:size,right:size,fontSize:size},
        {position:"fixed",textAlign:"center",transform:`translate(-50%,-50%)`,
        color:"#212121",userSelect:"none",}, ], [size])
    return (
        <animated.div {...bind()} style={{...styles[0], ...spring}}>
            <i className={`fas fa-${"align-justify"}`} style={styles[1]}/>
        </animated.div>
    )
}

export const TransContainer : FC<BindsProps> = ({children, bind, spring, size=50}) => {
    const margin = `calc(${size*2}px - 2%) 0px 0px 0px`  //`calc(${size}*2 - 4%) 0px 0px 0px`
    const style = { position:"fixed",height:`96%`,top:"2%",right:0,zIndex:1,overflow:"hidden", }
    const width = spring.rotateZ.to((r:number)=> `${ size * (Math.cos(r/90*Math.PI)+1) }px` )
    return (
        <animated.div {...bind()} style={{...style,width}}>
            <div style={{position:"absolute",margin}}>{children}</div>
        </animated.div>
    )
}

export const TransItem :FC<BindsProps> = ({children, size=50, /*spring, width*/}) => { // TODO1701
    const styles = useMemo<CSSProperties[]>( () => [
        { margin:`${size/4}px 0px`, borderRadius:`${size}px 0px  0px ${size}px`,
          backgroundColor:"#212121",color:"#818181", display:"inline-block" },
        { margin:`auto ${size/2}px`,height:`${size}px`, fontSize:`${size}px`,
          display:"flex",alignItems:"center", zIndex:1} ], [size])
    return (
        <animated.div style={styles[0]}>
            <div style={styles[1]}>{children}</div>
        </animated.div>
    )
}

export const Trans : FC<TransProps> = ({children, size=50, width=500, onOpen=()=>null}={}) => {
    const opened = useRef<boolean>(false)
    const setOpened = useCallback((bool:boolean)=>1&&( (opened.current=bool), onOpen&&onOpen() ),[onOpen])
    const [spring, set] = useSpring<UseSpringProps>( () => ({x:0, y:0, rotateX:0, rotateY:0, rotateZ:90, scale:1,}) )
    const getrz = (velocity=0) => {
        const pre  = ~~(spring.rotateZ.animation.to/90) //  Math.round( spring.rotateZ.animation.to/90 || 0 ) //
        const unit = ((opened.current?1:0) === (pre%2)?0:1) ? 0:1 //to change:1 no diff:0
        const next = 90 * ( pre + unit * (velocity<0?-1:1) )
        return next // Math.sign(velocity) //
    }
    const open  =(velocity:number)=>1&&(setOpened(true) ,set({rotateZ:getrz(velocity), config:velocity!==0?config.wobbly:config.slow}))
    const close =(velocity:number)=>1&&(setOpened(false),set({rotateZ:getrz(velocity), config:{...config.stiff }}))
    const onBind = ({mx=0,vx=0,down=false,last=false}) => {
        if (!last) return set({rotateZ:spring.rotateZ.animation.to+(down?2*(-mx)/width:0)})
        if(!opened.current) return (mx===0||mx<-width*0.5||vx<-0.5) ?  open(-vx) : close(-vx)
        if( opened.current) return (mx===0||mx<-width*0.5||vx<-0.5||0.5<vx) ? close(-vx) :  open(-vx)
    }
    const bind = useGesture({
        onHover : ({hovering}) => set({scale:hovering?1.2:1}),
        onPinch : ({last,down,offset :[_,a]})  => onBind({down,last,vx:0,mx:a}),
        onDrag  : ({last,down,vxvy:[vx,],movement:[mx,my],}) => onBind({down,last,vx,mx:mx})
    })
    return (
        <div style={{position:"fixed",top:0,right:0}}>
            <TransToggle    {...{size, spring, bind, }} />
            <TransArea      {...{size, spring, bind, }} />
            <TransContainer {...{size, spring, bind}}>
            {React.Children.map(children, ((child, key:number)=>
                <TransItem {...{size, spring, width, key}} >{child}</TransItem>
            ))}
            </TransContainer>
        </div>
    )
}
