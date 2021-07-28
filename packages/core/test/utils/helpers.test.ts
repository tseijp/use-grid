import {is} from '../../src'

// ************************* utils *************************  //
// * mergeConfig
// *   * initProps: {...size, ...prefix}
// *   * initConfig:{xConfig, prefix, ...xConfig, ...prefix}
// *   *  => {...xConfig, ...prefix} = defaultProps
// ************************* ***** *************************  //
describe('helpers', () => {
    describe('is', () => {
        const num = 0
        const str = ""
        const obj = {}
        test('primitive', () => {
            expect(is({},{})).toBe(true)
            expect(is({num},{num:0})).toBe(true)
            expect(is({str},{str:""})).toBe(true)
        })
        test('object', () => {
            expect(is({obj},{obj:obj})).toBe(true)
            expect(is({obj},{obj:{}})).toBe(false)
        })
    })
})
