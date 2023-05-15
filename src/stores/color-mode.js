import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'

export const useColorModeStore = defineStore('color-mode', () => {
  const isDark = useDark({
    selector: 'html',
    attribute: 'data-bs-theme',
    valueDark: 'dark',
    valueLight: 'light'
  })

  const toggleDark = useToggle(isDark)

  return { isDark, toggleDark }
})
