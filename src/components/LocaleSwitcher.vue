<script setup>
import { useI18n } from 'vue-i18n'

const { availableLocales, locale } = useI18n({ useScope: 'global' })

const setLocale = (value) => {
  locale.value = value
  localStorage.setItem('locale', locale.value)
}
</script>

<template>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> {{ locale.toLocaleUpperCase() }} </a>
    <ul class="dropdown-menu">
      <li v-for="locale in availableLocales" :key="locale">
        <button class="dropdown-item" @click="setLocale(locale)">{{ locale.toLocaleUpperCase() }}</button>
      </li>
    </ul>
  </li>
</template>
