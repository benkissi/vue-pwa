<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useToast } from 'primevue/usetoast'
import { useShipmentsStore } from '@/stores/shipmentsStore'

import GIcons from '@/components/GIcons.vue'
import TextInput from '@/components/common/TextInput.vue'
import CurrencyInput from '@/components/common/CurrencyInput.vue'
import SelectInput from '@/components/common/SelectInput.vue'
import Button from '@/components/common/Button.vue'
import Uploader from '@/components/common/Uploader.vue'
import TextArea from '@/components/common/TextArea.vue'
import Spinner from '@/components/common/Spinner.vue'

import { formatNumber } from '@/utils/methods'

import type { IFileData, IVendorsItem } from '@/interfaces'

interface IFormValues {
  invoiceNumber: string | undefined
  poNumber: string | undefined
  vendor: IVendorsItem | undefined
  lineItems: {
    id: string | undefined
    service_name: string
    amount: number | undefined
  }[]
  paymentMode: string
  notes: string | undefined
  currency: string | null
}

const route = useRoute()
const router = useRouter()
const toast = useToast()
const shipmentStore = useShipmentsStore()
const {
  vendors,
  currencies,
  shipmentDetails,
  uploadingBill,
  shipmentBills,
  updatingBill,
  fetchingVendors,
  fetchingCurrencies,
  fetchingShipmentDetails,
  fetchingBills
} = storeToRefs(shipmentStore)

const id = route.params.id
const billId = route.params.billId as string

const submitted = ref(false)
const files = ref<IFileData | null>(null)
const formValues = reactive<IFormValues>({
  invoiceNumber: '',
  poNumber: '',
  vendor: undefined,
  lineItems: [
    {
      id: '',
      service_name: '',
      amount: undefined
    }
  ],
  currency: 'GHS',
  paymentMode: '',
  notes: undefined
})

const rules = {
  invoiceNumber: { required },
  poNumber: { required },
  vendor: { required },
  lineItems: {
    $each: helpers.forEach({
      id: { required },
      service_name: {},
      amount: { required }
    })
  },
  paymentMode: { required },
  notes: {}
}

const v$ = useVuelidate(rules, formValues)

const loading = computed(() => {
  return (
    fetchingVendors.value ||
    fetchingCurrencies.value ||
    fetchingShipmentDetails.value ||
    fetchingBills.value
  )
})

const serviceOptions = computed(() => {
  let services: IVendorsItem['services'] = []
  if (formValues.vendor) {
    services = formValues.vendor.services
  }

  return services
})

const paymentOptions = computed(() => {
  let list: { label: string; value: string }[] = []

  if (formValues.vendor?.payment_modes) {
    let paymentModes = formValues.vendor?.payment_modes

    let options = paymentModes.payment_modes.map(
      (mode) => mode.payment_mode_type
    )

    //remove duplicates
    options = [...new Set(options)]
    list = options.map((item) => {
      let name = item.charAt(0).toUpperCase() + item.slice(1)
      name = name.replace('_', ' ')
      return { label: name, value: item }
    })
  }

  return list
})

const isEditMode = computed(() => {
  return !!billId
})

const currentBill = computed(() => {
  if (billId) {
    return shipmentBills.value?.find((item) => item.id === billId)
  }

  return null
})

const billDocs = computed(() => {
  if (billId) {
    const bill = shipmentBills.value?.find((item) => item.id === billId)
    return bill?.documents?.vendor_bill
  }

  return null
})

