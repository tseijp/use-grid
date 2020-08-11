// for useEffect
import {DependencyList, EffectCallback} from 'react';
export type Effect = (effect: EffectCallback, deps?: DependencyList) => void;
// for useState
export type BasicProps<T>  = (()=>T) | T
export type BasicState<T>  = ((pre:T)=>T) | T
export type BasicAction<T> = (fn:BasicState<T>) => void
// ************************* 👀 useView 👀 ************************* //
export type ViewProps = {}
// ************************* 📺 useMedia 📺 ************************* //
export type MediaString = MediaQueryList;
export type MediaObject<T=string|number|boolean> = {[key:string]:T};
// ************************* 👌 useGrid 👌 ************************* //
export type MediaList<T=any> = [string|MediaObject, T];
export type GridProps<T=any> = {[key:string]:T} | MediaList<T>[]
export interface Config {
    [key:string]:any,
    size:{[key:string]:number},
    width:number,
    widthRef:any,
    mediaType:mediaType,
}
export type mediaType =
  | "all"
  | "screen"
