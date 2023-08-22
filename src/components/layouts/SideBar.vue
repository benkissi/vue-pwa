<script setup lang="ts">
import { ref, watchEffect, watch } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from 'primevue/sidebar'
import { useI18n } from 'vue-i18n'

import logo from '../../assets/logo.svg'
import NavList from '../../navigation'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{ modelValue: boolean }>()

const route = useRoute()
const { t } = useI18n({
  inheritLocale: true
})

const visible = ref(props.modelValue)

watchEffect(() => {
  visible.value = props.modelValue
})

watch(
  () => visible.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)
</script>
<template>
  <Sidebar v-model:visible="visible" class="dark:bg-jetDarkBg">
    <template #header>
      <div class="w-full">
        <img :src="logo" class="float-left" />
      </div>
    </template>
    <div class="mt-7">
      <div
        class="p-2 rounded-md mb-4 bg-slate-100 dark:bg-slate-800 dark:text-jetDarkSec text-14 font-[500] cursor-pointer"
        :class="{
          'bg-jetBlue dark:bg-slate-700 text-white font-[500]':
            route.name === item.name
        }"
        v-for="item in NavList"
        :key="item.name"
      >
        {{ t(`navigation.${item.name}`) }}
      </div>
    </div>
  </Sidebar>
</template>

<style>
.p-sidebar .p-sidebar-header {
  justify-content: space-between !important;
}
</style>
