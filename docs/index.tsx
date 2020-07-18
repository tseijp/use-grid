import React, {FC, useState} from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './serviceWorker';
import { useGrid,useGrids } from '../src';
import { Pills, Sides, Trans, /*Notes*/ } from './components'
//import { Basic, Grid, Test } from './examples'
import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

//import { atomOneLight as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
/* TODO 07171600
const Codes :FC<any> = () => {
    return <div>Codes</div>
}
*/
const App :FC = () => {
    /* state */
    const [lang, setLang] = useState<string>('Ja')
    const [dark, setDark] = useGrid<boolean>({md:false, lg:true})
    const [open, setOpen] = useGrid<boolean>({md:false, lg:true}) // DEV
    const [home, setHome] = useGrid<boolean>({md:false, lg:true}) // DEV
    const [size, setSize] = useGrid<number> ({md:50   , lg:75 })
    const width = home ? 500 : 750//useGrid<number>({xs:3/5, md:500, lg:750})// DEV
    return (
        <div style={{background:dark?"#000":"#fff",transition:"1s",padding:size*2,height:"100%"}}>
            <div style={{color:dark?"#818181":"#000", fontSize:size}}>Examples</div>
            {`width:${width}px fontSize:${size}px`}
            <Sides {...{size, width}}>
                <p onClick={()=>window.location.href="/note"}>Note</p>
                <p onClick={()=>window.location.href="/hook"}>Hook</p>
                <p onClick={()=>window.location.href="/sign"}>Sign</p>
            </Sides>
            <Trans {...{size, width}}>
                <div onClick={()=>setLang(p=>p!=='Ja'?'Ja':'En')}>{lang}</div>
                <div onClick={()=>setDark( (p:any)=>({md:p.lg,lg:p.md}) )}>{dark?'🌛':'🌞'}</div>
                <div onClick={()=>setOpen( (p:any)=>({md:p.lg,lg:p.md}) )}>{open?'🙄':'🤣'}</div>
                <div onClick={()=>setHome( (p:any)=>({md:p.lg,lg:p.md}) )}>{home?'👶':'👨'}</div>
            </Trans>
            <Pills {...{size, width, dark}}>
                <i className="fas fa-ellipsis-h"         onClick={()=>null}>
                    <i className="fas fa-share-square"   onClick={()=>null}>
                        <i className="fas fa-bold"       onClick={()=>null}/>
                        <i className="fab fa-twitter"    onClick={()=>null}/>
                        <i className="fab fa-facebook-f" onClick={()=>null}/>
                    </i>
                    <i className="fas fa-sign-in-alt"    onClick={()=>null}/>
                    <i className="fas fa-location-arrow" onClick={()=>null}>
                        <i className="fas fa-angle-up"   onClick={()=>null}/>
                        <i className="fas fa-home"       onClick={()=>null}/>
                        <i className="fas fa-angle-down" onClick={()=>null}/>
                    </i>
                </i>
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
