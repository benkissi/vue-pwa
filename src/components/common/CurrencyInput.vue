<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'
import type { Ref } from 'vue'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'

import type { ICurrencyItem } from '@/interfaces'

const emit = defineEmits([
  'update:modelValue',
  'update:currency',
  'currencyChange'
])

const props = withDefaults(
  defineProps<{
    errors: string[] | never[]
    modelValue: number | null
    label: string
    currency: string | null
    currencyList: ICurrencyItem[] | null
    inputTestId?: string
    currencyTestId?: string
  }>(),
  {
    errors: () => [],
    modelValue: null,
    label: 'Input label',
    currencyList: () => [
      { value: 'USD', label: 'USD' },
      { value: 'USD', label: 'GHS' }
    ],
    inputTestId: 'textInput',
    currencyTestId: 'currency'
  }
)

const inputRef: Ref<any | null> = ref(null)

const inputValue = ref<number | null>(props.modelValue)
const currencyValue = ref<string | null>('GHS')

const inputId = computed(() => {
  return props.label.split(' ').join('_').toLowerCase()
})

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
  }
)

watch(
  () => props.currency,
  (newValue) => {
    currencyValue.value = newValue
  }
)

watch(
  () => inputValue.value,
  (newValue) => {
    console.log('CURRENCY', newValue)
    emit('update:modelValue', newValue)
  }
)

watch(
  () => currencyValue.value,
  (newValue) => {
    emit('update:currency', newValue)
  },
  {
    immediate: true
  }
)

watchEffect(() => {
  console.log('currency----***', currencyValue.value)
  emit('currencyChange', currencyValue.value)
})
</script>

<template>
  <div class="w-full">
    <div
      class="text-14 font-[500] mb-[12px] text-jetBlack dark:text-jetDarkText"
    >
      {{ label }}
    </div>
    <div class="flex w-full max-w-full overflow-hidden">
      <Dropdown
        class="!rounded-r-none w-[120px]"
        optionLabel="value"
        optionValue="value"
        v-model="currencyValue"
        :options="currencyList || []"
        :class="{
          'p-invalid': !!errors.length
        }"
        :pt="{ root: { 'data-cy': currencyTestId } }"
      />
      <InputNumber
        :id="inputId"
        v-model="inputValue"
        :class="{
          'p-invalid': !!errors.length
        }"
        class="w-full"
        :aria-describedby="label"
        ref="inputRef"
        @keyup="inputRef?.onInputBlur($event)"
        :pt="{ input: { 'data-cy': inputTestId } }"
      />
    </div>

    <div v-if="!!errors.length">
      <span
        :id="`${inputId}-error`"
        v-for="(error, index) of errors"
        :key="index"
      >
        <small class="p-error">{{ error.replace('Value', label) }}</small>
      </span>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-inputnumber input) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-left: 0;
  width: 100%;
}

@media (prefers-color-scheme: dark) {
  :deep(.p-inputnumber-input) {
    background-color: #252526;
    border-color: #64748b;
    color: #eee;
  }

  :deep(span.p-inputwrapper-filled) {
    border: none;
    background-color: transparent;
  }

  :deep(.p-inputwrapper) {
    background-color: #252526;
    border-color: #64748b;
  }
}
</style>
