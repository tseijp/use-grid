import React, {FC,Suspense, useMemo} from 'react'
import {Canvas} from 'react-three-fiber'
// import {Card,Props} from '@tsei/core'

const Box = () => {
    return (
        <mesh>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial />
        </mesh>
    )
}
export const Title = () => <></>
// export const Title:FC<Props> = ({size=1, dark=false}) => {
//     const borderRadius = useMemo(() => [0,0,size*50,size*50,''].join('px '), [size])
//     return (
//         <>
//             <Card min={1} rate={.1} style={{width:"100%",borderRadius}} {...{size,dark}}>
//                 <Canvas
//                     style={{width:"100%",height:`calc(100vh - ${100*size}px)`,margin:0,padding:0}}
//                     shadowMap concurrent noEvents colorManagement pixelRatio={2}
//                     camera={{position:[0,0,2],far:1000}}
//                     gl={{powerPreference:'high-performance', alpha:true, antialias:false, stencil:false, depth:false}}
//                     onCreated={({gl}) => gl.setClearColor('#f5f5f5')}>
//                     <gridHelper rotation={[Math.PI/2, 0, 0]} scale={[1,1,1]}/>
//                     <Suspense fallback={null}>
//                     </Suspense>
//                 </Canvas>
//             </Card>
//             <div style={{width:"100%", height:100*size, textAlign:"center"}}>
//                 <div>Get</div>
//                 <div>started</div>
//             </div>
//         </>
//     )
// }
