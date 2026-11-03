import {defineConfig} from 'vite';
export default defineConfig({base:'./',esbuild:{jsx:'automatic',jsxImportSource:'preact'},build:{sourcemap:false}});
