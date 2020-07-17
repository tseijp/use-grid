import React, {FC, useState} from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './serviceWorker';
// import { useGrid, useMedia } from '../src'; TODO 1754
import { Pills, Sides, Trans, Notes } from './components'
import { Basic, Grid, Test } from './examples'
import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

//import { atomOneLight as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//import { Light as SyntaxHighlighter } from "react-syntax-highlighter";

const Codes :FC<any> = () => {
    return <div>Codes</div>
}

const App :FC = () => {
    /* state */
    const [lang, setLang] = useState<string>('Ja')
    const [open, setOpen] = useState<boolean>(true)
    const [dark, setDark] = useState<boolean>(false)
    const [home, setHome] = useState<boolean>(true)
    const fontSize = home?50 :75 //useGrid<number>({xs:50 , md:75 })
    const width    = home?500:750//useGrid<number>({xs:400, md:500, lg:750})
    return (
        <div style={{background:dark?"#000":"#fff",transition:"1s",padding:fontSize*2}}>
            <div style={{color:dark?"#818181":"#000", fontSize}}>Examples</div>
            {`width:${width}px fontSize:${fontSize}px`}
            <Notes {...{fontSize, width, dark}}>
                <i key="0-0" className="fas fa-ellipsis-h"     onClick={()=>null}>
                <i key="1-0" className="fas fa-share-square"   onClick={()=>null}/>
                    <i key="0-1" className="fas fa-sign-in-alt"    onClick={()=>null}/>
                </i>
            </Notes>
            <Pills {...{fontSize,width,dark,open:true}}>
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
            <Sides {...{fontSize, width}}>
                <p onClick={()=>window.location.href="/note"}>Note</p>
                <p onClick={()=>window.location.href="/hook"}>Hook</p>
                <p onClick={()=>window.location.href="/sign"}>Sign</p>
            </Sides>
            <Trans {...{fontSize, width}}>
                <div onClick={()=>setLang(p=>p!=='Ja'?'Ja':'En')}>{lang}</div>
                <div onClick={()=>setDark(p=>!p)}>{dark?'🌛':'🌞'}</div>
                <div onClick={()=>setOpen(p=>!p)}>{open?'🙄':'🤣'}</div>
                <div onClick={()=>setHome(p=>!p)}>{home?'👶':'👨'}</div>
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