const handleSubmit = async (valid: boolean) => {
  v$.value.$touch()
  submitted.value = true

  if (!valid) {
    return
  }

  if (!files.value?.formData && !isEditMode.value) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Bill file is required.',
      life: 3000
    })

    return
  }
  const formData = new FormData()

  if (files.value?.formData) {
    for (const [key, value] of files.value.formData.entries()) {
      formData.append(key, value)
    }
  }

  formData.append('vendor_id', formValues.vendor?.id as string)
  formData.append('shipment_id', id as string)
  formData.append('invoice_number', formValues.invoiceNumber as string)
  formData.append('po_number', formValues.poNumber as string)
  formData.append('currency', formValues.currency as string)
  formData.append('bill_amount', JSON.stringify(lineTotal.value))
  formData.append('note', formValues.notes as string)
  formData.append(
    'company_name',
    shipmentDetails.value?.company.company_name as string
  )

  formData.append('payment_mode', formValues.paymentMode as string)

  formValues.lineItems.forEach((item) => {
    formData.append('bill_services[]', JSON.stringify(item))
  })

  if (isEditMode.value) {
    formData.append('_method', 'PUT')
  }

  console.log('payload----', formValues)

  for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`)
  }

  if (!isEditMode.value) {
    uploadBill(formData)
  } else {
    updateBill(formData)
  }
}

const uploadBill = async (formData: FormData) => {
  const res = await shipmentStore.uploadBill(formData, id as string)

  if (res.success) {
    toast.add({
      severity: 'success',
      summary: 'Upload Successful',
      detail: 'Bill uploaded successfully.',
      life: 3000
    })
    router.push({ name: 'shipmentDetails', params: { id } })
  } else {
    if (res.offline) {
      toast.add({
        severity: 'info',
        summary: res.error,
        detail:
          'Your request has been cached for automatic resend upon internet reconnection.'
      })
      router.push({ name: 'shipmentDetails', params: { id } })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Upload failed',
        detail: res.error,
        life: 3000
      })
    }
  }
}

const updateBill = async (formData: FormData) => {
  const res = await shipmentStore.updateBill(formData, billId, id as string)

  if (res.success) {
    toast.add({
      severity: 'success',
      summary: 'Update Successful',
      detail: 'Bill updated successfully.',
      life: 3000
    })
    router.push({ name: 'shipmentDetails', params: { id } })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Updated failed',
      detail: 'Bill updated failed.',
      life: 3000
    })
  }
}

const lineTotal = computed(() => {
  let total = 0
  formValues.lineItems.forEach((item) => {
    if (item.amount !== undefined) {
      total = total + item.amount
    }
  })
  return total
})

const getErrors = (field: any, label: string) => {
  if (!submitted.value || !v$.value[field].$error) return []
  if (v$.value[field].$errors.length) {
    return v$.value[field].$errors.map((error: any) => {
      return error.$message.replace('Value', label)
    })
  }
  return v$.value[field].required.$message.replace('Value', label)
}

const getLineErrors = (idx: number, field: string, label: string) => {
  if (!submitted.value) return ''
  const errors = v$.value.lineItems.$each.$response.$errors[idx][field].map(
    (error: any) => {
      return error.$message.replace('Value', label)
    }
  )

  return errors
}

const removeLineItem = (idx: number) => {
  formValues.lineItems.splice(idx, 1)
}

const addLineItem = () => {
  formValues.lineItems.push({
    id: '',
    service_name: '',
    amount: undefined
  })
}

const handleServiceChange = (
  event: { originalEvent: any; value: any },
  item: IFormValues['lineItems'][0]
) => {
  const id = event.value
  const service = serviceOptions.value.find((item) => item.id === id)

  if (service) {
    item.service_name = service.name
  }
}

onMounted(async () => {
  if (!shipmentDetails.value) {
    shipmentStore.fetchShipmentDetails(id as string)
  }

  if (!shipmentBills.value) {
    shipmentStore.fetchShipmentBills(id as string)
  }

  await shipmentStore.fetchVendors()
  await shipmentStore.fetchCurrencies()

  if (currentBill.value) {
    formValues.currency = currentBill.value.currency
    formValues.invoiceNumber = currentBill.value.invoice_number
    formValues.poNumber = currentBill.value.po_number as string
    formValues.paymentMode = currentBill.value.payment_mode as string
    formValues.notes = currentBill.value.note as string
    formValues.lineItems = currentBill.value.services.map((item) => {
      return {
        id: item.pivot?.service_id as string,
        service_name: item.pivot?.service_name as string,
        amount: item.pivot?.amount ? Number(item.pivot?.amount) : undefined
      }
    })
  }

  if (vendors.value?.data) {
    const currentVendor = vendors.value.data.find(
      (item) => item.id === currentBill.value?.vendor_id
    )
    formValues.vendor = currentVendor
  }
})
</script>

<template>
  <div v-if="loading" class="h-full w-full flex items-center justify-center">
    <Spinner />
  </div>
  <div v-else class="px-[20px] mt-[20px]">
    <div class="">
      <Uploader name="doc" @onFileSelected="(data) => (files = data)" />
    </div>

    <div v-if="isEditMode && !files?.fileNames.length" class="mt-[22px]">
      <div v-if="!billDocs" class="text-12 text-jetSecondary">
        No files uploaded
      </div>
      <div v-else>
        <div class="text-12 text-jetBlack mb-[6px]">Recently uploaded</div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div
              class="flex items-center justify-center bg-jetBlue/10 rounded-full p-1 mr-[7px]"
            >
              <GIcons name="description" class="text-jetBlue text-[20px]" />
            </div>
            <div>
              <div
                v-for="file in billDocs"
                :key="file.id"
                class="text-jetBlue font-[500] text-14"
              >
                {{ file.file_name }}
              </div>
            </div>
          </div>
          <!-- <GIcons
            name="close"
            class="text-jetRed cursor-pointer text-[20px]"
            @click="files = null"
          /> -->
        </div>
      </div>
    </div>

    <div v-else class="mt-[22px]">
      <div class="text-12 text-jetSecondary" v-if="!files?.fileNames.length">
        No files selected
      </div>
      <div v-else>
        <div class="text-12 text-jetBlack mb-[6px]">Selected file</div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div
              class="flex items-center justify-center bg-jetBlue/10 rounded-full p-1 mr-[7px]"
            >
              <GIcons name="description" class="text-jetBlue text-[20px]" />
            </div>
            <div>
              <div
                v-for="file in files?.fileNames"
                :key="file"
                class="text-jetBlue font-[500] text-14"
              >
                {{ file }}
              </div>
              <div class="text-neutral-300 text-12">
                {{ (files?.totalSize / 1000000).toFixed(3) }}MB
              </div>
            </div>
          </div>
          <GIcons
            name="close"
            class="text-jetRed cursor-pointer text-[20px]"
            @click="files = null"
          />
        </div>
      </div>
    </div>

    <div class="mt-[23px] border-b dark:border-b-jetDarkBorder pb-[24px]">
      <TextInput
        @input="v$.invoiceNumber.$touch"
        label="Invoice number"
        :errors="getErrors('invoiceNumber', 'Invoice number')"
        v-model="formValues.invoiceNumber"
        testId="invoiceNumber"
      />
      <TextInput
        label="PO number"
        class="mt-16"
        :errors="getErrors('poNumber', 'PO number')"
        v-model="formValues.poNumber"
        testId="poNumber"
      />
      <SelectInput
        label="Vendor"
        optionLabel="business_name"
        :list="vendors?.data || []"
        class="mt-16"
        :errors="getErrors('vendor', 'Vendor')"
        v-model="formValues.vendor"
        testId="vendor"
      />
    </div>

    <div class="mt-[10px] pb-[24px] border-b dark:border-b-jetDarkBorder">
      <div
        class="mb-[19px] [&:not(:first-child)]:border-t pt-[10px]"
        v-for="(item, idx) in formValues.lineItems"
        :key="idx"
      >
        <SelectInput
          label="Service description"
          @change="(event) => handleServiceChange(event, item)"
          optionLabel="name"
          optionValue="id"
          :list="serviceOptions"
          class="mt-16"
          :errors="getLineErrors(idx, 'id', 'Service')"
          v-model="item.id"
          testId="serviceDesc"
        />
        <CurrencyInput
          :currencyList="currencies"
          label="Amount"
          class="mt-16"
          :errors="getLineErrors(idx, 'amount', 'Amount')"
          v-model="item.amount"
          v-model:currency="formValues.currency"
          inputTestId="amount"
          currencyTestId="currency"
        />
        <div
          class="flex items-center w-fit mt-[16px] text-jetRed text-[12px]"
          @click="removeLineItem(idx)"
        >
          Cancel <GIcons name="close" class="text-[18px] ml-2" />
        </div>
      </div>

      <div
        class="flex items-center font-[600] text-jetGreen text-14 w-fit"
        @click="addLineItem"
      >
        <GIcons name="add" class="mr-1" /> Add another line item
      </div>
      <div
        class="text-16 text-jetBlack dark:text-jetDarkText font-[500] mt-[10px]"
      >
        Total:
        <span
          v-if="formValues.currency"
          class="uppercase text-16 text-jetBlack dark:text-jetDarkText font-[500]"
          >{{ formValues.currency }}</span
        >
        {{ formatNumber(lineTotal) }}
      </div>
    </div>

    <div class="">
      <SelectInput
        label="Mode of payment"
        optionLabel="label"
        optionValue="value"
        :list="paymentOptions"
        class="mt-16"
        :errors="getErrors('vendor', 'Vendor')"
        v-model="formValues.paymentMode"
        testId="mode"
      />

      <TextArea
        label="Notes"
        class="mt-16"
        :errors="getErrors('notes', 'Notes')"
        v-model="formValues.notes"
        testId="note"
      />
    </div>
    <div class="flex items-center justify-between my-[37px]">
      <Button
        @click="router.push({ name: 'shipmentDetails', params: { id } })"
        type="outline"
        color="danger"
        class="mr-[16px]"
        >Cancel</Button
      >
      <Button
        color="success"
        @click="handleSubmit(!v$.$invalid)"
        :loading="uploadingBill || updatingBill"
        >Save</Button
      >
    </div>
  </div>
</template>
