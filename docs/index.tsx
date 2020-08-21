import React, {FC, useState} from 'react';
import ReactDOM from 'react-dom';
import { Head, Icon, Card, Pills, Sides, Trans } from '@tsei/core'
import { unregister } from './serviceWorker';
import * as Examples from './examples'
import { useGrid } from '../src'
//import Mdmd from '@tsei/mdmd';

import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const App :FC = () => {
    /* state */
    const [lang, setLang] = useState<string>(window?.navigator?.language||'ja')
    const [dark, setDark] = useGrid<boolean>({md:true, lg:false})
    const [size, setSize] = useGrid<number> ({md:1   , lg:1.5 })
    const style = {display:"flex",justifyContent:"center",alignItems:"center",margin:"auto"}
    return (
        <div style={{background:dark?"#000":"#fff",minHeight:"100%",padding:size*100}}>
            <Head {...{size,dark}}>Examples</Head>
            {/*<Notes {...{size,dark}}>*/}
            {Object.entries(Examples).map(([key,Example])=>
                <React.Fragment key={key}>
                    <Head size={size/2}>{key}</Head>
                    <Card {...{dark,style}}>
                        <Example/>
                    </Card>
                </React.Fragment>
            )}
            {/*</Notes>*/}
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
