import React, {FC, Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './serviceWorker';
import { useGrid, useMedia } from '../src'
import { Sides, Trans, Notes } from './components'
import { Basic, Grid, Test } from './examples'
import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

//import { atomOneLight as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//import { Light as SyntaxHighlighter } from "react-syntax-highlighter";

const Codes :FC<any> = () => {
    return <div />
}

const App :FC = () => {
    /* state */
    const [lang, setLang] = useState<string>('Ja')
    const [dark, setDark] = useState<boolean>(true)
    const [vert, setVert] = useState<boolean>(true)//TODO 1701
    const [home, setHome] = useState<boolean>(true)
    const fontSize = 50//useGrid<number>({xs:50 , md:75 })
    const width    = home?500:750//useGrid<number>({xs:400, md:500, lg:750})
    return (
        <div style={{background:dark?"#000":"#fff",transition:"1s",padding:fontSize*2}}>
            <div style={{color:dark?"#818181":"#000", fontSize}}>Examples</div>
            {`width:${width}px fontSize:${fontSize}px`}
            <Notes {...{fontSize, width, dark}}>
                <div>
                    <h3>Basic Example</h3>
                    <Basic />
                </div>
                {/*<Code/>*/}
                <div>
                    <h3>Grid Example</h3>
                    <Grid />
                </div>
                {/*<Code/>*/}
                <Test/>
            </Notes>
            <Sides {...{fontSize, width}}>
                <p onClick={()=>window.location.href="/note"}>Note</p>
                <p onClick={()=>window.location.href="/hook"}>Hook</p>
                <p onClick={()=>window.location.href="/signin"}>Signin</p>
            </Sides>
            <Trans {...{fontSize, width}}>
                <div onClick={()=>setLang(p=>p!=='Ja'?'Ja':'En')}>{lang}</div>
                <div onClick={()=>setDark(p=>!p)}>{dark?'🌛':'🌞'}</div>
                <div onClick={()=>setVert(p=>!p)}>{vert?'👇':'👉'}</div>
                <div onClick={()=>setHome(p=>!p)}>{home?'👶':'👨'}</div>
            </Trans>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
