import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

// https://github.com/rollup/rollup-plugin-node-resolve#resolving-built-ins-like-fs
import builtins from 'builtin-modules'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  external: builtins,
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    url({ exclude: ['**/*.svg'] }),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: []
    }),
    resolve({ preferBuiltins: true }),
    commonjs()
  ]
}
