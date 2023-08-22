<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '../components/layouts/NavBar.vue'
</script>

<template>
  <div class="flex w-full h-full dark:bg-jetDarkBg">
    <div class="hidden">Sidebar</div>
    <div class="flex flex-col flex-1">
      <div
        class="fixed top-0 left-0 right-0 bg-white dark:bg-jetDarkBg z-40 shadow-jetGreen"
      >
        <NavBar />
      </div>

      <div class="w-full flex-1 mt-[60px] dark:bg-jetDarkBg">
        <RouterView />
      </div>
    </div>
  </div>
</template>
