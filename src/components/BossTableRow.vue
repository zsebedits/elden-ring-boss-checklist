<script setup>
import { useBossesStore } from '../stores/bosses'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const store = useBossesStore()
const { toggleCompleted } = store

defineProps({
  boss: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- TODO: Change if selected? -->
  <tr :class="[{ 'table-activee': boss.completed, 'opacity-75s': !boss.completed }]">
    <th><input class="form-check-input" type="checkbox" :id="boss.id" :checked="boss.completed" @change="toggleCompleted(boss.id)" /></th>
    <th><img v-if="boss.image != null" :src="boss.image" class="boss-image" /></th>
    <td>
      <a class="nav-link" :href="boss.url" target="_blank">{{ boss.description }}</a>
    </td>
    <td>{{ boss.location.name }}</td>
    <td style="text-align: end">{{ boss.health }}</td>
    <td style="text-align: end">{{ boss.stance }}</td>
    <td style="text-align: end">{{ boss.runes }}</td>
    <td style="text-align: end">
      <div class="d-flex justify-content-end">
        <div v-if="boss.shardbearer" style="transform: rotate(90deg)"><i class="bi bi-dash-circle" :title="t('shardbearer')"></i></div>
        <div v-if="boss.remembrance"><i class="bi bi-fire" :title="t('remembranceBoss')"></i></div>
      </div>
    </td>
  </tr>
</template>

<style scoped>
th .boss-image {
  height: 1.4rem;
  width: 2rem;
  object-fit: cover;
  object-position: top;
}
</style>
