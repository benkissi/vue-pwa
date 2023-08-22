<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useShipmentsStore } from '@/stores/shipmentsStore'
import { formatDate } from '@/utils/methods'

const shipmentsStore = useShipmentsStore()
const { shipmentDetails } = storeToRefs(shipmentsStore)
</script>

<template>
  <div>
    <div
      class="flex items-center justify-between px-[20px] py-[17px] border-b dark:border-b-jetDarkBorder text-jetBlack dark:text-jetDarkText text-14"
    >
      <div class="font-[500]">Booking date</div>
      <div class="font-[300]">
        {{
          shipmentDetails?.booking_date
            ? formatDate(shipmentDetails?.booking_date, 'full')
            : '-'
        }}
      </div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] border-b dark:border-jetDarkBorder text-jetBlack dark:text-jetDarkText text-14"
    >
      <div class="font-[500]">Customer</div>
      <div class="font-[300]">
        {{
          shipmentDetails?.company.company_name
            ? shipmentDetails?.company.company_name
            : '-'
        }}
      </div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] border-b dark:border-jetDarkBorder text-jetBlack dark:text-jetDarkText text-14"
    >
      <div class="font-[500]">Shipper</div>
      <div class="font-[300]">
        {{
          shipmentDetails?.shipper_info.name
            ? shipmentDetails?.shipper_info.name
            : '-'
        }}
      </div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] border-b dark:border-jetDarkBorder text-jetBlack dark:text-jetDarkText text-14"
    >
      <div class="font-[500]">Consignee</div>
      <div class="font-[300]">
        {{
          shipmentDetails?.consignee_info.name
            ? shipmentDetails?.consignee_info.name
            : '-'
        }}
      </div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] border-b dark:border-jetDarkBorder text-jetBlack dark:text-jetDarkText text-14"
    >
      <div class="font-[500]">Origin Port</div>
      <div v-if="shipmentDetails?.origin" class="font-[300]">
        {{ shipmentDetails?.origin }},
        {{ shipmentDetails?.origin_details.country }}
      </div>
      <div class="font-[300]" v-else>-</div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] border-b dark:border-jetDarkBorder text-jetBlack dark:text-jetDarkText text-14"
    >
      <div class="font-[500]">Destination Port</div>
      <div v-if="shipmentDetails?.destination" class="font-[300]">
        {{ shipmentDetails?.destination }},
        {{ shipmentDetails?.destination_details.country }}
      </div>
      <div v-else class="font-[300]">-</div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] border-b dark:border-jetDarkBorder text-jetBlack dark:text-jetDarkText text-14"
    >
      <div class="font-[500]">Pick-up Date</div>
      <div class="font-[300]">
        {{
          shipmentDetails?.cargo_pickup_date
            ? formatDate(shipmentDetails?.cargo_pickup_date, 'full')
            : '-'
        }}
      </div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] border-b dark:border-jetDarkBorder text-jetBlack dark:text-jetDarkText text-14"
    >
      <div class="font-[500]">Departure Date</div>
      <div class="font-[300]">
        {{
          shipmentDetails?.departure
            ? formatDate(shipmentDetails?.departure, 'full')
            : '-'
        }}
      </div>
    </div>
  </div>
</template>
