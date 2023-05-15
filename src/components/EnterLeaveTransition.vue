<script setup>
defineProps({
  name: {
    type: String,
    default: 'slide-up'
  },
  mode: {
    type: String,
    default: 'out-in'
  }
})
</script>

<template>
  <Transition :name="name" :mode="mode">
    <slot></slot>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active,
.fade-enter-active,
.fade-leave-active,
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.2s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.rotate-enter-from {
  opacity: 0;
  transform: rotate(180deg);
}

.rotate-leave-to {
  opacity: 0;
  transform: rotate(-180deg);
}
</style>
