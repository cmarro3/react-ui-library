import tsPlugin from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            name: '@cheapreats/react-ui',
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    plugins: [
        commonjs(),
        json(),
        tsPlugin({
            typescript: ttypescript,
            tsconfig: './tsconfig.json',
            include: ['*.ts+(|x)', '**/*.ts+(|x)'],
            exclude: [
                '*.d.ts',
                '**/*.d.ts',
                'node_modules/**',
                '__tests__',
                '.vscode',
                '.github',
                'scripts',
                'dist',
            ],
            tsconfigOverride: { compilerOptions: { module: 'es2015' } },
            tsconfigDefaults: {
                compilerOptions: {
                    plugins: [{ transform: '@zerollup/ts-transform-paths' }],
                },
            },
        }),
        nodeResolve({ preferBuiltins: true }),
        babel({
            exclude: ['node_modules', 'scripts', 'dist', '*.d.ts', '**/*.d.ts'],
            extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
            plugins: [
                'babel-plugin-styled-components',
                'babel-plugin-transform-class-properties',
            ],
            presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
        }),
        postcss({
            extensions: ['.css'],
        }),
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
};
