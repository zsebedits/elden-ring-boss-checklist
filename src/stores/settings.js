import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const baseSettings = {
  bossViewMode: 'table',
  layoutFluid: false
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = useStorage('settings', baseSettings, localStorage, { mergeDefaults: true })

  const toggleBossViewMode = () => {
    if (settings.value.bossViewMode === 'table') {
      settings.value.bossViewMode = 'grid'
    } else if (settings.value.bossViewMode === 'grid') {
      settings.value.bossViewMode = 'grid-sm'
    } else if (settings.value.bossViewMode === 'grid-sm') {
      settings.value.bossViewMode = 'grid-xs'
    } else {
      settings.value.bossViewMode = 'table'
    }
  }

  const toggleLayoutFluid = () => {
    settings.value.layoutFluid = !settings.value.layoutFluid
  }

  return { settings, toggleBossViewMode, toggleLayoutFluid }
})
