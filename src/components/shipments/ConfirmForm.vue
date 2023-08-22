<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useToast } from 'primevue/usetoast'
import { useShipmentsStore } from '@/stores/shipmentsStore'

import TextInput from '../common/TextInput.vue'
import TextArea from '../common/TextArea.vue'
import NumberInput from '../common/NumberInput.vue'
import SelectInput from '../common/SelectInput.vue'
import RadioInput from '../common/RadioInput.vue'
import Button from '../common/Button.vue'
import GIcons from '../GIcons.vue'

import Uploader from '@/components/common/Uploader.vue'

import type { TCommodity, IFileData } from '@/interfaces'

const router = useRouter()
const toast = useToast()
const shipmentsStore = useShipmentsStore()
const { packageTypes, weightUnits, confirmingCargo } =
  storeToRefs(shipmentsStore)
const props = defineProps<{ item: TCommodity }>()

const disabled = ref(props.item.is_completed)
const files = ref<IFileData | null>()
const formValues = reactive<{
  commodityName: string | undefined
  packageType: string | undefined
  quantity: number | undefined
  weight: number | undefined
  weightUnit: string | undefined
  condition: string | undefined
  info: string | undefined
}>({
  commodityName: props.item.commodity_type,
  packageType: props.item.package_type,
  quantity: props.item.package_quantity,
  weight: props.item.weight ? Number(props.item.weight) : 0,
  weightUnit: props.item.weight_unit,
  info: props.item.description,
  condition: props.item.cargo_condition
})

const rules = {
  commodityName: { required },
  packageType: { required },
  quantity: { required },
  weight: {},
  weightUnit: {},
  condition: { required },
  info: { required }
}

const submitted = ref(false)
const isEditMode = ref(props.item.is_completed)
const v$ = useVuelidate(rules, formValues)

