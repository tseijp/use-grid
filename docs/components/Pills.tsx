import React, {FC,Fragment,Children,CSSProperties,useMemo,useState,useRef,/*useEffect*/} from 'react'
import { useSprings, animated/*, config*/ } from 'react-spring'
//import { useGesture, } from 'react-use-gesture'

export const Pills:FC<any> = ({
    pos={x:0,y:0,r:Math.PI/4}, depth=0, rate=1.414,
    fontSize=50, dark=false, isOpen=true, ...props}) => {
    const length = useMemo( () => props?.children?.length||1,[props.children] )
    const childPos = useRef( Array(length).fill(pos) )
    const [childHub, setChildHub] = useState( Array(length).fill(false) )
    // depth>0 && console.log(`Render Pills:${depth} isOpen:${isOpen} childHub:${childHub}`);
    const fn = ({/*mx=0,my=0,last=false,down=false*/}) => (i:number) => {
        //depth>1 && console.log(`\tfn:${depth}-${i} ${isOpen?'':'no '}open`);
        const r = pos.r/2 + (Math.PI/2) * ((length-i-1)*10+1)/((length-1)*10+2)-Math.PI/8
        const x = isOpen ?  rate*fontSize*Math.cos(r) : 0
        const y = isOpen ? -rate*fontSize*Math.sin(r) : 0
        childPos.current[i] = {x,y:-y,r}
        return {x, y, scale:isOpen?1:0 }
    }
    const [springs, set] = useSprings( length, fn({}) )
    const setHub=(key=0,isopen=true)=>setChildHub(pre => Object.assign([],pre,{[key]:isopen}))
    //const open =(key=0,velocity=0)=>1&&(setHub(key,true ), console.log(`\topen:${key}`))   TODO 1607
    //const close=(key=0,velocity=0)=>1&&(setHub(key,false), console.log(`\tclose:${key}`))  TODO 1607
    //const bind = useGesture({ onDrag:({last,down,args:[key],movement:[mx,my]}) => null  }) TODO 1607
    const children = useMemo (()=> Children.map( props.children, (child,key) => {
        //depth>1 && console.log(`\tChildren useMemo:${depth}`);
        set(fn({}))
        return child?.props?.children
          ? React.cloneElement(child, {children:
                <Pills {...{key, dark, isOpen:isOpen&&childHub[key],
                    depth:depth+1, pos:childPos.current[key],
                    rate:rate*(1+(depth+1)*0.2),
                    fontSize:fontSize/(1+(depth+1)*0.2),
                    ...child.props}}/>
            })
          : child
    }), [props.children, isOpen, childHub])
    const style = useMemo<CSSProperties>(()=>({
        color:dark?"#818181":"#ffffff"    ,fontSize, width:fontSize,padding:"0px",
        background:"#212121", borderRadius:fontSize,height:fontSize,zIndex:1,
        position:"absolute" ,transform:`translate(-50%,-50%)`,
    }), [fontSize, dark])
    return (
        <div style={{position:"fixed",left:pos.x,bottom:pos.y,}}>
            {springs.map((spring, key) =>
                <animated.div key={`${depth}-${key}`} style={{...spring, ...style}}
                    onClick={e=>1&&(setHub(key, !childHub[key]),e.stopPropagation())}>
                    {children[key]}
                </animated.div>
            )}
        </div>
    )
}
/* TODO 2014
    use grandChild
    <animated.div {...{key}} style={spring}>
        {children[key]?.props?.children && <Pills>
            {children[key].props.children} </Pills> }
    </animated.div>

    children[i].map(c=>c.props.children =()=> c.props.children.length
        ? <Pills>c.props.children</Pills>
        : c.props.children  )
*/
