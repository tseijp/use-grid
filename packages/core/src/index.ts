import {useGrid} from './hooks'
import {GridProps as GP, ExtendProps as EP, BasicProps, BasicAction, Config} from './types'

export * from './hooks'
export * from './types'
export * from './utils'

export function Grid <T extends any> (
    props: {
        children: ([grid, set] : [T, BasicAction<GP<T|EP>>]) => JSX.Element,
        config?: Config
    } & BasicProps<GP<T|EP>>
): JSX.Element

export function Grid ({children, config, ...props}: any) {
    return children(useGrid(props, config) as any)
}
