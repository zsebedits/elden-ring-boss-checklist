<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { useSettingsStore } from './stores/settings'
import { storeToRefs } from 'pinia'

const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)
</script>

<template>
  <NavBar />
  <main :class="[{ 'container-fluid': settings.layoutFluid, container: !settings.layoutFluid }, 'pb-4']">
    <RouterView />
  </main>
</template>
