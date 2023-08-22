<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useShipmentsStore } from '@/stores/shipmentsStore'
import { useRouter, useRoute } from 'vue-router'

import Button from '../common/Button.vue'
import StatusBadge from '../StatusBadge.vue'
import { formatDate, formatNumber } from '@/utils/methods'

const router = useRouter()
const route = useRoute()
const shipmentStore = useShipmentsStore()
const { shipmentBills } = storeToRefs(shipmentStore)

withDefaults(
  defineProps<{
    bills: any[] | never[]
  }>(),
  {
    bills: () => [{ status: 'not_paid' }, { status: 'paid' }]
  }
)

const handleViewDoc = (url: string) => {
  window.open(url, '_blank', 'width=600,height=900')
}
</script>
<template>
  <div>
    <div
      v-if="!shipmentBills?.length"
      class="flex flex-col items-center justify-center mt-[40px]"
    >
      <div class="text-16 font-[500] text-jetBlack">No bills yet</div>
      <div class="mt-[8px] font-[400] text-14 text-secondary">
        Uploaded bills will appear here
      </div>

      <Button
        class="!w-[147px] mt-[24px]"
        type="outline"
        @click="
          () =>
            router.push({ name: 'uploadBill', params: { id: route.params.id } })
        "
        >Upload bill</Button
      >
    </div>
    <div v-else>
      <PAccordion
        expandIcon="pi pi-angle-down"
        collapseIcon="pi pi-angle-up"
        v-for="(bill, idx) in shipmentBills"
        :key="idx"
      >
        <PAccordionTab>
          <template #header>
            <div>
              <div
                class="text-16 font-[300] text-jetBlack dark:text-jetDarkText"
              >
                <span class="text-jetBlue font-[500]"
                  >#{{ bill.shipment_bill_id }} -
                </span>
                {{ bill.vendor_name }}
              </div>
              <div
                class="flex items-center text-14 text-jetBlack dark:text-jetDarkText font-[500] mt-[8px]"
              >
                Total -
                {{ bill.currency }}
                {{ bill.bill_amount ? formatNumber(bill.bill_amount) : '-' }}
                <StatusBadge :text="bill.payment_status" class="ml-[11px]" />
              </div>
            </div>
          </template>
          <div>
            <div class="flex">
              <div
                v-if="bill?.bill_payment"
                @click="
                  handleViewDoc(
                    bill?.bill_payment?.documents?.bill_payment_receipt[0]
                      .original_url
                  )
                "
                class="text-16 underline text-jetBlue cursor-pointer mr-[14px]"
              >
                View receipt
              </div>
              <div
                class="text-16 underline text-jetBlue cursor-pointer mr-[14px]"
                @click="
                  handleViewDoc(bill?.documents?.vendor_bill?.[0]?.original_url)
                "
              >
                View bill
              </div>
              <div
                v-if="!bill?.bill_payment"
                class="text-16 underline text-jetBlue cursor-pointer mr-[14px]"
                @click="
                  router.push({
                    name: 'editBill',
                    params: { id: route.params.id, billId: bill.id }
                  })
                "
              >
                Edit
              </div>
            </div>
            <div class="mt-[10px]">
              <div
                class="flex justify-between items-center text-14 font-[500] text-jetBlack dark:text-jetDarkText"
              >
                <div class="font-[500]">Date</div>
                <div class="font-[400]">
                  {{ formatDate(bill.created_at, 'full') }}
                </div>
              </div>
              <div
                class="flex justify-between items-center text-14 font-[500] text-jetBlack dark:text-jetDarkText mt-[10px]"
              >
                <div class="font-[500]">Uploaded By</div>
                <div class="font-[400]">{{ bill.uploaded_by || '-' }}</div>
              </div>
              <div
                class="font-[500] text-14 text-secondary dark:text-jetDarkSec mt-[10px]"
              >
                Service Breakdown
              </div>
              <div
                v-for="service in bill.services"
                :key="service.id"
                class="flex justify-between items-center text-14 font-[500] text-jetBlack dark:text-jetDarkText mt-[10px]"
              >
                <div class="font-[500]">{{ service.name }}</div>
                <div class="font-[400]">
                  {{ bill.currency }}
                  {{
                    service.pivot.amount
                      ? formatNumber(service.pivot.amount)
                      : ''
                  }}
                </div>
              </div>
            </div>
          </div>
        </PAccordionTab>
      </PAccordion>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-accordion-header) {
  border: none;
}
:deep(.p-accordion-header .p-accordion-header-link) {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0;
}

:deep(
    .p-accordion
      .p-accordion-header:not(.p-disabled).p-highlight
      .p-accordion-header-link
  ) {
  background-color: transparent;
  border: none;
}

:deep(.p-accordion-content) {
  border: none;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0;
}

:deep(
    .p-accordion
      .p-accordion-header:not(.p-highlight):not(.p-disabled):hover
      .p-accordion-header-link
  ) {
  background: transparent;
}

:deep(
    .p-accordion
      .p-accordion-header:not(.p-disabled)
      .p-accordion-header-link:focus
  ) {
  box-shadow: none;
}

:deep(.p-accordion-toggle-icon) {
  color: #b3bcd4;
  margin-top: -8px;
  position: absolute;
  right: 0.5em;
  top: 50%;
}

:deep(.p-accordion-header a) {
  padding-top: 12px !important;
  padding-bottom: 12px !important;
  background: #000;
}

:deep(.p-accordion-content) {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}

@media (prefers-color-scheme: dark) {
  :deep(.p-accordion-content) {
    border-bottom: 1px solid #334155;
  }

  :deep(.p-accordion-header .p-accordion-header-link) {
    border-bottom: 1px solid #334155;
  }

  :deep(.p-accordion-toggle-icon) {
    color: #646f8c;
  }

  :deep(.p-accordion-content) {
    background-color: #1e1e1e;
  }

  :deep(
      .p-accordion
        .p-accordion-header:not(.p-highlight):not(.p-disabled):hover
        .p-accordion-header-link
    ) {
    border-bottom: 1px solid #334155;
  }
}
</style>
