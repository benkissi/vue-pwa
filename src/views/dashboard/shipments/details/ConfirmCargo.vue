<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useShipmentsStore } from '@/stores/shipmentsStore'
import ConfirmForm from '@/components/shipments/ConfirmForm.vue'
import Spinner from '@/components/common/Spinner.vue'

const shipmentsStore = useShipmentsStore()
const { commodities, fetchingPackageTypes, fetchingWeightUnits } =
  storeToRefs(shipmentsStore)
const activeTabIndex = ref(0)

shipmentsStore.fetchPackageTypes()
shipmentsStore.fetchWeightUnits()
</script>

<template>
  <div
    v-if="fetchingPackageTypes || fetchingWeightUnits"
    class="h-full w-full flex items-center justify-center"
  >
    <Spinner />
  </div>
  <div v-else class="mb-[58px] mt-[20px]">
    <PTabView v-model:activeIndex="activeTabIndex" lazy>
      <PTabPanel v-for="(commodity, idx) in commodities" :key="commodity.id">
        <template #header>
          <div class="flex items-center w-fit whitespace-nowrap">
            <span class="mr-2 !w-fit whitespace-nowrap"
              >Cargo {{ idx + 1 }} - {{ commodity.commodity_type }}</span
            >
            <i
              v-if="commodity.is_completed"
              class="pi pi-check text-jetGreen"
            ></i>
          </div>
        </template>
        <div class="px-[20px]">
          <ConfirmForm :item="commodity" />
        </div>
      </PTabPanel>
    </PTabView>
  </div>
</template>

<style scoped>
:deep(.p-tabview-panels) {
  padding: 0 !important;
}

:deep(.p-tabview-nav) {
  width: 100vw;
}
</style>
