import swc from 'rollup-plugin-swc';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';
import cleaner from 'rollup-plugin-cleaner';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import systemJSLoader from 'rollup-plugin-systemjs-loader';

const extensions = ['.js', '.ts', '.jsx', '.tsx'];

const buildSettings = {
    input: ['src/index.tsx'],
    output: {
        format: 'system',
        dir: 'dist',
    },
    extensions,
    preserveEntrySignatures: false
};

const bundleSettings = {
    jsc: {
        parser: {
            syntax: 'typescript',
            jsx: true,
            tsx: true,
            dynamicImport: false,
        },
        target: 'es5',
        transform: {
            react: {
                pragma: 'h',
                pragmaFrag: 'Fragment'
            }
        }
    },
    sourceMaps: 'inline'
};
const nodeResolveSettings = {
     browser: true,
     extensions
};
const postCSSSettings = {
    extract: true,
    modules: true,
};

const plugins = [
    cleaner({
        targets: ['./dist']
    }),
    copy({
        targets: [
            { src: './public/*', dest: './dist/' }
        ]
    }),
    systemJSLoader({
        baseURL: 'http://localhost:10001/',
        include: [
            require.resolve('systemjs/dist/system.js')
        ]
    }),
    postcss(postCSSSettings),
    swc(bundleSettings),
    nodeResolve(nodeResolveSettings),
    commonjs(),
    serve('dist'),
    livereload('dist')
];

export default {
    ...buildSettings,
    plugins,
};
