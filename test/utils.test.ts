import {
    defaultMedia , convertNumToPix   as cN2P, convertPrefixToList as cPre2L,
    defaultConfig, convertObjToStr   as cO2S, convertPropsToList  as cPro2L,
      mergeConfig, convertFuncToList as cF2L, shallowEqual,
           Config
} from '../src'

// ************************* utils *************************  //
// * mergeConfig
// *   * initProps: {...size, ...prefix}
// *   * initConfig:{xConfig, prefix, ...xConfig, ...prefix}
// *   *  => {...xConfig, ...prefix} = defaultProps
// ************************* ***** *************************  //
describe('Basic', () => {
    describe('shallowEqual', () => {
        const num = 0
        const str = ""
        const obj = {}
        test('primitive', () => {
            expect(shallowEqual({},{})).toBe(true)
            expect(shallowEqual({num},{num:0})).toBe(true)
            expect(shallowEqual({str},{str:""})).toBe(true)
        })
        test('object', () => {
            expect(shallowEqual({obj},{obj:obj})).toBe(true)
            expect(shallowEqual({obj},{obj:{}})).toBe(false)
        })
    })
    // describe('mergeConfig', () => {})
})
// ************************* 📺 useMedia 📺 *************************  //
// ************************* *************** *************************  //
describe('for useMedia', () => {
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
// ************************* 👌 useGrid 👌 *************************  //
// * convertPropsToList
// *   * {md:0, lg:.5, {min...}:1}      = Object.entries=>
// *   * [[md,0],[lg,.5],[min...,1]]    = [convertObjToStr,convertNumToPix]=>
// *   * [[md,0],[lg:100],[min...,200]] = convertPrefixToList=>
// *   * [['min-width...',0],[min-width...,.5]]
// ************************* ************* *************************  //
describe('for useGrid', () => {
    const widthRef = {current: {clientWidth:100}}
    const config = {widthRef, ...defaultConfig} as Config
    describe('convertPrefixToList', () => {
        test('basic', () => {
            expect( cPre2L(Object.entries({xs:0}), config) )
                .toStrictEqual([["(min-width:1px)", 0]])
            expect( cPre2L(Object.entries({lg:1}), config) )
                .toStrictEqual([["(min-width:1px)", 1], // ERROR!
                                ["(min-width:992px)", 1],])
        })
        test('multi', () => {
            expect( cPre2L(Object.entries({xs:0,lg:1}), config) )
                .toStrictEqual([["(min-width:1px) and (max-width:991px)", 0],
                                ["(min-width:992px)", 1],])
            expect( cPre2L(Object.entries({md:0,lg:1}), config) )
                .toStrictEqual([["(min-width:1px) and (max-width:991px)", 0],
                                ["(min-width:768px)", 0], //ERROR!
                                ["(min-width:992px)", 1],])
        })
    })
    describe('convertPropsToList', () => {
        test('value is number', () => {
            expect(cPro2L(Object.entries({xs:  1}), config)).toStrictEqual([["(min-width:1px)", 1]])
            expect(cPro2L(Object.entries({xs: .1}), config)).toStrictEqual([["(min-width:1px)",10]])
            expect(cPro2L(Object.entries({xs:-.1}), config)).toStrictEqual([["(min-width:1px)",90]])
        })
        test('value is number and positive', () => {
            expect(cPro2L(Object.entries({xs:  1, lg:50}), config))
                .toStrictEqual([["(min-width:1px) and (max-width:991px)", 1],
                                ["(min-width:992px)", 50]])
            expect(cPro2L(Object.entries({xs: .1, lg:50}), config))
                .toStrictEqual([["(min-width:1px) and (max-width:991px)", 10],
                                ["(min-width:992px)", 50]])
            expect(cPro2L(Object.entries({xs:-.1, lg:50}), config))
                .toStrictEqual([["(min-width:1px) and (max-width:991px)", 90],//ERROR! 5!
                                ["(min-width:992px)", 50]])
        })
    })
})
// ************************* 👌👌 useGrids 👌👌 *************************  //
// *Inputting an array as "return value of initialFunc" is not yet implemented.
// *That is, it supports only the left side of the following types
// *    GridProps<T=any> = {[key:string]:T} | MediaList<T>[]
// *So you cant use G<T> Type as previous code!
// ***********************************************************  //
describe('for useGrids', () => {
    describe('convertFuncToList', () => {
        test('TODO', () => {
            expect('').toBe('')
        })
    })
})
