<script setup>
import { useBossesStore } from '../stores/bosses'
import { useSettingsStore } from '../stores/settings'
import EnterLeaveTransition from '../components/EnterLeaveTransition.vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const bossesStore = useBossesStore()
const { filters, bosses, completedBosses, filteredBosses, completedFilteredBosses, locations } = storeToRefs(bossesStore)

const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)
const { toggleBossViewMode } = settingsStore
</script>

<template>
  <div class="boss-filter">
    <div class="row align-items-center">
      <div class="col-xl-3 col-lg-6 col-md-6 mb-1 mt-1">
        <input type="search" class="form-control" :placeholder="t('search')" aria-label="Boss name" v-model="filters.name" />
      </div>
      <div class="col-xl-3 col-lg-6 col-md-6 mb-1 mt-1">
        <select class="form-select" v-model="filters.location">
          <option :value="undefined" selected>{{ t('allLocations') }} ({{ completedBosses.length }}/{{ bosses.length }})</option>
          <option v-for="location in locations" :key="location.id" :value="location.id">
            {{ location.name }} ({{ location.requirements.filter((boss) => boss.completed).length }}/{{ location.requirements.length }})
          </option>
        </select>
      </div>
      <div class="col-sm col-xs-auto"></div>
      <div class="col-auto mb-2 mt-2">{{ completedFilteredBosses.length }} / {{ filteredBosses.length }}</div>
      <div class="col-auto mb-2 mt-2">
        <EnterLeaveTransition name="rotate">
          <button class="nav-link" @click="toggleBossViewMode" v-if="settings.bossViewMode === 'table'"><i class="bi bi-table"></i></button>
          <button class="nav-link" @click="toggleBossViewMode" v-else-if="settings.bossViewMode === 'grid'"><i class="bi bi-grid-1x2"></i></button>
          <button class="nav-link" @click="toggleBossViewMode" v-else-if="settings.bossViewMode === 'grid-sm'"><i class="bi bi-grid"></i></button>
          <button class="nav-link" @click="toggleBossViewMode" v-else><i class="bi bi-grid-3x3-gap"></i></button>
        </EnterLeaveTransition>
      </div>
      <div class="col-auto">
        <div class="row">
          <div class="col-auto mb-2 mt-2">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="switch-completed" v-model="filters.undefeated" />
              <label class="form-check-label" for="switch-completed">{{ t('undefeated') }}</label>
            </div>
          </div>
          <div class="col-auto mb-2 mt-2">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="switch-remembrance" v-model="filters.remembrance" />
              <label class="form-check-label" for="switch-remembrance">{{ t('remembrance') }}</label>
            </div>
          </div>
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
