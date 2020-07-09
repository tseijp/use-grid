import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './serviceWorker';
import { useGrid, useMedia } from '../src'

const App = () => {
    const backgroundColor = useGrid<string>(["xs","red"], ["md","green"], ["xl","blue"],)// dev232 ({xs:"red", md:"green", xl:"blue"}) //
    //const backgroundColor = useGrid([{minWidth:1,maxWidth:719},"white"], [{minWidth:720,maxWidth:1140},"green"], [{minWidth:1140},"blue"],)
    return (
        <div style={{backgroundColor}}>
            {[1,2,3,4,5,6].map(v=><p key={v}>{v}</p>)}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
