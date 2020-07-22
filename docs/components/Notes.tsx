import React, {FC, CSSProperties, Children,useCallback,useMemo,useEffect,useState,useRef} from 'react'
import { useSprings, animated as a } from 'react-spring'
import { useGesture, } from 'react-use-gesture'

const clamp = (x:number, min=0, max=1) :number  => (x<min)?min:(x>max)?max:x
const swap=(arr:number[],ind:number,row:number) => {
    const ret = [...arr.slice(0, ind), ...arr.slice(ind+1, arr.length)]
    return [...ret.slice(0, row), ...arr.slice(ind, ind+1), ...ret.slice(row)]
}

export const Notes:FC<any> = ({children, toggleRight, toggleLeft, depth=0, ...props}) => {
    const {size=50, width=500, height=500, style={}} = props
    const length = children?.length || 1
    const [openLeft , setOpenLeft ] = useState<boolean[]>(Array(length).fill(false))
    const [openRight, setOpenRight] = useState<boolean[]>(Array(length).fill(false))
    const [container, setContainer] = useState<number>(height*length)
    const containerRef = useRef<HTMLDivElement|null>(null)
    const childHeight  = useRef( Array(length).fill(height) )
    /*------------------------- ➊ React Springs -------------------------*/
    const order = useRef<number[]>([...Array(length)].map((_:any,i:number)=>i))
    const isopen = useRef<boolean>(false)
    const getY = ({pre=0,arr=order.current})=>(pre>0?arr.slice(0,pre).map(i=>childHeight.current[i]).reduce((a,b)=>a+b):0)
    const getF = useCallback(({i=-1,arr=order.current,pre=-1,mx=0,my=0,down=false}) => (index:number) => (down && index===i)
        ? {x:down?mx:0,            y:getY({pre})+my, scale:0.9, zIndex:'1', shadow:15, immediate:(n:string)=>n==='y'||n=== 'zIndex'}
        : {x:0,y:getY({pre:arr.indexOf(index),arr}), scale:1  , zIndex:'0', shadow:1 , immediate:false},[])
    const getG = ({i=-1,x=0,s=1,arr=order.current}) => (index:number) => (index===i)
        ? {x:x,y:getY({pre:arr.indexOf(index),arr}), scale:s, zIndex:'0', shadow:1, immediate:false}
        : {x:0,y:getY({pre:arr.indexOf(index),arr}), scale:1, zIndex:'0', shadow:1, immediate:false}
    const open  = ({i=-1,x=0,s=0.9}) =>1&&( (isopen.current=true ), set(getG({i,x,s})) )
    const close = ({i=-1,x=0,s=1.0}) =>1&&( (isopen.current=false), set(getG({i,x,s})) )
    const [springs, set] = useSprings(length, getF({}))
    const bind = useGesture({
        onDrag:({last,down,args:[i],movement:[mx,my],vxvy:[vx,vy],cancel,startTime,timeStamp}) => {
            const pre = order.current.indexOf(i)
            const row = clamp( Math.round(pre+my/height), 0, length-1 )
            const arr = swap(order.current, pre, row)
            if(!down && timeStamp-startTime>100) order.current = arr // TODO
            if(!last) return timeStamp-startTime>100 && set( getF({arr,i,pre,mx,my,down}) )
            const x = (mx>0?1:-1) * size // window.innerWidth/2 - width/2 - size*2
            if(my**2>width**2/4 && cancel) cancel()
            if(!isopen.current) return (mx**2<.1||x**2/2<mx**2||vx**2>1/4)?open({i,x}):close({i})
            if( isopen.current) return (mx**2<.1||x**2/2<mx**2||vx**2>1/4)?close({i}):open({i,x})
        }
    })
    /* ------------------------- ➋ Child Render -------------------------*/
    const styles = useMemo<CSSProperties[]>( () => [
        {width,position:"relative",left:"50%",transform:"translateX(-50%)"},
        {width,position:"absolute",padding:`${size/2}px 0`,transformOrigin:"50% 50% 0px"},///*DEV*/background:"rgba(0,100,0,0.5)"},
        {width,position:"relative",minHeight:height-size, padding:`${size/2}px 0px`,...style},
        {position:"absolute",left:"50%",top:0    ,transform:"translateX(-50%)",overflow:"hidden"},///*DEV*/background:"rgba(0,0,255,0.5)"},
        {position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",fontSize:size,}
    ], [width,size,height, style])
    children = Children.map(children, (child,key) => { //toArray(children)
        const grand = Children.toArray(child.props.children) || []//count(child.props.children) || 0
        return (grand.length>1 && depth===0) // TODO form depth > 0
            ? React.cloneElement(child, {children:grand[0], left:null, right:(
                <Notes {...{...props, depth:depth+1}}>
                    {grand.slice(1)}
                </Notes>
            )})
            : child
    })
    useEffect(()=>{
        const childs = Array.from(containerRef?.current?.children||[])
        childHeight.current = [...childs].map((c:any)=>c.clientHeight)
        set(getF({}))
        setContainer(childHeight.current.reduce((a,b)=>a+b))
    }, [size, getF, openLeft, openRight, set])
    console.log(`Render Notes :${depth}`);
    return (
        <div ref={containerRef} style={{height:container,...styles[0]}}>
            {springs.map( ({x,y,scale,}, key) =>
                <a.div {...{key}} style={{x,y,...styles[1]}}>
                    <a.div {...bind(key)} style={{scale,...styles[2]}}>
                        {children[key]}
                    </a.div>
                    { x.interpolate((px:number)=>px**2>0 ) &&
                    <a.div style={{height:childHeight.current[key],
                        x:x.to((px:number)=> -px+(px>0?-.5:.5)*(width)),//-size) ),
                        y:0, ...styles[3],
                        scale  :x.to((px:number)=>px**2/4>size**2?1:(px>0?px:-px)/(size)),
                        width  :x.to((px:number)=>px>0?px*2:-px*2),
                        display:x.to((px:number)=>px?"inline":"none")
                    }}>
                        <a.div style={{display:x.to((px:number)=>px>0?"inline":"none"),...styles[4]}}
                            onClick={()=>1&&((isopen.current=false), setOpenLeft(p=>Object.assign([],{[key]:!p[key]})))}>
                            {toggleLeft && toggleLeft()}</a.div>
                        <a.div style={{display:x.to((px:number)=>px<0?"inline":"none"),...styles[4]}}
                            onClick={()=>1&&((isopen.current=false), setOpenRight(p=>Object.assign([],{[key]:!p[key]})))}>
                            {toggleRight && toggleRight()}</a.div>
                    </a.div>
                    }
                    { openRight[key] &&/* TODO grand child*/
                        ( children[key].props?.right || '' )
                    }
                </a.div>
            )}
        </div>
    )
}
