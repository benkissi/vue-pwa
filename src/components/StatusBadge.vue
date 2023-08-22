<script setup lang="ts">
import { computed } from 'vue'

import { useVariant } from '../composables/useVariant'
import { badgeVariantsRef } from './variants'

import type { IStatusVariants } from '@/interfaces'

const props = defineProps<{ text?: string }>()

const variantType: IStatusVariants = {
  draft: 'blue',
  completed: 'green',
  awaiting_quote: 'orange',
  'In-Transit(Air)': 'blue',
  'not-paid': 'red',
  not_paid: 'red',
  paid: 'green',
  quote_accepted: 'green'
}

const selectedVariants = computed(() => {
  const selection: { [key: string]: boolean } = {
    badge: true
  }
  if (variantType[props.text as keyof IStatusVariants]) {
    selection[variantType[props.text as keyof IStatusVariants]] = true
  } else {
    selection.gray = true
  }
  return selection
})

const classString = computed(() => {
  return useVariant(selectedVariants, badgeVariantsRef)
})
</script>

<template>
  <div v-if="text" class="text-center" :class="[classString, 'capitalize']">
    {{ text.split('_').join(' ').split('-').join(' ') }}
  </div>
</template>
