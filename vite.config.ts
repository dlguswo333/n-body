import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

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
    plugins: [tsconfigPaths()],
});
