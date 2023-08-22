<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Sidebar from 'primevue/sidebar'
import Button from './common/Button.vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

import logo from '../assets/logo.svg'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

const show = ref(false)

const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
  show.value = false
}

watchEffect(() => {
  if (offlineReady.value || needRefresh.value) {
    show.value = true
  }
})
</script>

<template>
  <Sidebar v-model:visible="show" position="bottom" :showCloseIcon="false">
    <template #header>
      <div>
        <img :src="logo" alt="logo" />
      </div>
    </template>

    <div v-if="needRefresh" class="mt-3">
      <div class="flex text-jetBlack text-16 font-[500]">
        New updates are available for the app
      </div>
      <div class="grid grid-cols-2 gap-5 items-center justify-between mt-4">
        <Button type="outline" color="danger" @click="close"
          ><div class="text-14 font-[500]">Not now</div></Button
        >
        <Button color="success" @click="updateServiceWorker()"
          ><div class="text-14 font-[500]">Install updates</div></Button
        >
      </div>
    </div>
    <div v-else class="mt-3">
      <div class="flex text-jetBlack text-16 font-[500]">
        App is ready to work offline
      </div>
      <div class="grid grid-cols-2 gap-5 items-center justify-between mt-4">
        <Button type="outline" color="success" @click="close()"
          ><div class="text-14 font-[500]">Ok</div></Button
        >
      </div>
    </div>
  </Sidebar>
</template>

<style>
.p-sidebar .p-sidebar-header {
  padding-bottom: 0px !important;
  padding-top: 16px !important;
}
</style>
