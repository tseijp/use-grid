import {
    // is,
    Config,
    // mergeConfig,
    // defaultMedia,
    defaultConfig,
    // convertNumToPix as cN2P,
    // convertObjToStr as cO2S,
    convertPropsToList as cPro2L,
    convertPrefixToList as cPre2L,
    // convertFuncionToList as cF2L,
} from '../../src'


// ************************* 👌 useGrid 👌 *************************  //
// * convertPropsToList
// *   * {md:0, lg:.5, {min...}:1}      = Object.entries=>
// *   * [[md,0],[lg,.5],[min...,1]]    = [convertObjToStr,convertNumToPix]=>
// *   * [[md,0],[lg:100],[min...,200]] = convertPrefixToList=>
// *   * [['min-width...',0],[min-width...,.5]]
// ************************* ************* *************************  //
// describe('mergeConfig', () => {})

describe('grid', () => {
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
/***   (i) => {md:i,lg:i} or (i) => [[md,i],[lg,i]]
  * => [{md:0,lg:0},{md:1,lg:1}] or [[[md,0],[lg,0]],[[md,1],[lg,1]]]
  * => [[ [md,0], [lg,0] ],[ [md,1], [lg,1] ]]
  * => [[md,[0,1]],[lg,[0,1]]]
 ***/
/*
Object.assign(...Object.keys(state[0]).map( k => {k:states.map(s=>s[k])} ))
[ {x:0,y:0}
  {x:1,y:1}
  {x:2,y:2} ]
=>
{x:[0,1,2],y:[0,1,2]}
*/
// ***********************************************************  //


describe('for useGrids', () => {
    describe('convertFuncionToList', () => {
        test('TODO', () => {
            expect('').toBe('')
        })
    })
})
