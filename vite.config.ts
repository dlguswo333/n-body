import {defineConfig} from 'vite';

export default defineConfig({
    base: undefined,
    build: {
        target: 'es2021',
        outDir: 'dist',
        sourcemap: true,
        minify: true,
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    plugins: [],
});
