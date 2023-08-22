<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useShipmentsStore } from '@/stores/shipmentsStore'

import type { TCommodity } from '@/interfaces'

import CargoItem from './CargoItem.vue'

const router = useRouter()
const route = useRoute()
const shipmentsStore = useShipmentsStore()
const { commodities } = storeToRefs(shipmentsStore)

const handleCargoClick = (details: { commodity: TCommodity; idx: number }) => {
  shipmentsStore.setCurrentCommodity(details)
  router.push({ name: 'cargoDetails', params: { id: route.params.id } })
}
</script>

<template>
  <div>
    <div
      class="px-[20px] border-b dark:border-b-jetDarkBorder border-gray-200"
      v-for="(commodity, idx) in commodities"
      :key="commodity.id"
    >
      <CargoItem @click="handleCargoClick" :commodity="commodity" :idx="idx" />
    </div>
  </div>
</template>
