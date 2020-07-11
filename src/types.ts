// for Effect
import {DependencyList, EffectCallback} from 'react';
export type Effect = (effect: EffectCallback, deps?: DependencyList) => void;
// for useMedia
export type MediaString = MediaQueryList;
export type MediaObject = {[key:string]: string|number|boolean};
// for useGrid
export type MediaList<T=any> = [string|MediaObject, T];
export type GridProps<T=any> = MediaList<T>[]|{[key:string]:T}[]
