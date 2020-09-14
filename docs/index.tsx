import React, {FC, useState} from 'react';
import ReactDOM from 'react-dom';
import {useGrid} from '../src';
import {unregister} from './serviceWorker';
import {Head,Card,Notes,Sides,Trans} from '@tsei/core';
import * as Examples from './examples';
//import {useGesture} from 'react-use-gesture';
//import {useSpring, animated as a} from 'react-spring';
//import {Mdmd} from '@tsei/mdmd';

import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const App :FC = () => {
    const [lang, setLang] = useState<string>(window?.navigator?.language||'ja')
    const [dark, setDark] = useGrid<number>({md:1, lg:0})
    const [size, setSize] = useGrid<number>({md:1, lg:1.5 })
    return (
        <div style={{minHeight:"100%",padding:size*100,
                    transition:"1s",background:dark?"#000":"#f1f1f1",}}>
            <Head {...{size,dark}}>Examples</Head>
            {/* TODO initOrder to order */}
            <Notes {...{size:1}} initOrder={Object.keys(Examples).map((_,i)=>i)}>
                {Object.entries(Examples).map(([key,Example])=>
                    <Card key={key}>
                        <Example />
                    </Card>)}
            </Notes>
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
