
# use-grid
🤏 __use-grid__ is a React hook for recreating the bootstrap grid system,
and a fork of 👌 __use-media__ that tracks the state of CSS media queries.

<p align="center">
  <a href="https://github.com/tseijp/use-grid">    <img alt="build passin"src="https://img.shields.io/badge/build-passing-green.svg"/></a>
  <a href="https://github.com/tseijp/use-grid">    <img alt="license MIT" src="https://img.shields.io/badge/license-MIT-green.svg"/></a>
  <a href="https://www.npmjs.com/package/use-grid"><img alt="npm package" src="https://img.shields.io/badge/npm_package-0.1.0-green.svg"/></a>
  <a href="https://twitter.com/tseijp" >             <img alt="twitter URL" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftseijp"/></a>
</p>

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
git clone github.com/tseijp/use-amazon
cd use-amazon
npm i
npm start
```
* open browser and visit [localhost:3000](http://localhost:3000/)
* ~Now you can go to our [demo](https://tsei.jp/hook/use-amazon), and try its usage.~

### Simple example

__switch by media query__
```js
import React from 'react'
import { useGrid } from 'use-amazon'
import './styles.css'

export function App () {
    const isMedium = useMedia({minWidth:720, maxWidth:960});
    const [fontSize] = useGrid({xs:"2em", md:"50px", xl:"75px"});
    return (
        <div style={{fontSize}}>
            {isMedium?'😃':'😢'}
        </div>
    );
};
```

__use grid system__
```js
import React from 'react'
import { useGrid } from 'use-amazon'
import './styles.css'

export function App () {
    const isMedium = useMedia({minWidth:1/2, maxWidth:1/3});
    const width = useGrid({xs:1/2, md:1/3, xl:1/4});
    return (
        <div style={{display:"grid"}}>
            <div style={{width, backgroundColor:isMedium?"red":"blue"}}>
                {isMedium?'😃':'😢'}
            </div>
        </div>
    );
};
```

### Available hooks

| Hook         | Description                                |
| ------------ | ------------------------------------------ |
| `useGrid`    | make it switch value by the specified media query |
| `useMedia`   | get a match to the specified media query |

### Performance Tuning
The grid system uses containers, rows and columns to control layout and alignment.
|prefix|max width|max container width|  
:----------|:--|:----------|:--------|  
Extra small|xs |<_576_   px|auto     |  
Small      |sm |>=_576_  px|_540_ px |  
Medium     |md |>=_768_  px|_720_ px |  
Large      |lg |>=_992_  px|_960_ px |  
Extra large|xl |>=_1200_ px|_1140_ px|  

__same works__
```javascript
export function Note ({children}) {
    const width1= useGrid([                    "max-width:576px", "100%"],
                          ["min-width:576px and max-width:768px", "50px"],
                          ["min-width:768px"                    , "75px"])
    const width2= useGrid([{                 maxWidth:"576px"}, "100%"],
                          [{minWidth:"576px",maxWidth:"768px"}, "50px"],
                          [{minWidth:"768px"                 }, "75px"])
    const width3 = useGrid(["sm","100%"], ["md":"50px"], ["lg":"75px"])
    const width4 = useGrid({sm:"100%",md:"50px",lg:"75px"})
    const width5 = useGrid({sm:1, md:1/2, lg:"75px"})
    return //TODO
}
```
