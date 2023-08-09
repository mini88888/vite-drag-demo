import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import type { PluginOption } from 'vite'


/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  console.log('viteEnv', viteEnv);

  const Plugins = [
    vue(),
    unocss(),
    AutoImport({
      resolvers: [
        ElementPlusResolver()
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver()
      ],
    })
  ]
  return Plugins
}

export default setupVitePlugins