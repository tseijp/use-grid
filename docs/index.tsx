import React, {FC, useState, useMemo} from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './serviceWorker';
import { useGrid,useGrids } from '../src';
import { Pills, Sides, Trans, Notes } from './components'
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
    //const [home, setHome] = useGrid<boolean>({md:false, lg:true}) // DEV
    const [size, setSize] = useGrid<number> ({md:50   , lg:75  })
    const width = 500//home ? 500 : 750//useGrid<number>({xs:3/5, md:500, lg:750})// DEV
    const style = useMemo<React.CSSProperties>(()=>({
        background:dark?"#212121":"#fff",boxShadow:"0px 1px 50px rgba(0,0,0,0.2)",
        color     :dark?"#818181":"#000",borderRadius:`${size/2}px`,
    }),[dark,size])
    const toggleStyle = useMemo<React.CSSProperties>(()=> ({
        background:dark?"#212121":"#212121", width:size,fontSize:size, margin:"5px",
        color     :dark?"#818181":"#ffffff",height:size,borderRadius:`${size/2}px`,
    }),[dark,size])
    const toggleRight:FC<any> = () => <i className="fas fa-code" style={toggleStyle}/>
    return (
        <div style={{background:dark?"#000":"#fff",transition:"1s",padding:size*2,}}>
            <div style={{color:dark?"#818181":"#000", fontSize:size}}>Examples</div>
            <Notes {...{size, style, width, height:200, toggleRight}}>
                <div>
                    <div>Examples</div>
                    <div>Codes1</div>
                    <div>Codes2</div>
                    <div>API</div>
                </div>
                <div>
                    <div>TODO</div>
                </div>
            </Notes>
            <Sides {...{size, width}}>
                <p onClick={()=>window.location.href="/note"}>Note</p>
                <p onClick={()=>window.location.href="/hook"}>Hook</p>
                <p onClick={()=>window.location.href="/sign"}>Sign</p>
            </Sides>
            <Trans {...{size, width}}>
                <div onClick={()=>setLang(p=>p!=='Ja'?'Ja':'En')}>{lang}</div>
                <div onClick={()=>setDark( (p:any)=>({md:p.lg,lg:p.md}) )}>{dark?'🌛':'🌞'}</div>
                <div onClick={()=>setOpen( (p:any)=>({md:p.lg,lg:p.md}) )}>{open?'🙄':'🤣'}</div>
                <div onClick={()=>setSize( (p:any)=>({md:p.lg,lg:p.md}) )}>{size<75?'👶':'👨'}</div>
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
