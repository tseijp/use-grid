import {MediaList, Config} from '../types'
import {defaultSize, defaultConfig, convertObjToStr, convertNumToPix} from './media'

export function convertPrefixToList <T=any>(
    props: [string, T][],
    config?: Config
) : [string, T][];

export function convertPrefixToList <T=any>(props: any[], config=defaultConfig) {
    const {size=defaultSize} = config
    const keys = Object.keys(size)
    const toN = (key:string): number => keys.find(k => k === key)? size[key]: 0
    const toS = (key:string, i: number, grid: [string,T][]) => `(min-width:${toN(key)}px)${
        i+1-grid.length<0 ? ` and (max-width:${toN(grid[i+1][0])-1}px)` : ''
    }`
    //const rmNone = (key:string):string=>key.replace(/(-none|none)/gi, '')  // ??
    const grid = keys.map(s=>props.find(p=>p[0]===s)||null).filter(m=>m!==null)
    const xsGr = (grid.length)?grid.find(g=>g[0]==="xs")?[]:[["xs",grid[0][1]]]:[]
    const gtos = [...xsGr,...grid].map((g,i)=>[toS(g[0],i,grid), g[1]])
    const noGr = (grid.length)?props.filter(p=>!keys.find(s=>s===p[0])) : props
    return [...noGr, ...gtos]
};

export function convertPropsToList <T=any> (
    props: MediaList<T>[],
    config: Config
): [string,T][];

export function convertPropsToList <T=any>(props: any[], config=defaultConfig) {
    const prefix = props.map(([key, val]): [string, T] => [
        convertObjToStr(key, config),
        convertNumToPix<T>(val, config)
    ])
    return convertPrefixToList<T>(prefix, config)
};

export function convertFuncionToList <T=any> (
    props: {[key: string]: T}[]
): [string, T[]][]

export function convertFuncionToList (props: any[]){
    const list = props.map((p:any)=>p instanceof Array?p:Object.entries(p))
    return list[0].map(p => p[0]).map(key =>
        [key, list.map(p => (p.find(v=>v[0]===key))[1])]
    )
};
