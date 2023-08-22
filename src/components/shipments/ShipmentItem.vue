<script setup lang="ts">
import type { IShipmentItem } from '@/interfaces'
import StatusBadge from '../StatusBadge.vue'

const emit = defineEmits(['click'])
defineProps<{ shipment: IShipmentItem }>()
</script>

<template>
  <div
    data-cy="shipmentItem"
    class="flex items-center justify-between py-[12px] border-b-[2px] border-b-gray-200 dark:border-b-jetDarkBorder"
    @click="emit('click', 'jsnxjsj')"
  >
    <div>
      <div class="font-[500] text-jetBlack mb-[5px]">
        <span class="font-[500] text-jetBlue">{{ shipment.booking_id }}</span>
        -
        <span class="dark:text-jetDarkSec">
          {{ shipment.company.company_name }}
        </span>
      </div>
      <div class="flex items-center text-jetSecondary font-[500] capitalize">
        {{ shipment.type }}
      </div>
    </div>
    <div>
      <StatusBadge :text="shipment.shipment_status" />
    </div>
  </div>
</template>
