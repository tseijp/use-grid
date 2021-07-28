import {
    // is,
    Config,
    // mergeConfig,
    // defaultMedia,
    defaultConfig,
    convertNumToPix as cN2P,
    convertObjToStr as cO2S,
    // convertPropsToList as cPro2L,
    // convertPrefixToList as cPre2L,
    // convertFuncionToList as cF2L,
} from '../../src'

// ************************* 📺 useMedia 📺 *************************  //
// ************************* *************** *************************  //
describe('media', () => {
    const widthRef = {current: {clientWidth:100}}
    const config = {widthRef, ...defaultConfig} as Config
    describe('convertNumToPix', () => {
        test('value is number', () =>{
            expect(cN2P<number>(  10, config)).toBe(10)
            expect(cN2P<number>( .10, config)).toBe(10)
            expect(cN2P<number>(-.10, config)).toBe(90)
        })
        test('value is number and positive', () => {
            expect(cN2P<number[]>([  10, 50], config)).toStrictEqual([10,50])
            expect(cN2P<number[]>([ .10, 50], config)).toStrictEqual([10,50])
            expect(cN2P<number[]>([-.10, 50], config)).toStrictEqual([ 5,50])
        })
        test('value is number and negative', () => {
            expect(cN2P<number[]>([  10,-.5], config)).toStrictEqual([10,45])
            expect(cN2P<number[]>([ .10,-.5], config)).toStrictEqual([10,45])
            expect(cN2P<number[]>([-.10,-.5], config)).toStrictEqual([10,50])
        })
    })
    describe('convertObjToStr', () => {
        const screen  = true
        test('value is number', () => {
            expect(cO2S({screen, minWidth: 0}, config)).toBe('screen and (min-width: 0px)')
            expect(cO2S({screen, maxWidth:.1}, config)).toBe('screen and (max-width: 10px)')
        })
    })
})
