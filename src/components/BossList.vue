<script setup>
import BossTableRow from './BossTableRow.vue'
import BossCard from './BossCard.vue'
import { useBossesStore } from '../stores/bosses'
import { useSettingsStore } from '../stores/settings'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const bossesStore = useBossesStore()
const { filteredBosses, filters } = storeToRefs(bossesStore)

const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)

const setSort = (column) => {
  if (filters.value.sort === column) {
    filters.value.sortDesc = !filters.value.sortDesc
  } else {
    filters.value.sort = column
  }
}
</script>

<template>
  <div class="bosses">
    <table class="table table-sm" v-if="settings.bossViewMode === 'table'">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col" @click="setSort('description')">{{ t('name') }}</th>
          <th scope="col" @click="setSort('location')">{{ t('location') }}</th>
          <th scope="col" @click="setSort('health')" style="text-align: end">{{ t('health') }}</th>
          <th scope="col" @click="setSort('stance')" style="text-align: end">{{ t('stance') }}</th>
          <th scope="col" @click="setSort('runes')" style="text-align: end">{{ t('runes') }}</th>
          <th scope="col" style="text-align: end">{{ t('type') }}</th>
        </tr>
      </thead>
      <tbody>
        <BossTableRow v-for="boss in filteredBosses" :key="boss.id" :boss="boss" />
      </tbody>
    </table>
    <div class="boss-grid grid-lg" v-else-if="settings.bossViewMode === 'grid'">
      <BossCard v-for="boss in filteredBosses" :key="boss.id" :boss="boss" />
    </div>
    <div class="boss-grid grid-sm" v-else-if="settings.bossViewMode === 'grid-sm'">
      <BossCard v-for="boss in filteredBosses" :key="boss.id" :boss="boss" :show-details="false" />
    </div>
    <div class="boss-grid grid-xs" v-else-if="settings.bossViewMode === 'grid-xs'">
      <BossCard v-for="boss in filteredBosses" :key="boss.id" :boss="boss" :show-details="false" :show-name="false" />
    </div>
  </div>
</template>

<style scoped>
.boss-grid {
  display: grid;
  gap: 16px;
}

.grid-lg {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.grid-sm {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.grid-xs {
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}

th {
  cursor: pointer;
}
</style>
