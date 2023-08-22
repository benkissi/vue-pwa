<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import Textarea from 'primevue/textarea'

const emit = defineEmits(['update:modelValue', 'input'])
const props = withDefaults(
  defineProps<{
    errors: string[] | never[]
    modelValue: string
    label: string
    icon: string
    iconPosition: string
    disabled?: boolean
    placeholder?: string
    testId?: string
  }>(),
  {
    errors: () => [],
    modelValue: '',
    label: 'Input label',
    icon: '',
    iconPosition: 'left',
    type: 'text',
    disabled: false,
    placeholder: '',
    testId: 'textarea'
  }
)

const inputValue = ref<string>(props.modelValue)
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
    emit('update:modelValue', newValue)
    console.log('newValue', newValue)
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
      <Textarea
        @input="emit('input')"
        :id="inputId"
        v-model="inputValue"
        :class="{
          'p-invalid': !!errors.length,
          'bg-gray-100': disabled
        }"
        class="w-full"
        :aria-describedby="label"
        :disabled="disabled"
        :placeholder="placeholder"
        :pt="{ root: { 'data-cy': testId } }"
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
@media (prefers-color-scheme: dark) {
  :deep(.p-inputtext) {
    background-color: #252526;
    border-color: #64748b;
    color: #eee;
  }
}
</style>
