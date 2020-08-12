import React, {FC, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
//import Mdmd from '@tsei/mdmd';
import { Head, Icon, Pills, Sides, Trans } from '@tsei/core'
import { unregister } from './serviceWorker';
import { useGrid } from '../src';
//import { Basic, BasicCode, Grid, GridCode } from './examples'

import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const App :FC = () => {
    /* state */
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const [lang, setLang] = useState<string>(window?.navigator?.language||'ja')
    const [dark, setDark] = [false,(f:any)=>null]//useGrid<boolean>({md:false, lg:true})
    const [size, setSize] = [1    ,(f:any)=>null]//useGrid<number> ({md:1    , lg:1.5 })
    const [fontSize,] = useGrid<number>({xs:150,none:100,init:0}, [ref1, ref2], {
        onView:(b)=>console.log(b)
    })
    return (
        <div style={{background:dark?"#000":"#fff",minHeight:"100%",padding:size*100,}}>
            <Head {...{size,dark}}>Examples</Head>
            <div style={{fontSize,textAlign:"center",transition:"1s"}}>
                <div ref={ref1}>{'😎'}</div>
                {[...Array(10)].map((_,key:number)=>
                    <div {...{key}}>{'😘'}</div>
                )}
                <div ref={ref2}>{'😎'}</div>
            </div>
            <Sides {...{size}}>
                <p onClick={()=>window.location.href="/note"}>Note</p>
                <p onClick={()=>window.location.href="/hook"}>Hook</p>
                <p onClick={()=>window.location.href="/sign"}>Sign</p>
            </Sides>
            <Trans {...{size}}>
                <div onClick={()=>setLang(p=>p!=='Ja'?'Ja':'En')}>{lang.toUpperCase()}</div>
                <div onClick={()=>setDark((p:any)=>({md:p.lg,lg:p.md}))}>{dark?'🌛':'🌞'}</div>
                <div onClick={()=>setSize((p:any)=>({md:p.lg,lg:p.md}))}>{size<75?'👶':'👨'}</div>
            </Trans>
            <Pills {...{size}}>
                <Icon   {...{dark,size}} fa="ellipsis-h"    onOpen={()=>null}>
                  <Icon {...{dark,size}} fa="share-square"  onOpen={()=>null}/>
                  <Icon {...{dark,size}} fa="sign-in-alt"   onOpen={()=>null}/>
                  <Icon {...{dark,size}} fa="location-arrow"onOpen={()=>null}/>
                </Icon>
            </Pills>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
unregister();


/* Debug for Pills
<Pills {...{fontSize:50, width, dark,open:true}}>
    <i className="fas fa-ellipsis-h"         onClick={()=>null}>
        <i className="fas fa-share-square"   onClick={()=>null}>
            <i className="fas fa-bold"       onClick={()=>null}/>
        </i>
    </i>
</Pills>
*/
