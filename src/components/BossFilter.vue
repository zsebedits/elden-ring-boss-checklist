<script setup>
import { useBossesStore } from '../stores/bosses'
import { useSettingsStore } from '../stores/settings'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const bossesStore = useBossesStore()
const { filters, filteredBosses, completedBosses, locations } = storeToRefs(bossesStore)

const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)
const { toggleBossViewMode } = settingsStore
</script>

<template>
  <div class="boss-filter">
    <div class="row align-items-center">
      <div class="col-auto">
        <input type="search" class="form-control" :placeholder="t('search')" aria-label="Boss name" v-model="filters.name" />
      </div>
      <div class="col-auto">
        <select class="form-select" v-model="filters.location">
          <option :value="undefined" selected>{{ t('allLocations') }}</option>
          <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}</option>
        </select>
      </div>
      <div class="col"></div>
      <div class="col-auto">{{ completedBosses.length }} / {{ filteredBosses.length }}</div>
      <div class="col-auto">
        <button class="nav-link" @click="toggleBossViewMode">
          <i v-if="settings.bossViewMode === 'table'" class="bi bi-table"></i>
          <i v-else-if="settings.bossViewMode === 'grid'" class="bi bi-grid-1x2"></i>
          <i v-else-if="settings.bossViewMode === 'grid-sm'" class="bi bi-grid"></i>
          <i v-else class="bi bi-grid-3x3-gap"></i>
        </button>
      </div>
      <div class="col-auto">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="switch-completed" v-model="filters.uncompleted" />
          <label class="form-check-label" for="switch-completed">{{ t('uncompleted') }}</label>
        </div>
      </div>
      <div class="col-auto">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="switch-remembrance" v-model="filters.remembrance" />
          <label class="form-check-label" for="switch-remembrance">{{ t('remembrance') }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.boss-filter {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.form-check {
  margin-bottom: 0;
}
</style>
