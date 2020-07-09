import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';


const namedExports = {'node_modules/react/index.js':['Component','useState',]};
const external = Object.keys(pkg.dependencies || {});
const presets = ['@babel/env', '@babel/preset-react'];
const plugins = [
    babel({presets, runtimeHelpers:true, exclude:'node_modules/**'}),
    replace({'process.env.NODE_ENV':JSON.stringify('production')}),
    commonjs({namedExports}),
    nodeResolve({ browser:true }),
    typescript({lib:["dom","dom.iterable","esnext"], target: "es5"})
];

export default {
    input: './src/index.ts',
    output:[
        { file:pkg.main   , format:'cjs' },
        { file:pkg.module , format:'es'  }],
    external,
    plugins,
};
