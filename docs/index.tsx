import React, {FC, Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './serviceWorker';
//import { useGrid, useMedia } from '../src'
import { Sides, Trans, Notes } from './components'
import './styles.css'

import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function App () {
    const [lang, setLang] = useState<string>('Ja')
    const [mode, setMode] = useState<string>('🌞')
    return (
        <Fragment>
            <Sides>
                <div onClick={()=>window.location.href="/note"}>Note</div>
                <div onClick={()=>window.location.href="/hook"}>Hook</div>
                <div onClick={()=>window.location.href="/signin"}>Signin</div>
            </Sides>
            <Trans>
                <div onClick={()=>setLang(p=>p!=='Ja'?'Ja':'En')}>{lang}</div>
                <div onClick={()=>setMode(p=>p!=='🌞'?'🌞':'🌛')}>{mode}</div>
            </Trans>
            <Notes>
                <div onClick={()=>null}></div>
            </Notes>
        </Fragment>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