const images = computed(() => {
  if (props.item.documents?.confirmed_cargo_image) {
    return props.item.documents?.confirmed_cargo_image
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

  formData.append('shipment_id', props.item.shipment_id as string)
  formData.append('cargo_id', props.item.cargoId as string)
  formData.append(
    'confirmed_cargo_details[description]',
    formValues.info as string
  )
  formData.append(
    'confirmed_cargo_details[weight]',
    formValues.weight?.toString() as string
  )
  formData.append(
    'confirmed_cargo_details[weight_unit]',
    formValues.weightUnit?.toString() as string
  )
  formData.append(
    'confirmed_cargo_details[package_quantity]',
    formValues.quantity?.toString() as string
  )

  formData.append(
    'confirmed_cargo_details[commodity_detail_id]',
    props.item.commodityId as string
  )

  formData.append('confirmed_cargo_details[is_completed]', 'true')
  formData.append(
    'confirmed_cargo_details[package_type]',
    formValues.packageType as string
  )
  formData.append(
    'confirmed_cargo_details[cargo_condition]',
    formValues.condition as string
  )
  formData.append(
    'confirmed_cargo_details[commodity_type]',
    formValues.commodityName as string
  )

  if (files.value?.formData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [key, value] of files.value.formData.entries()) {
      formData.append('confirmed_cargo_details[images][]', value)
    }
  }

  for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`)
  }

  if (props.item.is_completed) {
    formData.append('_method', 'PUT')
  }

  let res

  if (isEditMode.value) {
    res = await shipmentsStore.updateConfirmCargo(
      formData,
      props.item?.confirmed_cargo_id as string,
      props.item.id,
      props.item.shipment_id
    )
  } else {
    res = await shipmentsStore.confirmCargo(formData, props.item.shipment_id)
  }

  if (res.success) {
    toast.add({
      severity: 'success',
      summary: isEditMode.value ? 'Update successful' : 'Cargo Confirmed',
      detail: isEditMode.value
        ? 'Confirmation updated successfully'
        : 'Cargo confirmed successfully.',
      life: 3000
    })
    router.push({
      name: 'shipmentDetails',
      params: { id: props.item.shipment_id }
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: res.error
    })
  }
}

const getErrors = (field: any, label: string) => {
  if (!submitted.value || !v$.value[field].$error) return []
  if (v$.value[field].$errors.length) {
    return v$.value[field].$errors.map((error: any) => {
      return error.$message.replace('Value', label)
    })
  }
  return v$.value[field].required.$message.replace('Value', label)
}

onMounted(() => {
  console.log('form-----values', formValues)
})
</script>

<template>
  <div class="pt-[16px]">
    <TextInput
      label="Commodity name"
      :errors="getErrors('commodityName', 'Commodity name')"
      v-model="formValues.commodityName"
      :disabled="disabled"
      placeholder="Commodity name"
    />

    <SelectInput
      label="Package type"
      :list="packageTypes || []"
      optionLabel="label"
      optionValue="value"
      class="mt-16"
      :errors="getErrors('packageType', 'Package type')"
      v-model="formValues.packageType"
      :disabled="disabled"
    />
    <NumberInput
      label="Quantity"
      class="mt-16"
      :errors="getErrors('quantity', 'Quantity')"
      v-model="formValues.quantity"
      :disabled="disabled"
      placeholder="Quantity"
    />

    <div class="grid gap-5 grid-cols-2 items-center mt-16">
      <NumberInput
        label="Net Weight"
        class="w-full"
        :errors="getErrors('weight', 'Weight')"
        v-model="formValues.weight"
        :decimals="2"
        :disabled="true"
        placeholder="Net Weight"
      />
      <SelectInput
        label="Weight Unit"
        :list="weightUnits || []"
        optionLabel="label"
        optionValue="value"
        class="w-full"
        :errors="getErrors('weightUnit', 'Weight Unit')"
        v-model="formValues.weightUnit"
        :disabled="true"
      />
    </div>

    <div class="mt-16">
      <div
        class="text-14 font-[500] mb-[12px] text-jetBlack dark:text-jetDarkText"
      >
        Condition
      </div>

      <div class="grid grid-cols-2 gap-5">
        <RadioInput
          @click="formValues.condition = 'Good'"
          label="Good"
          :selected="formValues.condition === 'Good'"
          :disabled="disabled"
        />
        <RadioInput
          @click="formValues.condition = 'Bad'"
          label="Bad"
          :selected="formValues.condition === 'Bad'"
          :disabled="disabled"
        />
      </div>
      <small class="text-jetRed">{{
        getErrors('condition', 'Condition').join(', ')
      }}</small>
    </div>

    <TextArea
      class="mt-16"
      label="Additional information"
      :errors="getErrors('info', 'Additional information')"
      v-model="formValues.info"
      :disabled="disabled"
      placeholder="Additional information"
    />

    <div class="mt-[16px]">
      <div
        class="text-14 font-[500] mb-[12px] text-jetBlack dark:text-jetDarkText"
      >
        Upload cargo image
      </div>
      <Uploader
        :disabled="disabled"
        name="file[]"
        @onFileSelected="(data) => (files = data)"
      />

      <div
        v-if="item.is_completed && !files?.fileNames.length"
        class="mt-[16px]"
      >
        <div
          v-if="images"
          class="text-12 text-jetBlack dark:text-jetDarkText mb-[6px]"
        >
          Recently uploaded
        </div>
        <div v-else class="text-12 text-jetSecondary">No files uploaded</div>

        <div class="flex items-center">
          <div
            class="flex items-center justify-center bg-jetBlue/10 rounded-full p-1 mr-[7px]"
          >
            <GIcons name="description" class="text-jetBlue text-[20px]" />
          </div>
          <div>
            <div
              v-for="file in images"
              :key="file.id"
              class="text-jetBlue font-[500] text-14"
            >
              {{ file.file_name }}
            </div>
          </div>
        </div>
      </div>

      <div v-else class="mt-[16px]">
        <div
          class="text-12 text-jetSecondary dark:text-jetDarkSec"
          v-if="!files?.fileNames.length"
        >
          No files selected
        </div>
        <div v-else>
          <div class="text-12 text-jetBlack dark:text-jetDarkText mb-[6px]">
            Selected file
          </div>
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
                <div
                  v-if="files?.totalSize"
                  class="text-neutral-300 dark:text-jetDarkSec text-12"
                >
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
    </div>

    <Button
      v-if="!disabled"
      @click="handleSubmit(!v$.$invalid)"
      class="mt-[40px] w-[50%] mx-auto"
      type="outline"
      color="success"
      :loading="confirmingCargo"
      >Confirm</Button
    >
    <Button
      v-if="disabled"
      @click="disabled = false"
      class="mt-[40px] w-[50%] mx-auto"
      type="outline"
      color="success"
      >Update</Button
    >
  </div>
</template>
