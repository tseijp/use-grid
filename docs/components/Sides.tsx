import React, {FC,Fragment,CSSProperties,useCallback,useState,useRef} from 'react';
import { useSpring, animated, config } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import {useGrid} from '../../src'
import {BindsProps,SidesProps} from'../types'


export const SidesArea :FC<BindsProps> = ({spring, bind, fontSize}) => {
    const width = spring.x.to((x:number)=>x>1?"100%":fontSize)
    const background = spring.scale.to((s:number)=>{
        const rate  = spring.x.animation.to/window.innerWidth //0 ~ 0.5
        return `linear-gradient(90deg,rgba(0,0,0,${rate+s-1}),rgba(0,0,0,0))`
    })
    const style = {position:"fixed",top:0,left:0,height:"100%",zIndex:1,overflow:"hidden"}
    return <animated.div style={{...style,width,background}} {...bind()} />
}

export const SidesToggle : FC<BindsProps> = ({fontSize, spring, bind}) => {
    const style = { position:"fixed",fontSize,width:fontSize,
                    color:"#212121",transform:`translate(-50%,-50%)`,textAlign:"center",
                    userSelect:"none",} as CSSProperties
    return (
        <animated.div {...bind()} style={{top:fontSize,left:fontSize,position:"absolute",...spring}}>
            <i className={`fas fa-${"align-justify"}`} style={style}/>
        </animated.div>
    )
}

export const SidesContainer : FC<BindsProps> = ({bind, fontSize, spring, children}) => {
    const margin = `${fontSize} 0px 0px 0px`
    const width = spring.x.to((x:number)=>x > 0 ? x : 0)
    const style = { position:"fixed",top:"2%",left:0,zIndex:1,overflow:"hidden",
                    borderRadius:`0px ${fontSize} ${fontSize} 0px`,
                    height:`96%`, backgroundColor:"#212121",} as CSSProperties
    return (
        <animated.div style={{...style,width}}>
            <div style={{position:"absolute",margin}}>{children}</div>
        </animated.div>
    )
}

export const SidesItem :FC<BindsProps> = ({children, fontSize, /*spring, width*/}) => { // TODO1701
    //const x = spring.x.to( (x:number) => (x-width) ) // TODO1701
    const style = { padding:"10px 10px 10px 32px",color:"#818181",
                    display:"block",transition:"0.75s",fontSize, }//x, y:spring.y}
    return <animated.div {...{children, style}} />
}

export const Sides : FC<SidesProps> = ({children, onOpen=()=>null}={}) => {
    const opened = useRef<boolean>(false)
    const setOpened = useCallback((bool:boolean)=>( (opened.current=bool), onOpen&&onOpen() ),[])
    const width = useGrid<number>({xs:200,md:400})
    const fontSize = useGrid<string>({xs:"50px",md:"75px"})
    const [spring, set] = useSpring<any>( () => ({x:0,y:0,scale:1}) )
    const open  =(velocity:number)=>(setOpened(true),set({x:width,y:0,config:velocity!==0?config.wobbly:config.slow}))
    const close =(velocity:number)=>(setOpened(false),set({x:0    ,y:0,config:{...config.stiff,velocity }}))
    const bind = useGesture({
        onHover : ({hovering}) => set({scale:hovering?1.2:1}),
        onDrag : ({last,down,vxvy:[vx,],movement:[mx,my],cancel}) => {
            if ((my<-width*.5||width*.5<my) && cancel) cancel()
            if (!last) return set({x:(opened.current?width:0)+(down?mx:0),y:down?my:0})
            if(!opened.current) return (mx===0||mx> width*0.5||vx> 0.5) ? open(vx) : close(vx)
            if( opened.current) return (mx===0||mx<-width*0.5||vx<-0.5) ? close(vx): open(vx)
        },
    })
    return (
        <Fragment>
            <SidesToggle {...{fontSize, spring, bind, }} />
            <SidesArea   {...{fontSize, spring, bind, }} />
            <SidesContainer{...{fontSize, spring, bind, }}>
            {React.Children.map(children, ((child, key:number)=>
                <SidesItem {...{fontSize, spring, width, key}}>{child}</SidesItem>
            ))}
            </SidesContainer>
        </Fragment>
    )
}
