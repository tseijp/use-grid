import {
    Config,
    defaultConfig,
    convertNumToPix as cN2P,
    convertObjToStr as cO2S,
} from '../../src'

// ************************* 📺 useMedia 📺 *************************  //
// ************************* *************** *************************  //
describe('media', () => {
    const widthRef = {current: {clientWidth:100}}
    const config = {widthRef, ...defaultConfig} as Config
    it.each`
        args          | result
        ${  10}       | ${10}
        ${ .10}       | ${10}
        ${-.10}       | ${90}
        ${[  10, 50]} | ${[10, 50]}
        ${[ .10, 50]} | ${[10, 50]}
        ${[-.10, 50]} | ${[ 5, 50]}
        ${[  10,-.5]} | ${[10, 45]}
        ${[ .10,-.5]} | ${[10, 45]}
        ${[-.10,-.5]} | ${[10, 50]}
    `('convertNumToPix: value is $args', ({args, results}) => {
        expect(cN2P(args, config)).toEqual(results)
    })
    describe('convertObjToStr', () => {
        it.each`
            screen  | min Width | result
            ${true} | ${ 0}     | ${'screen and (min-width: 0px)'}
            ${true} | ${.1}     | ${'screen and (max-width: 10px)'}
        `('convertObjToStr: get minWidth $minWidth', ({result, ...other}) => {
            expect(cO2S(other, config)).toBe(result)
        })
    })
})
