
<h2 align="center">️🤏 use-grid</h2>

<p align="center">
<a href="https://github.com/tseijp/use-grid"><img alt="build passin"src="https://img.shields.io/badge/build-✔-green.svg"/></a>
<a href="https://github.com/tseijp/use-grid"><img alt="build passin"src="https://img.shields.io/badge/types-✔-yellow.svg"/></a>
<a href="https://github.com/tseijp/use-grid"><img alt="build passin"src="https://img.shields.io/badge/demos-✔-red.svg"/></a>
<br>
<a href="https://github.com/tseijp/use-grid"><img alt="license MIT" src="https://img.shields.io/badge/license-MIT-green.svg"/></a>
<a href="https://www.npmjs.com/package/use-grid"><img src="https://badge.fury.io/js/use-grid.svg" alt="npm version" height="18"></a>
<a href="https://twitter.com/intent/tweet?url=https://tsei.jp/hook/use-grid/&text=🤏 use-grid is
a hook to build responsive layouts of all shapes and sizes." ><img alt="tweet" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftseijp"/></a>
</p>

<p align="center"> 🤏 <strong>use-grid</strong> is</p>
<ul  align="center">
<li>a hook to build responsive layouts of all shapes and sizes, </li>
<li>a fork of 👌 <strong><a href="https://github.com/streamich/use-media">use-media</a></strong> that track the state of CSS media queries, </li>
<li>a fork of 👏 <strong><a href="https://github.com/cats-oss/use-intersection">use-intersection</a></strong> that track whether the target intersects, </li>
<li>and remake of 🅱 <strong><a href="https://getbootstrap.com/docs/4.2/layout/grid/">bootstrap</a></strong> grid system thanks to responsive column system.</li>
</ul>

<hr>

### Table of Contents
* [Install via npm](#install-via-npm)
* [Quick started](#quick-started)
* [Simple example](#simple-example)
* [Available hooks](#available-hooks)
* [Performance pitfalls](#performance-pitfalls)

### Install via npm
```bash
npm i use-grid
```

### Quick started
```bash
git clone github.com/tseijp/use-grid
cd use-grid
npm i -D
npm start
```
* open browser and visit [localhost:3000](http://localhost:3000/)
* ~Now you can go to our [demo](https://tsei.jp/hook/use-grid), and try its usage.~

### Simple example

__switch by media query__
```js
import React from 'react'
import { useMedia, useGrid } from 'use-grid'
export const App = () => {
    const isMedium      = useMedia({ minWidth:720, maxWidth:960 });
    const [ fontSize ]  = useGrid({ xs:"2em", md:"50px", xl:"75px" });
    const [ width,set ] = useGrid({ xs:8/9  , md:500   , lg:750    });
    return (
        <div style={{fontSize, width}}
            onClick={() => set((p)=>({md:p.lg,lg:p.md}))}>
            {isMedium?'😃':'😢'}
        </div>
    );
};
```

__use grid system__

```js
import React from 'react'
import { useGrids } from 'use-grid'
export const App = () => {
    const face = ['🙄','🤣','🧐','🤯','🤮'];
    const ref  = React.useRef(null)
    const [ws] = useGrids(face.length, (i)=>(i%2===0)
        ? { md: 1/5, xl:i/face.length/3 }
        : { md:1/10, xl:i/face.length/6 }
    , [ref]);
    return (
        <div ref={ref} style={{display:"grid", width:"95%"}}>
            {face.map( (emoji, i) =>
                <div style={{width:ws[i]}}>{emoji}</div>
            )}
        </div>
    );
};
```

__use view system__

```js
import React from 'react';
import {useGrid, useView} from 'use-grid';
export const App = () => {
    const ref1 = React.useRef(null)
    const ref2 = React.useRef(null)
    const isView = useView(ref1)
    const [fontSize,set] = useGrid({md:100,lg:200}, [ref1])
    const [background]   = useGrid({
        none:"#000", init:"#fff",
        onView:(bool) =>
            set(bool
                ? {md:150, lg:250}
                : {md:100, lg:200})
    }, [ref1, ref2])
    return (
        <div style={{fontSize,background}}>
            <div ref={ref1}>{'😎'}</div>
            {[...Array(10)].map((_,i)=>
                <div key={i}>{isView?'😘':'🤣'}</div>
            )}
            <div ref={ref2}>{'😎'}</div>
        </div>
    )
}
```

### Available hooks

| Hook              | Description                                             |  
| ----------------- | ------------------------------------------------------- |  
| `useGrid`         | make it switch value by media query with useEffect      |  
| `useGrids`        | multiple values can be switched by media queries |  
| `useMedia`        | get a match to media query with useEffect |  
| `useView`         | get a flag whether the target intersects |  
| `useLayoutGrid`   | work like useGrid  with useLayoutEffect |  
| `useLayoutGrids`  | work like useGrids with useLayoutEffect |  
| `useLayoutMedia`  | work like useMedia with useLayoutEffect |  
| `useLayoutView`   | work like useView  with useLayoutEffect |  

### Performance Pitfalls

__Grid prefix__

The grid system uses containers, rows and columns to control layout and alignment.

[Learn More](https://getbootstrap.com/docs/4.2/layout/grid/)

name|prefix|max width|max container width|  
:----------|:--|:----------|:--------|  
Extra small|xs |<_576_   px|auto     |  
Small      |sm |>=_576_  px|_540_ px |  
Medium     |md |>=_768_  px|_720_ px |  
Large      |lg |>=_992_  px|_960_ px |  
Extra large|xl |>=_1200_ px|_1140_ px|  

__Grid Options__

name        |works|  
:-----------|:----|  
init        |initial value to be specified|  
none        |value when the element is not visible|  
onView      |function called when the target intersects|
config      |config for useGrid
viewConfig  |config for useMedia
mediaConfig |config for useView

__same works__

```javascript
export function Note ({children}) {
    const width1 = useGrid({sm:1, md:1/2, lg:"750px"})
    const width2 = useGrid({sm:"100%",md:"50%",lg:"750px"})
    const width3 = useGrid([["sm","100%"], ["md":"50%"], ["lg":"750px"]])
    const width4 = useGrid([[{                 maxWidth:"576px"}, "100%"],
                            [{minWidth:"576px",maxWidth:"768px"},  "50%"],
                            [{minWidth:"768px"                 },"750px"]])
    const width5 = useGrid([[                    "max-width:576px", "100%"],
                            ["min-width:576px and max-width:768px",  "50%"],
                            ["min-width:768px"                    ,"750px"]])
    const width =
       || width1
       || width2
       || width3
       || width4
       || width5
    return <div style={{width}} />
}
```
