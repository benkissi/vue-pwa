<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useShipmentsStore } from '@/stores/shipmentsStore'

import StatusBadge from '@/components/StatusBadge.vue'
import Button from '@/components/common/Button.vue'
import Details from '@/components/shipments/ShipmentDetails.vue'
import CargoDetails from '@/components/shipments/CargoDetails.vue'
import Bills from '@/components/shipments/Bills.vue'
import Spinner from '@/components/common/Spinner.vue'

const shipmentsStore = useShipmentsStore()
const route = useRoute()
const id = route.params.id

const { fetchingShipmentDetails, shipmentDetails } = storeToRefs(shipmentsStore)

const router = useRouter()
const activeTabIndex = ref(0)

shipmentsStore.fetchShipmentDetails(id as string)
shipmentsStore.fetchShipmentBills(id as string)
</script>

<template>
  <div
    v-if="fetchingShipmentDetails"
    class="h-full w-full flex items-center justify-center"
  >
    <Spinner />
  </div>
  <div v-else class="mb-[37px]">
    <div class="px-[20px] pt-[20px]">
      <div class="flex items-center text-12 uppercase mb-[12px]">
        <span
          class="dark:text-jetDarkText text-jetSecondary font-[500] text-12"
        >
          Status
        </span>

        <StatusBadge
          :text="shipmentDetails?.shipment_status"
          class="ml-[8px]"
        />
      </div>

      <div
        class="border border-gray-200 dark:border-jetDarkBorder rounded min-h-[100px] p-[14px] mb-[40px]"
      >
        <div class="flex justify-between">
          <div>
            <div
              class="text-jetSecondary dark:text-jetDarkSec text-12 uppercase font-[500]"
            >
              Customer
            </div>
            <div class="text-jetBlack dark:text-jetDarkText font-[500]">
              {{ shipmentDetails?.company.company_name }}
            </div>
          </div>

          <div>
            <div
              class="text-jetSecondary dark:text-jetDarkSec text-12 uppercase font-[500]"
            >
              Booking ID
            </div>
            <div class="text-jetBlack dark:text-jetDarkText font-[500]">
              {{ shipmentDetails?.booking_id }}
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-[24px]">
          <div>
            <div
              class="text-jetSecondary dark:text-jetDarkSec text-12 uppercase font-[500]"
            >
              Shipment type
            </div>
            <div
              class="text-jetBlack dark:text-jetDarkText font-[500] capitalize"
            >
              {{ shipmentDetails?.type }}
            </div>
          </div>
        </div>
        <div class="mt-[19px] grid grid-cols-2 gap-5">
          <Button
            @click="() => router.push({ name: 'confirmCargo' })"
            type="outline"
          >
            Confirm cargo
          </Button>
          <Button
            type="outline"
            @click="() => router.push({ name: 'uploadBill', params: { id } })"
          >
            Upload bill
          </Button>
        </div>
      </div>
    </div>
    <div class="max-w-full overflow-hidden dark:bg-jetDarkBg">
      <PTabView v-model:activeIndex="activeTabIndex" lazy class="w-full">
        <PTabPanel header="Shipment details" class="dark:bg-jetDarkBg">
          <Details />
        </PTabPanel>
        <PTabPanel header="Cargo details">
          <CargoDetails />
        </PTabPanel>
        <PTabPanel header="Bills">
          <Bills />
        </PTabPanel>
      </PTabView>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-tabview-panels) {
  padding: 0 !important;
}

@media (prefers-color-scheme: dark) {
  :deep(.p-tabview-panels) {
    background: #1e1e1e !important;
  }

  :deep(.p-tabview-nav) {
    background: #1e1e1e !important;
    color: #cbd5e1 !important;
  }

  :deep(.p-tabview-nav-link) {
    background: #1e1e1e !important;
    color: #cbd5e1 !important;
  }
}
</style>
