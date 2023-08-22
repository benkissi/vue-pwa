<script setup lang="ts">
import { RouterView } from 'vue-router'
import ReloadPrompt from './components/ReloadPrompt.vue'
</script>

<template>
  <div class="h-full w-full">
    <PToast position="bottom-center" />
    <ReloadPrompt />
    <RouterView />
  </div>
</template>
