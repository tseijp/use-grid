import React, {FC, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
//import Mdmd from '@tsei/mdmd';
import { Head, Icon, Pills, Sides, Trans } from '@tsei/core'
import { unregister } from './serviceWorker';
import { useGrid, useView } from '../src';
//import { Basic, BasicCode, Grid, GridCode } from './examples'

import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const App :FC = () => {
    /* state */
    const [lang, setLang] = useState<string>(window?.navigator?.language||'ja')
    const [dark, setDark] = useGrid<boolean>({md:false, lg:true})
    const [size, setSize] = useGrid<number> ({md:1    , lg:1.5 })
    //const [fontSize,set] = useGrid({"hover:hover":100, "hover:none":200})
    const ref = useRef(null)
    const isView = useView(ref)
    //const [none, setNone] = useGrid<boolean>({md:false,none:true})
    return (
        <div style={{background:dark?"#000":"#fff",minHeight:"100%",padding:size*100,}}>
            <Head {...{size,dark}}>Examples</Head>
            <div style={{textAlign:"center"}}>
                {[...Array(20)].map((_,key:number)=>
                    <p> <Icon {...{key,size}} fa="home" /> </p>
                )}
                <div ref={ref} style={{fontSize:isView?200:100,transition:"1s"}}>{'😎'}</div>
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
