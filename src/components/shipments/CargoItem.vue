<script setup lang="ts">
import type { TCommodity } from '@/interfaces'

const emit = defineEmits(['click'])
defineProps<{
  commodity: TCommodity
  idx: number
}>()
</script>
<template>
  <div
    class="flex items-center justify-between py-[12px]"
    @click="emit('click', { commodity, idx })"
  >
    <div>
      <div class="font-[500] text-16 text-jetBlue">
        Cargo {{ idx + 1 }} - {{ commodity.commodity_type }}
      </div>
      <div
        class="flex items-center text-jetBlack dark:text-jetDarkText text-14 font-[500] mt-[8px]"
      >
        {{ commodity.container_type.replaceAll('-', ' ') }}
        <div class="w-[5px] h-[5px] bg-jetNeutral rounded-full mx-[6px]"></div>
        Quantity: {{ commodity.container_quantity }}
      </div>
    </div>
    <div>
      <i class="pi pi-angle-right dark:text-jetDarkSec"></i>
    </div>
  </div>
</template>
