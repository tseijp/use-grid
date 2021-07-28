import {MediaList, Config} from '../types'

export const mergeConfig = <T=any>(
    props: MediaList<T>[], config: Config
): Config => {
    const {prefix, viewConfig, mediaConfig, ...initConfig} = config
    const configs = {viewConfig, mediaConfig, initConfig}
    return Object.assign(
        {},
        Object.fromEntries(
            props.filter(p => prefix.some(key => key === p[0]))
        ),
     ...Object
        .entries(configs)
        .map(([key, conf]) => ({
            ...(props.find(p => p[0] === key) || [0, {}])[1],
            ...conf
        })),
    )
}

const is = (a: any, b?: any, ...other: any): boolean => {
    if (other.length > 0) return is(a, b) && is(b, ...other)
    if (typeof a !== typeof b) return false
    if (is.str(a) || is.num(a)) return a === b
    for (let i in a) if (!(i in b)) return false
    for (let i in b) if (a[i] !== b[i]) return false
    return true
}

is.arr = Array.isArray
is.fls = (a: unknown): a is false => is.und(a) || is.nul(a) || a === false || a === ''
is.nul = (a: unknown): a is null => a === null
is.und = (a: unknown): a is undefined => a === void 0
is.num = (a: unknown): a is number => typeof a === 'number'
is.str = (a: unknown): a is string => typeof a === 'string'
is.bol = (a: unknown): a is boolean => typeof a === 'boolean'
is.fun = (a: unknown): a is Function => typeof a === 'function'
is.obj = (a: unknown): a is object => Object.prototype.toString.call(a) === '[object Object]'
is.url = (a: unknown): a is URL => a instanceof URL
is.set = (a: unknown): a is Set<any> => a instanceof Set
is.map = (a: unknown): a is Map<any, any> => a instanceof Map
is.big = (a: unknown): a is string => is.str(a) && a === a.toUpperCase()
is.len = (l: number, a: any): a is string | any[] => (is.arr(a) || is.str(a)) && a.length === l

export  { is }
