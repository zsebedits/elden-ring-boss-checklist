<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useColorModeStore } from '../stores/color-mode'
import { useSettingsStore } from '../stores/settings'
import logo from '../assets/elden-ring-logo.png'
import LocaleSwitcher from './LocaleSwitcher.vue'
import EnterLeaveTransition from './EnterLeaveTransition.vue'

const { t } = useI18n()

const colorModeStore = useColorModeStore()
const { isDark } = storeToRefs(colorModeStore)
const { toggleDark } = colorModeStore

const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)
const { toggleLayoutFluid } = settingsStore
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div :class="[{ 'container-fluid': settings.layoutFluid, container: !settings.layoutFluid }]">
      <RouterLink to="/" class="navbar-brand"><img :src="logo" alt="Logo" class="logo" /></RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">{{ t('bossChecklist') }}</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">{{ t('about') }}</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <LocaleSwitcher />
          <li class="nav-item">
            <EnterLeaveTransition name="rotate">
              <button v-if="settings.layoutFluid" class="nav-link" @click="toggleLayoutFluid()">
                <i class="bi bi-arrows-angle-contract"></i>
              </button>
              <button v-else class="nav-link" @click="toggleLayoutFluid()"><i class="bi bi-arrows-angle-expand"></i></button>
            </EnterLeaveTransition>
          </li>
          <li class="nav-item">
            <EnterLeaveTransition>
              <button v-if="isDark" class="nav-link" @click="toggleDark()">
                <i class="bi bi-moon-stars-fill"></i>
              </button>
              <button v-else class="nav-link" @click="toggleDark()"><i class="bi bi-sun"></i></button>
            </EnterLeaveTransition>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/zsebedits/elden-ring-boss-checklist" target="_blank"><i class="bi bi-github"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.logo {
  width: 30px;
  height: 24px;
  object-fit: cover;
}
</style>
