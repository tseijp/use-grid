
<h1 align="center">️🤏 use-grid</h1>
<p  align="center">
    🤏 <strong>use-grid</strong> is
    a hook to build responsive layouts of all shapes and sizes, <br>
    a fork of 👌 <strong>use-media</strong> that track the state of CSS media queries, <br>
    and remake of 🅱 <strong>bootstrap</strong> grid system thanks to column system and five responsive tiers.
</p>

<p align="center">
<a href="https://github.com/tseijp/mdmd"><img alt="build passin"src="https://img.shields.io/badge/build-✔-green.svg"/></a>
<a href="https://github.com/tseijp/mdmd"><img alt="build passin"src="https://img.shields.io/badge/types-✔-yellow.svg"/></a>
<a href="https://github.com/tseijp/mdmd"><img alt="build passin"src="https://img.shields.io/badge/demos-✔-red.svg"/></a>
<br>
<a href="https://github.com/tseijp/use-grid"><img alt="license MIT" src="https://img.shields.io/badge/license-MIT-green.svg"/></a>
<a href="https://www.npmjs.com/package/use-grid"><img alt="npm package" src="https://img.shields.io/badge/npm_package-0.7.3-green.svg"/></a>
<>
<a href="https://twitter.com/intent/tweet?url=https://tsei.jp/hook/use-grid/&text=🤏 use-grid is
a hook to build responsive layouts of all shapes and sizes." ><img alt="tweet" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftseijp"/></a>
</p>

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
npm i
npm start
```
* open browser and visit [localhost:3000](http://localhost:3000/)
* ~Now you can go to our [demo](https://tsei.jp/hook/use-grid), and try its usage.~

### Simple example

__switch by media query__
```js
import React from 'react'
import {useMedia, useGrid} from 'use-grid'
export const App = () => {
    const isHover = useMedia({ xs:720, hover:960 });
    const [ fontSize ] = useGrid({ xs:"2em", md:"50px", xl:"75px" });
    const [ width, set ] = useGrid({ xs:8/9  , md:1/3   , lg:1/4 });
    return (
        <div style={{fontSize, width}}
            onClick={ () => set((p)=>({md:p.lg,lg:p.md})) }>
            {isHover?'😃':'😢'}
        </div>
    );
};
```

__use grid system__

```js
import React from 'react'
import { useGrids } from 'use-grid'

export const App = () => {
    const faces = ['🙄','🤣','🧐','🤯','🤮'];
    const [ws] = useGrids(faces.length, (i)=>({md:1/5, xl:i/15}));
    return (
        <div style={{display:"grid"}}>
            {faces.map( (face, i) =>
                <div style={{width:ws[i]}}>{face}</div>
            )}
        </div>
    );
};
```

__use view system (COMING SOON)__

```js
export const App = () => {
    const fontSize = useGrid({xs:200, xsNone:100, none:0})
    return (
        <div style={fontSize, top:"150%", transition:"1s"}>
            {`😎`}
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
| `useView`         | Coming Soon |  
| `useLayutGrid`    | work like useGrid  with useLayoutEffect |  
| `useLayoutGrids`  | work like useGrids with useLayoutEffect |  
| `useLayoutMedia`  | work like useMedia with useLayoutEffect |  
| `useLayoutView`   | Coming Soon |  

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

prefix|works|  
:-----|:----|  
init  |initial value to be specified|  
none  |value when the element is not visible|  
{xx}None|value if when specified size in {xx} and not visible|  

__same works__

```javascript
export function Note ({children}) {
    const width1 = useGrid({sm:1, md:1/2, lg:"75px"})
    const width2 = useGrid({sm:"100%",md:"50px",lg:"75px"})
    const width3 = useGrid([["sm","100%"], ["md":"50px"], ["lg":"75px"]])
    const width4 = useGrid([[{                 maxWidth:"576px"}, "100%"],
                            [{minWidth:"576px",maxWidth:"768px"}, "50px"],
                            [{minWidth:"768px"                 }, "75px"]])
    const width5 = useGrid([[                    "max-width:576px", "100%"],
                            ["min-width:576px and max-width:768px", "50px"],
                            ["min-width:768px"                    , "75px"]])
    const width =
       || width1
       || width2
       || width3
       || width4
       || width5
    return <div style={{width}} />
}
```
