<script setup>
import { useI18n } from 'vue-i18n'
import { useBossesStore } from '../stores/bosses'

const { t } = useI18n()

const store = useBossesStore()
const { toggleCompleted } = store

defineProps({
  boss: {
    type: Object,
    required: true
  },

  showDetails: {
    type: Boolean,
    default: true
  },

  showName: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div :class="['card', 'h-100', { 'opacity-50': !boss.completed }]" @click="toggleCompleted(boss.id)">
    <img v-if="boss.image != null" :src="boss.image" :class="['card-img-top', { 'img-sm': !showDetails && !showName }]" />
    <div v-else :class="['card-img-top', { 'img-sm': !showDetails && !showName }]"></div>
    <div class="card-img-overlay d-flex flex-column justify-content-end" v-if="!showDetails && showName">
      <h6 class="card-title">
        {{ boss.description }}
      </h6>
    </div>
    <div class="card-body" v-if="showDetails">
      <h5 class="card-title" v-if="showName">
        {{ boss.description }}
      </h5>
      <div class="row mb-2">
        <div class="col-4">{{ t('location') }}</div>
        <div class="col-8">{{ boss.location.name }}</div>
        <div class="col-4">{{ t('health') }}</div>
        <div class="col-8">{{ boss.health }}</div>
        <div class="col-4">{{ t('stance') }}</div>
        <div class="col-8">{{ boss.stance }}</div>
        <div class="col-4">{{ t('runes') }}</div>
        <div class="col-8">{{ boss.runes }}</div>
        <div class="col-4">{{ t('type') }}</div>
        <div class="col-8">
          <div class="d-flex">
            <div v-if="boss.shardbearer" class="shardbearer"><i class="bi bi-dash-circle" :title="t('shardbearer')"></i></div>
            <div v-if="boss.remembrance"><i class="bi bi-fire" :title="t('remembranceBoss')"></i></div>
          </div>
        </div>
        <div class="col-4">{{ t('completed') }}</div>
        <div class="col-8">
          <span v-if="boss.completed"><i class="bi bi-check-lg" :title="t('completed')"></i></span>
          <span v-else><i class="bi bi-x-lg" :title="t('uncompleted')"></i></span>
        </div>
      </div>
      {{ t('drops') }}
      <br />
      {{ boss.drops != null ? boss.drops.join(', ') : '' }}
    </div>
  </div>
</template>

<style scoped>
.card {
  cursor: pointer;
  transition: transform 100ms;
}
.card .card-img-top {
  height: 12rem;
  object-fit: cover;
  object-position: top;
}

.card .card-img-top.img-sm {
  height: 6rem;
}

.card h6.card-title {
  margin-bottom: 0cm;
}

.card:hover {
  opacity: 100;
  transform: scale(1.02);
}

.col-4 {
  padding-right: 0;
}

.shardbearer {
  transform: rotate(90deg);
}
</style>
