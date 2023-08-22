<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import GIcons from '../GIcons.vue'
import SideBar from './SideBar.vue'
import { useToast } from 'primevue/usetoast'
import { useApi } from '@/api'

const { invalidate } = useApi()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const { t } = useI18n({
  inheritLocale: true
})

const showMenu = ref(false)
const isOnline = ref(navigator.onLine)

const updateOnlineStatus = (e: Event) => {
  console.log('status---', e)
  if (navigator.onLine) {
    isOnline.value = true
    toast.add({
      severity: 'info',
      summary: 'Online',
      detail: 'You are back online',
      life: 3000
    })
    invalidate('*')
  } else {
    isOnline.value = false
    toast.add({
      severity: 'info',
      summary: 'Offline',
      detail: 'You are offline',

      life: 3000
    })
  }
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

// console.log('router', router)
</script>

<template>
  <div class="flex items-center px-[18px] py-[15px]">
    <SideBar v-model="showMenu" />
    <GIcons
      v-if="route.meta.parent"
      name="arrow_back_ios"
      class="text-jetGrey cursor-pointer text-jetSecondary"
      @click="router.push(route.meta.parent(route).path)"
    />
    <GIcons
      v-else
      name="menu"
      class="text-jetSecondary cursor-pointer"
      @click="showMenu = !showMenu"
    />

    <div
      class="text-center text-16 text-jetText dark:text-jetDarkText font-medium flex-1"
    >
      {{ t(`navigation.${route.meta.displayRoute}`) }}
    </div>

    <GIcons
      name="offline_bolt"
      class="cursor-pointer text-jetSecondary"
      :class="{
        '!text-jetGreen': isOnline
      }"
    />
  </div>
</template>
