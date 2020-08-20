import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

const plugins = [
  typescript({
    tsconfig: 'tsconfig.json',
    removeComments: true,
    useTsconfigDeclarationDir: true,
  }),
  terser({
    include: ['hre.js'],
  }),
]

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/hre.js', format: 'umd', name: 'hre', sourcemap: true },
      { file: 'dist/hre.esm.js', format: 'esm', sourcemap: true },
    ],
    plugins,
  },
  {
    input: 'compat/index.js',
    output: {
      file: 'dist/hre-compat.js',
      format: 'umd',
      name: 'hre',
      sourcemap: true,
    },
    plugins,
  },
]
