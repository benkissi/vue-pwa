<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'
import { buttonVariantsRef } from '../variants'
import { useVariant } from '@/composables/useVariant'
import SpinnerAlt from './SpinnerAlt.vue'

const emit = defineEmits(['click'])
const props = withDefaults(
  defineProps<{
    type: 'outline' | 'normal'
    color: 'success' | 'danger' | 'default'
    loading?: boolean
  }>(),
  {
    type: 'normal',
    color: 'success',
    loading: false
  }
)

const styleSelection = computed(() => {
  return {
    button: true,
    [`${props.type}_${props.color}`]: true
  }
})

const classString = computed(() => {
  return useVariant(styleSelection, buttonVariantsRef)
})
</script>
<template>
  <div
    :class="[
      classString,
      loading && 'cursor-not-allowed bg-opacity-50 hover:bg-opacity-50'
    ]"
    @click="
      () => {
        if (loading) return
        emit('click')
      }
    "
  >
    <SpinnerAlt
      :classStyles="{
        'fill-jetGreen': color === 'success',
        'fill-jetRed': color === 'danger',
        'fill-jetBlack': color === 'default'
      }"
      v-if="loading"
    />
    <slot v-else>Button text</slot>
  </div>
</template>
