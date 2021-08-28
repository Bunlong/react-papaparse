import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
// import builtins from 'builtin-modules'
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

export default {
  input: 'src/react-papaparse.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
    },
    // {
    //   file: `dist/${pkg.name}.min.es.js`,
    //   format: 'es',
    //   exports: 'named',
    //   sourcemap: true
    // },
    // {
    //   name: 'react-papaparse',
    //   file: `dist/${pkg.name}.umd.js`,
    //   format: 'umd',
    //   exports: 'named',
    //   globals: {
    //     react: 'React',
    //   },
    // },
  ],
  // external: builtins,
  // To use hook in development
  // https://reactjs.org/warnings/invalid-hook-call-warning.html
  external: ['react', 'react-dom'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      clean: true,
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      preferBuiltins: true
    }),
    commonjs({
      extensions: ['.js', '.ts', '.tsx']
    }),
    terser()
  ],
};
