// uno.config.ts
import { defineConfig } from "@unocss/vite";
import presetUno from '@unocss/preset-uno';

export default defineConfig({
  presets: [presetUno()],
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', '.git', '.vscode', 'public', 'plugins', 'mock', './index.html']
    }
  },
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-between': 'flex justify-between items-center',
    'flex-col': 'flex flex-col',
    'flex-col-center': 'flex-center flex-col',
    'absolute-lt': 'absolute left-0 top-0',
    'absolute-center': 'absolute-lt flex-center wh-full',
    'border-bottom': 'border-b-[1px] border-b-solid border-[#ccc]',
    'border-right': 'border-r-[1px] border-r-solid border-[#ccc]',
    'border-left': 'border-l-[1px] border-l-solid border-[#ccc]',
  },
  theme: {
    colors: {
      primary: 'rgb(var(--primary-color))'
    }
  }
})