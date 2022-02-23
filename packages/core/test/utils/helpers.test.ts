import {is} from '../../src'

// ************************* utils *************************  //
// * mergeConfig
// *   * initProps: {...size, ...prefix}
// *   * initConfig:{xConfig, prefix, ...xConfig, ...prefix}
// *   *  => {...xConfig, ...prefix} = defaultProps
// ************************* ***** *************************  //
describe('helpers', () => {
    describe('is', () => {
        it('is to be truthy', () => {
            const foo = 'foo'
            expect(is(0, 0, 0)).toBeTruthy()
            expect(is('0', '0', '0')).toBeTruthy()
            expect(is({foo}, {foo})).toBeTruthy()
            expect(is([foo], [foo])).toBeTruthy()
            expect(is({}, {}, {})).toBeTruthy()
        })
        it('is to be falsy', () => {
            const foo = 'foo',
                  bar = 'bar'
            expect(is(0, 0, 1)).toBeFalsy()
            expect(is('0', '0', 0)).toBeFalsy()
            expect(is('0', '0', '1')).toBeFalsy()
            expect(is({foo}, {bar})).toBeFalsy()
            expect(is([foo], [bar])).toBeFalsy()
            expect(is({}, {}, {bar})).toBeFalsy()
        })
        it('is.xxx', () => {
            expect(is.arr([])).toBeTruthy()
            expect(is.fls('')).toBeTruthy()
            expect(is.nul(null)).toBeTruthy()
            expect(is.und(undefined)).toBeTruthy()
            expect(is.num(0)).toBeTruthy()
            expect(is.str("")).toBeTruthy()
            expect(is.bol(true)).toBeTruthy()
            expect(is.fun(() => {})).toBeTruthy()
            expect(is.obj({})).toBeTruthy()
        })
    })

})
