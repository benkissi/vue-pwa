<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Ref } from 'vue'
import InputNumber from 'primevue/inputnumber'

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(
  defineProps<{
    errors: string[] | never[]
    modelValue: number | null
    label?: string
    icon?: string
    iconPosition?: string
    mode?: 'currency' | 'decimal' | undefined
    decimals?: number
    disabled?: boolean
    placeholder?: string
  }>(),
  {
    errors: () => [],
    modelValue: null,
    label: 'Input label',
    icon: '',
    iconPosition: 'left',
    mode: undefined,
    decimals: 0,
    disabled: false,
    placeholder: ''
  }
)

const inputRef: Ref<any | null> = ref(null)

const inputValue = ref<number | null>(props.modelValue)
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
  () => inputValue.value,
  (newValue) => {
    console.log('input number', newValue)
    emit('update:modelValue', newValue)
  }
)
</script>

<template>
  <div>
    <div
      class="text-14 font-[500] mb-[12px] text-jetBlack dark:text-jetDarkText"
    >
      {{ label }}
    </div>
    <span
      class="w-full"
      :class="[
        iconPosition === 'right' && icon
          ? 'p-input-icon-right'
          : iconPosition === 'left' && icon
          ? 'p-input-icon-left'
          : ''
      ]"
    >
      <i v-if="icon" :class="icon" />
      <InputNumber
        :id="inputId"
        v-model="inputValue"
        :class="{
          'p-invalid': !!errors.length,
          'bg-gray-100': disabled
        }"
        :mode="mode"
        :minFractionDigits="decimals"
        ref="inputRef"
        class="w-full bg-gray-100 rounded"
        :aria-describedby="label"
        @keyup="inputRef?.onInputBlur($event)"
        :disabled="disabled"
        :placeholder="placeholder"
      />
    </span>

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
:deep(.p-inputnumber-input) {
  width: 100% !important;
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
}
</style>
