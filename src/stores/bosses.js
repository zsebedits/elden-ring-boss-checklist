import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { getBaseData } from '../api/bosses'

export const useBossesStore = defineStore('bosses', () => {
  const baseData = getBaseData()

  const filters = ref({
    remembrance: undefined,
    shardbearer: undefined,
    name: undefined,
    undefeated: undefined,
    sort: undefined,
    sortDesc: false,
    location: undefined
  })

  const completionObject = useStorage(
    'completionObject',
    baseData.bosses.reduce((acc, c) => {
      acc[c.id] = false
      return acc
    }, {}),
    localStorage,
    { mergeDefaults: true }
  )

  const bosses = computed(() =>
    baseData.bosses.map((boss) => {
      boss.completed = completionObject.value[boss.id]
      return { ...boss }
    })
  )

  const completedBosses = computed(() => bosses.value.filter((boss) => boss.completed))

  const filteredBosses = computed(() => {
    const filteredBosses = bosses.value.filter(
      (boss) =>
        (!filters.value.remembrance || boss.remembrance) &&
        (!filters.value.undefeated || !boss.completed) &&
        (filters.value.name == null ||
          boss.description.toLocaleLowerCase().includes(filters.value.name.toLocaleLowerCase()) ||
          boss.location.name.toLocaleLowerCase().includes(filters.value.name.toLocaleLowerCase()) ||
          boss.drops.join('').toLocaleLowerCase().includes(filters.value.name.toLocaleLowerCase())) &&
        (filters.value.location == null || boss.location.id === filters.value.location)
    )

    if (filters.value.sort != null) {
      if (filters.value.sort === 'description') {
        filteredBosses.sort((b1, b2) => {
          return b1.description.localeCompare(b2.description)
        })
      } else if (filters.value.sort === 'health' || filters.value.sort === 'stance' || filters.value.sort === 'runes') {
        filteredBosses.sort((b1, b2) => {
          return b1[filters.value.sort] - b2[filters.value.sort]
        })
      }
    }

    if (filters.value.sortDesc) {
      filteredBosses.reverse()
    }

    return filteredBosses
  })

  const completedFilteredBosses = computed(() => filteredBosses.value.filter((boss) => boss.completed))

  const locations = ref(baseData.locations)

  const toggleCompleted = (bossId) => {
    completionObject.value[bossId] = !completionObject.value[bossId]
  }

  const setSort = (value) => {
    if (filters.value.sort === value) {
      filters.value.sortDesc = !filters.value.sortDesc
    } else {
      filters.value.sort = value
    }
  }

  return { bosses, completedBosses, filteredBosses, completedFilteredBosses, locations, filters, toggleCompleted, setSort }
})
