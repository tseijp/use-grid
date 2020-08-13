// for useEffect
import {DependencyList, EffectCallback, RefObject} from 'react';
export type Effect = (effect: EffectCallback, deps?: DependencyList) => void;
// for useState
export type BasicProps<T>  = (()=>T) | T
export type BasicState<T>  = ((pre:T)=>T) | T
export type BasicAction<T> = (fn:BasicState<T>) => void
// ************************* 📺 useMedia 📺 ************************* //
export type MediaString = MediaQueryList;
export type MediaObject<T=string|number|boolean> = {[key:string]:T};
export interface MediaConfig {
    [key:string]:any,
    size?:{[key:string]:number},
    width?:number,
    widthRef?:null|Element|RefObject<Element>,
    mediaType?:mediaType,
}
// ************************* 👀 useView 👀 ************************* //
export type ViewChangeHandler = (entry: IntersectionObserverEntry) => void
export interface ViewConfig {
    [key:string]:any,
    root?: React.RefObject<Element>,
    rootMargin?: string,
    threshold?: number|number[],
    timeout?: number,
    once?: boolean,
    onView?:null|((isView?:boolean)=>void),
    defaultView?: boolean,
}
// ************************* 👌 useGrid 👌 ************************* //
export type mediaType =
  | null
  | "all"
  | "screen"
export interface Config extends MediaConfig, ViewConfig {
    mediaConfig?:MediaConfig,
    viewConfig?:ViewConfig,
    extendKey?:string[]
}
export type MediaList<T=any> = [string|MediaObject, T];
export type ExtendProps =
  | Config
  | ViewConfig
  | ((b:boolean)=>void)

export type GridProps<T=any> =
  | {[key:string]:T}
  | MediaList<T>[]
