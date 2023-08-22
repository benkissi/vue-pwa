<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import Dropdown from 'primevue/dropdown'

type TModelValue = string | { [key: string]: any }

const emit = defineEmits(['update:modelValue', 'change'])
const props = withDefaults(
  defineProps<{
    errors: string[] | never[]
    modelValue: TModelValue
    label: string
    icon: string
    iconPosition: string
    optionLabel: string
    optionValue?: string | undefined
    list: any[] | undefined
    disabled?: boolean
    testId?: string
  }>(),
  {
    errors: () => [],
    modelValue: '',
    label: 'Input label',
    icon: '',
    iconPosition: 'left',
    type: 'text',
    list: () => [],
    disabled: false,
    testId: 'textInput'
  }
)

const inputValue = ref<TModelValue>(props.modelValue)
const inputId = computed(() => {
  return props.label.split(' ').join('_').toLowerCase()
})

const handleChange = (event: any) => {
  console.log('change***', event)
  emit('change', event)
}

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
      <Dropdown
        :id="inputId"
        v-model="inputValue"
        :class="{
          'p-invalid': !!errors.length,
          'bg-gray-100': disabled
        }"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        :options="list"
        class="flex items-center max-w-full w-full overflow-hidden"
        :aria-describedby="label"
        :disabled="disabled"
        @change="handleChange"
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
:deep(.p-dropdown-label.p-inputtext) {
  /* width: 100px; */
  width: 10px;
  flex: 1;
}

@media (prefers-color-scheme: dark) {
  :deep(.p-inputtext) {
    background-color: #252526;
    border-color: #64748b;
    color: #eee;
  }

  :deep(.p-inputwrapper) {
    background-color: #252526;
    border-color: #64748b;
  }
}
</style>
