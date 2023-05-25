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
  <!-- TODO: Highlight completed -->
  <div :class="['card', 'h-100', { highlight: boss.completed }]" @click="toggleCompleted(boss.id)">
    <img
      v-if="boss.image != null"
      :src="boss.image"
      :class="[
        'card-img-top',
        { 'img-sm': !showDetails && !showName, 'card-img-bottom': !showDetails, grayscale: !boss.completed, 'transform-origin-bottom': showDetails }
      ]"
    />
    <div v-else :class="['card-img-top', { 'img-sm': !showDetails && !showName, 'card-img-bottom': !showDetails, grayscale: !boss.completed }]"></div>
    <div class="card-img-overlay d-flex flex-column justify-content-end" v-if="!showDetails && showName">
      <h6 class="card-title">
        {{ boss.description }}
      </h6>
    </div>
    <div class="card-body" v-if="showDetails">
      <h5 class="card-title" v-if="showName">
        {{ boss.description }}
      </h5>
      <!-- <h6 class="card-subtitle mb-2 text-body-secondary">{{ boss.location.name }}</h6> -->
      <div class="row justify-content-between">
        <div class="col-auto">{{ boss.location.name }}</div>
        <div class="col-auto">
          <div class="d-flex">
            <div v-if="boss.shardbearer" class="shardbearer"><i class="bi bi-dash-circle" :title="t('shardbearer')"></i></div>
            <div v-if="boss.remembrance"><i class="bi bi-fire" :title="t('remembranceBoss')"></i></div>
          </div>
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-auto">{{ t('health') }}</div>
        <div class="col-auto">{{ boss.health }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-auto">{{ t('stance') }}</div>
        <div class="col-auto">{{ boss.stance }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-auto">{{ t('runes') }}</div>
        <div class="col-auto">{{ boss.runes }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-auto">{{ t('completed') }}</div>
        <div class="col-auto">
          <span v-if="boss.completed"><i class="bi bi-check-lg" :title="t('completed')"></i></span>
          <span v-else><i class="bi bi-x-lg" :title="t('undefeated')"></i></span>
        </div>
      </div>
      <div class="mt-3">
        {{ t('drops') }}
        <br />
        {{ boss.drops != null ? boss.drops.join(', ') : '' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  cursor: pointer;
  overflow: hidden;
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
  color: white;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.176), 0 0 1px rgba(0, 0, 0, 0.176), 0 0 1px rgba(0, 0, 0, 0.176), 0 0 1px rgba(0, 0, 0, 0.176);
}

.card h5.card-title {
  min-height: 3rem;
}

.card img {
  transition: transform 0.15s ease;
}

.card:hover img {
  transform: scale(1.12);
}

.col-4 {
  padding-right: 0;
}

.shardbearer {
  transform: rotate(90deg);
}

.highlight {
  filter: brightness(110%);
}

.grayscale {
  filter: grayscale(100%);
}

.transform-origin-bottom {
  transform-origin: bottom;
}
</style>
