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
  shortcuts: [{
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-between': 'flex justify-between items-center',
    'flex-warp-center': 'flex items-center flex-wrap',
    'flex-col': 'flex flex-col',
    'flex-col-center': 'flex-center flex-col',
    'absolute-lt': 'absolute left-0 top-0',
    'absolute-center': 'absolute-lt flex-center wh-full',
    'fixed-lt': 'fixed left-0 top-0',
    'fixed-center': 'fixed-lt flex-center wh-full',
    'border-bottom': 'border-b-[1px] border-b-solid border-[#ddd]',
    'border-right': 'border-r-[1px] border-r-solid border-[#ddd]',
    'border-left': 'border-l-[1px] border-l-solid border-[#ddd]',
    'fixed-full': 'fixed left-0 top-0 wh-full',
  },
  // [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
  [/^border-color-(.*)$/, ([, c]) => `border-[1px] border-solid border-[${c}]`],
  ],
  theme: {
    colors: {
      primary: 'rgb(var(--primary-color))'
    }
  }
})