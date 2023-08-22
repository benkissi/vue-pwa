<script setup lang="ts">
defineProps({
  name: String
})
</script>

<template>
  <span class="material-symbols-outlined">{{ name }}</span>
</template>
