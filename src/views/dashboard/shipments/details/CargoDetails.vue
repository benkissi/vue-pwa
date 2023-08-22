<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useShipmentsStore } from '@/stores/shipmentsStore'

import { formatNumber } from '@/utils/methods'

const shipmentsStore = useShipmentsStore()
const { currentCommodity } = storeToRefs(shipmentsStore)
console.log('commodity', currentCommodity.value)
</script>

<template>
  <div v-if="!currentCommodity">No commodity selected</div>
  <div v-else>
    <div
      class="flex items-center justify-between px-20 py-16 bg-jetGrayLight dark:bg-[#252526] text-jetBlack text-14"
    >
      <div>
        <div class="font-[500] text-jetBlue text-16">
          Cargo {{ currentCommodity.idx + 1 }} -
          {{ currentCommodity.commodity.commodity_type }}
        </div>
        <div
          class="flex items-center text-jetBlack dark:text-jetDarkText text-14 font-[500] mt-[8px]"
        >
          {{ currentCommodity.commodity.container_type.replaceAll('-', ' ') }}
          <div
            class="w-[5px] h-[5px] bg-jetNeutral rounded-full mx-[6px]"
          ></div>
          Quantity: {{ currentCommodity.commodity.container_quantity }}
        </div>
      </div>

      <div
        v-if="currentCommodity.commodity.is_dangerous_good"
        class="flex items-center text-10 text-jetRed font-[500]"
      >
        <GIcons name="priority_high" class="text-12" />
        <div>Dangerous Cargo</div>
      </div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] text-jetBlack dark:text-jetDarkText"
    >
      <div class="font-[500] capitalize">Container type</div>
      <div class="font-[400] capitalize">
        {{ currentCommodity.commodity.container_type }}
      </div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] text-jetBlack dark:text-jetDarkText"
    >
      <div class="font-[500] capitalize">Quantity Required</div>
      <div class="font-[400] capitalize">
        {{ currentCommodity.commodity.container_quantity }}
      </div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] text-jetBlack dark:text-jetDarkText"
    >
      <div class="font-[500] capitalize">Set Temperature</div>
      <div
        class="font-[400] capitalize"
        v-if="currentCommodity.commodity.container_temperature"
      >
        {{ currentCommodity.commodity.container_temperature }}
        {{ currentCommodity.commodity.container_temperature_unit }}
      </div>
      <div class="font-[400]">-</div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] text-jetSecondary"
    >
      <div class="font-[500] capitalize">Container items</div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] text-jetBlack dark:text-jetDarkText"
    >
      <div class="font-[500] capitalize">Quantity</div>
      <div class="font-[400] capitalize">
        {{ formatNumber(currentCommodity.commodity.package_quantity) }}
      </div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] text-jetBlack dark:text-jetDarkText"
    >
      <div class="font-[500] capitalize">Type</div>
      <div class="font-[400] capitalize">
        {{ currentCommodity.commodity.package_type }}
      </div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] text-jetBlack dark:text-jetDarkText"
    >
      <div class="font-[500] capitalize">Commodity</div>
      <div class="font-[400] capitalize">
        {{ currentCommodity.commodity.commodity_type }}
      </div>
    </div>
    <div
      class="flex items-center justify-between px-[20px] py-[17px] text-jetBlack dark:text-jetDarkText"
    >
      <div class="font-[500] capitalize">Net weight</div>
      <div
        class="font-[400] capitalize"
        v-if="currentCommodity.commodity.weight"
      >
        {{ currentCommodity.commodity.weight }}
        {{ currentCommodity.commodity.weight_unit }}
      </div>
      <div v-else class="font-[400]">-</div>
    </div>

    <div
      v-if="currentCommodity.commodity.is_dangerous_good"
      class="flex items-center justify-between px-[20px] py-[17px] border-b text-jetBlack dark:text-jetDarkText"
    >
      <div class="font-[500] capitalize">UN Number</div>
      <div class="font-[400] capitalize">
        {{ currentCommodity.commodity.un_number }}
      </div>
    </div>

    <div
      v-if="currentCommodity.commodity.is_dangerous_good"
      class="flex items-center justify-between px-[20px] py-[17px] border-b text-jetBlack dark:text-jetDarkText"
    >
      <div class="font-[500] capitalize">IMO Class</div>
      <div class="font-[400] capitalize">
        {{ currentCommodity.commodity.imo_class }}
      </div>
    </div>

    <div
      class="flex items-center justify-between px-[20px] py-[17px] 1 text-jetBlack dark:text-jetDarkText"
    >
      <div class="font-[500] capitalize">Total Value</div>
      <div class="font-[400] uppercase">
        {{ currentCommodity.commodity.currency }}
        {{ formatNumber(currentCommodity.commodity.total_cargo_value) }}
      </div>
    </div>

    <div
      class="px-[20px] py-[17px] border-b dark:border-b-jetDarkBorder text-jetBlack dark:text-jetDarkText"
    >
      <div class="font-[500] capitalize">Notes</div>
      <div class="font-[400] capitalize mt-[7px]">
        {{ currentCommodity.commodity.notes || 'NA' }}
      </div>
    </div>
  </div>
</template>
