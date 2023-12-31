import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'
import path from 'path';
import setupVitePlugins from './plugins'


// https://vitejs.dev/config/
export default defineConfig((configEnv: ConfigEnv) => {
  console.log('configEnv', configEnv, process.cwd(), path.resolve(process.cwd()));
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ImportMetaEnv;
  console.log('viteEnv', viteEnv);
  const pathSrc = path.resolve(__dirname, 'src')
  return {
    base: viteEnv.VITE_BASE_URL,
    plugins: setupVitePlugins(viteEnv),
    resolve: {
      alias: {
        '@': pathSrc
      }
    },
    server: {
      host: '0.0.0.0',
      // port: 6666,
    }
  }
})
