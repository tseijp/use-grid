# 🤏 use-grid
🤏 __use-grid__ is
a hook to build responsive layouts of all shapes and sizes,

a fork of 👌 __use-media__ that track the state of CSS media queries,

and remake of 🅱 __bootstrap__ grid system thanks to column system and five responsive tiers.

<p align="center">
  <a href="https://github.com/tseijp/use-grid">    <img alt="build passin"src="https://img.shields.io/badge/build-passing-green.svg"/></a>
  <a href="https://github.com/tseijp/use-grid">    <img alt="license MIT" src="https://img.shields.io/badge/license-MIT-green.svg"/></a>
  <a href="https://www.npmjs.com/package/use-grid"><img alt="npm package" src="https://img.shields.io/badge/npm_package-0.5.0-green.svg"/></a>
  <a href="https://twitter.com/intent/tweet?url=https://tsei.jp/hook/use-grid/&text=🤏 use-grid is
  a hook to build responsive layouts of all shapes and sizes." ><img alt="tweet" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftseijp"/></a>
</p>

<hr>

### Table of Contents
* [Install via npm](#install-via-npm)
* [Quick started](#quick-started)
* [Simple example](#simple-example)
* [Available hooks](#available-hooks)
* [~~Fantastic recipes~~](#fantastic-recipes)
* [~~Performance pitfalls~~](#performance-pitfalls)

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
import { useMedia, useGrid } from 'use-grid'

export function Exmple () {
    const isMedium      = useMedia({ minWidth:720, maxWidth:960 });
    const [ fontSize ]  = useGrid({ xs:"2em", md:"50px", xl:"75px" });
    const [ width,set ] = useGrid({ md:1/3, xl:1/4 });
    return (
        <div style={{fontSize, width}} onClick={()=>set({p=>{md:p.lg,lg:p.md}})}>
            {isMedium?'😃':'😢'}
        </div>
    );
};
```

__use grid system__

```js
import React from 'react'
import { useGrids } from 'use-grid'

export function App () {
    const faces = ['🙄','🤣','🧐','🤯','🤮']
    const [ w ] = useGrids(faces.length, (i)=>({md:1/5, xl:i/15}))
    return (
        <div style={{display:"grid"}}>
            {faces.map( (face, i) =>
                <div style={{width:w[i]}}>{face}</div>
            )}
        </div>
    )
};
```

### Available hooks

| Hook              | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `useGrid`         | make it switch value by media query with useEffect      |
| `useMedia`        | get a match to media query with useEffect |
| `useLayutGrid`    | make it switch value by media query with useLayoutEffect|
| `useLayoutMedia`  | get a match to media query with useLayoutEffect |
| `useGrids`        | COMING SOON |
| `useGrids`        | COMING SOON |

### Performance Tuning
The grid system uses containers, rows and columns to control layout and alignment.
name|prefix|max width|max container width|  
:----------|:--|:----------|:--------|  
Extra small|xs |<_576_   px|auto     |  
Small      |sm |>=_576_  px|_540_ px |  
Medium     |md |>=_768_  px|_720_ px |  
Large      |lg |>=_992_  px|_960_ px |  
Extra large|xl |>=_1200_ px|_1140_ px|  

__same works__
```javascript
export function Note ({children}) {
    const width1= useGrid([[                    "max-width:576px", "100%"],
                           ["min-width:576px and max-width:768px", "50px"],
                           ["min-width:768px"                    , "75px"]])
    const width2= useGrid([[{                 maxWidth:"576px"}, "100%"],
                           [{minWidth:"576px",maxWidth:"768px"}, "50px"],
                           [{minWidth:"768px"                 }, "75px"]])
    const width3 = useGrid([["sm","100%"], ["md":"50px"], ["lg":"75px"]])
    const width4 = useGrid({sm:"100%",md:"50px",lg:"75px"})
    const width5 = useGrid({sm:1, md:1/2, lg:"75px"})
    return <div style={width1} />
}
```
