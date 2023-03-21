import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      collections: {
        'xx-icons': FileSystemIconLoader(
          './assets/icons',
          svg => svg,
        ),
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      black: '#171717',
      grey: {
        0: '#C1C1D4',
        normal: '#C1C1D4',
        light: '#F2F2FA',
      },
      purple: {
        0: '#3E3091',
        digital: '#4F1CFF',
        light: '#B49EFF',
      },
      green: {
        0: '#4DCB92',
      },
    },
    fontSize: {
      '2xs': '.5rem',
    },
  },
  safelist: [
    'i-xx-icons-discord', 'i-xx-icons-telegram', 'i-xx-icons-twitter', 'i-xx-icons-youtube',
    'i-xx-icons-arrow-right', 'i-xx-icons-arrow-left',
  ],
})
