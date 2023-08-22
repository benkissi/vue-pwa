<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useShipmentsStore } from '@/stores/shipmentsStore'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'

import ShipmentItem from '../../../components/shipments/ShipmentItem.vue'
import Spinner from '@/components/common/Spinner.vue'
import SpinnerAlt from '@/components/common/SpinnerAlt.vue'

const shipmentsStore = useShipmentsStore()
const { shipmentsList, fetchingShipments, shipments } =
  storeToRefs(shipmentsStore)
const router = useRouter()

const pagingInfo = computed(() => {
  return {
    currentPage: shipments.value?.current_page,
    totalPages: shipments.value?.last_page,
    totalRecords: shipments.value?.total,
    perPage: shipments.value?.per_page
  }
})

const handlePagination = (nextPage: number, perPage: number) => {
  console.log('scroll', nextPage, perPage)
  if (fetchingShipments.value) return
  shipmentsStore.fetchShipments(nextPage)
}

useInfiniteScroll(pagingInfo, handlePagination)

const handleShipmentClick = (id: string) => {
  router.push({ name: 'shipmentDetails', params: { id } })
}

onMounted(() => {
  shipmentsStore.fetchShipments(1)
})
</script>
<template>
  <div class="px-[20px] pb-[20px] pt-[10px] w-full h-full">
    <div
      v-if="fetchingShipments && !shipmentsList.length"
      class="h-full w-full flex items-center justify-center"
    >
      <Spinner />
    </div>

    <div v-else v-for="shipment in shipmentsList" :key="shipment.id">
      <ShipmentItem
        :shipment="shipment"
        @click="handleShipmentClick(shipment.id)"
        class="cursor-pointer"
      />
    </div>
    <div
      v-if="shipmentsList.length && fetchingShipments"
      class="w-full flex justify-center py-5 mb-2"
    >
      <SpinnerAlt :classStyles="{ 'fill-jetBlue': true }" />
    </div>
  </div>
</template>
