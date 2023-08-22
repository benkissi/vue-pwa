<script setup lang="ts">
const emit = defineEmits(['click'])
withDefaults(
  defineProps<{
    label?: string
    selected?: boolean
    disabled?: boolean
  }>(),
  {
    disabled: false
  }
)
</script>

<template>
  <div
    @click="!disabled && emit('click')"
    :class="{
      'bg-gray-100 dark:bg-[#252526] cursor-not-allowed': disabled
    }"
    class="flex items-center py-[13px] px-[16px] border rounded border-gray-300 dark:bg-[#252526] dark:border-jetDarkInputBorder"
  >
    <div
      class="border-jetBlue border-[2px] rounded-full h-[20px] w-[20px] mr-[6px] p-[3px]"
    >
      <div v-if="selected" class="bg-jetBlue w-full h-full rounded-full"></div>
    </div>
    <div class="text-14 font-[500] dark:text-[#eee]">{{ label }}</div>
  </div>
</template>
