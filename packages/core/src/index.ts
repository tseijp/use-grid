import React from 'react'
import {createMedia, createView, createGrid, createGrids} from './hooks'

export * from './types'
export * from './utils'

export const useMedia = createMedia(React.useEffect);
export const useView = createView(React.useEffect);
export const useGrid = createGrid(React.useEffect);
export const useGrids = createGrids(useGrid);
export const useLayoutMedia = createMedia(React.useLayoutEffect);
export const useLayoutView = createView(React.useLayoutEffect);
export const useLayoutGrid = createGrid(React.useLayoutEffect);
export const useLayoutGrids = createGrids(useLayoutGrid);

export const Grid = React.forwardRef(_Grid)
export const Media = React.forwardRef(_Media)
export const View = React.forwardRef(_View)
export const LayoutGrid = React.forwardRef(_LayoutGrid)
export const LayoutMedia = React.forwardRef(_LayoutMedia)
export const LayoutView = React.forwardRef(_LayoutView)

function _Grid (props: any, ref: any) {
    const {children, config, ...other} = props
    const target = React.useRef(null)
    React.useImperativeHandle(ref, () => target.current)
    return children(useGrid(other, [target], config)[0], target)
}

function _LayoutGrid (props: any, ref: any) {
    const {children, config, ...other} = props
    const target = React.useRef(null)
    React.useImperativeHandle(ref, () => target.current)
    return children(useLayoutGrid(other, [target], config)[0], target)
}

function _Media (props: any, ref: any) {
    const {children, init, ...other} = props
    const media = useMedia(other, init)
    React.useImperativeHandle(ref, () => media)
    return children(media)
}

function _LayoutMedia (props: any, ref: any) {
    const {children, init, ...other} = props
    const media = useLayoutMedia(other, init)
    React.useImperativeHandle(ref, () => media)
    return children(media)
}

function _View (props: any, ref: any) {
    const {children, onView, ...config} = props
    const target = React.useRef(null)
    React.useImperativeHandle(ref, () => target.current)
    return children(useView(target, onView, config), target)
}

function _LayoutView (props: any, ref: any) {
    const {children, onView, ...config} = props
    const target = React.useRef(null)
    React.useImperativeHandle(ref, () => target.current)
    return children(useLayoutView(target, onView, config), target)
}
