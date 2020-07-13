import React, {FC,Fragment,CSSProperties,useCallback,useMemo,useRef} from 'react';
import { useSpring, animated, config, UseSpringProps } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import {BindsProps, TransProps} from '../types'

export const TransArea :FC<BindsProps> = ({spring, bind, fontSize=50}) => {
    const background = spring.scale.to((s:number) => `linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,${s-1}))`)
    const width    = spring.rotateZ.to((r:number) => `${ fontSize*( Math.cos(r/90*Math.PI)+2 ) }px`)
    //`calc(${fontSize}*${Math.cos(r/90*Math.PI)+1} + ${fontSize})`)
    const style = {position:"fixed",top:0,right:0,height:"100%",zIndex:1,overflow:"hidden"}
    return <animated.div style={{...style,width,background}} {...bind()} />
}

export const TransToggle : FC<BindsProps> = ({spring, bind, fontSize=50}) => {
    const styles = useMemo<CSSProperties[]>(()=> [
        {position:"absolute",top:`${fontSize}px`,right:`${fontSize}px`,fontSize:`${fontSize}px`},
        {position:"fixed",textAlign:"center",transform:`translate(-50%,-50%)`,
        color:"#212121",userSelect:"none",}, ], [fontSize])
    return (
        <animated.div {...bind()} style={{...styles[0], ...spring}}>
            <i className={`fas fa-${"align-justify"}`} style={styles[1]}/>
        </animated.div>
    )
}

export const TransContainer : FC<BindsProps> = ({children, bind, spring, fontSize=50}) => {
    const margin = `calc(${fontSize*2}px - 2%) 0px 0px 0px`  //`calc(${fontSize}*2 - 4%) 0px 0px 0px`
    const style = { position:"fixed",height:`96%`,top:"2%",right:0,zIndex:1,overflow:"hidden", }
    const width = spring.rotateZ.to((r:number)=> `${ fontSize * (Math.cos(r/90*Math.PI)+1) }px` )
    return (
        <animated.div {...bind()} style={{...style,width}}>
            <div style={{position:"absolute",margin}}>{children}</div>
        </animated.div>
    )
}

export const TransItem :FC<BindsProps> = ({children, fontSize=50, /*spring, width*/}) => { // TODO1701
    const styles = useMemo<CSSProperties[]>( () => [
        { margin:`${fontSize/4}px 0px`, borderRadius:`${fontSize}px 0px  0px ${fontSize}px`,
          backgroundColor:"#212121",color:"#818181", display:"inline-block" },
        { margin:`auto ${fontSize/2}px`,height:`${fontSize}px`, fontSize:`${fontSize}px`,
          display:"flex",alignItems:"center"} ], [fontSize])
    return (
        <animated.div style={styles[0]}>
            <div style={styles[1]} onClick={(e)=>e.stopPropagation()}>{children}</div>
        </animated.div>
    )
}

export const Trans : FC<TransProps> = ({children, fontSize=50, width=500, onOpen=()=>null}={}) => {
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
            <TransToggle    {...{fontSize, spring, bind, }} />
            <TransArea      {...{fontSize, spring, bind, }} />
            <TransContainer {...{fontSize, spring, bind}}>
            {React.Children.map(children, ((child, key:number)=>
                <TransItem {...{fontSize, spring, width, key}} >{child}</TransItem>
            ))}
            </TransContainer>
        </div>
    )
}
