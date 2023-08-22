<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'primevue/usetoast'
import config from '../config'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const {
  code = null,
  scope = null,
  authuser = null,
  hd = null,
  prompt = null
} = route.query

const LOGIN_BASE_URL = config.LOGIN_BASE_URL

const LOGIN_REDIRECT = `${LOGIN_BASE_URL}/redirect`
const LOGIN_CALLBACK = `${LOGIN_BASE_URL}/callback`

onMounted(async () => {
  if (authStore.profile) {
    router.push('/shipments')
    return
  }
  if (code !== null) {
    const redirectUrl = `${LOGIN_CALLBACK}?code=${code}&scope=${scope}&authuser=${authuser}&hd=${hd}&prompt=${prompt}`
    const res = await authStore.login(redirectUrl)
    if (res.success) {
      router.push('/shipments')
    }
    if (!res.success) {
      toast.add({
        severity: 'error',
        summary: 'Login failed',
        detail: res.error,
        life: 3000
      })
    }
  }
  console.log('--- Env Mode ---', import.meta.env.MODE)
})
</script>
<template>
  <div class="flex justify-center items-center h-full w-full">
    <div class="w-full md:w-[40%] p-10">
      <div class="text-20 text-jetBlack font-[500]">Log in to your account</div>
      <a
        :href="LOGIN_REDIRECT"
        class="flex justify-center text-jetBlack border-gray-300 border hover:bg-gray-100 rounded p-[9px] mt-[40px] cursor-pointer"
      >
        <img src="@/assets/google-img.png" alt="login with google" />
        <div class="font-[500] ml-[14px] text-jetBlack">Login with Google</div>
      </a>
    </div>
  </div>
</template>
