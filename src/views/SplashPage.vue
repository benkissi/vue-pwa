<script setup lang="ts">
import { onUnmounted, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import logo from '../assets/logo.svg'

const router = useRouter()
const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)
let interval: ReturnType<typeof setTimeout>

onMounted(() => {
  interval = setTimeout(() => {
    if (profile.value) {
      router.push('/shipments')
    } else {
      router.push('/login')
    }
  }, 1000)
})

onUnmounted(() => {
  clearTimeout(interval)
})
</script>

<template>
  <div class="flex justify-center items-center bg-white h-full w-full">
    <img :src="logo" />
  </div>
</template>
