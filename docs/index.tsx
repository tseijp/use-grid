import React, {FC, useState} from 'react';
import ReactDOM from 'react-dom';
import {useGrid} from '../src';
import {unregister} from './utils/serviceWorker';
import {Card,Sides,Split,Trans,Trees,usePage} from '@tsei/core';
// import {Title} from './parts'
import {About} from './About'
import {Grids} from './Grids'
import {View}  from './View'

import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const Pages = {About, Grids, View}
const App :FC = () => {
    const [lang, setLang] = useState<string>(window?.navigator?.language||'ja')
    const [dark, setDark] = useGrid<number>({md:1, lg:0})
    const [size, setSize] = useGrid<number>({md:1, lg:1.5 })
    const [page, setPage] = usePage<{Page:any}>({Page: ({id}:any) => (Pages as any)[id||"About"] || "None"})
    return (
        <div style={{minHeight:"100vh",background:dark?"#000":"#f1f1f1"}}>
            <Split styleItem={{margin:size*50}}>
                <Card min={1} style={{width:"100%",height:"100%"}}>
                    <Trees styleItem={{color:"black"}}>
                        <>
                            <a onClick={()=>setPage({id:"",i:0})}>About</a>
                            <a onClick={()=>setPage({id:"",i:1})}>TOP</a>
                        </>
                        <>
                            <a onClick={()=>setPage({id:"API",i:0})}>API</a>
                        </>
                        <>
                            <a onClick={()=>setPage({id:"Exmple",i:0})}>Exmple</a>
                        </>
                    </Trees>
                </Card>
                <page.Page />
            </Split>
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
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
unregister()
