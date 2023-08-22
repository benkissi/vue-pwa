<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import FileUpload from 'primevue/fileupload'
import GIcons from '../GIcons.vue'
import { filesToFormData } from '@/utils/methods'

import type { IFile } from '@/interfaces'

const emit = defineEmits(['onFileSelected'])
const props = withDefaults(
  defineProps<{
    maxSize?: number
    name?: string
    accept?: string
    multiple?: false
    disabled?: boolean
  }>(),
  {
    maxSize: 100000000,
    name: 'docs[]',
    accept: 'image/*, .pdf',
    multiple: false,
    disabled: false
  }
)

const uploaderRef = ref<{ choose: Function } | null>(null)

const handleSelectFile = () => {
  if (uploaderRef?.value) {
    uploaderRef?.value.choose()
  }

  console.log(uploaderRef.value)
}

const onFileSelect = (file: IFile) => {
  const data = filesToFormData(props.name, file)
  console.log('files', file)
  emit('onFileSelected', data)
}
</script>

<template>
  <div
    @click="handleSelectFile"
    data-cy="uploaderDiv"
    class="relative flex flex-col items-center border border-dashed rounded border-jetBlue px-[34px] py-[19px] w-full"
  >
    <div class="flex flex-col items-center">
      <GIcons name="photo_camera" class="text-jetNeutral mb-[12px]" />
      <div
        class="font-[500] text-[14px] text-jetBlack dark:text-jetDarkText text-center"
      >
        Upload from camera or
        <span class="text-jetBlue font-[500] text-[14px] underline"
          >Choose</span
        >

        to upload
      </div>
      <FileUpload
        ref="uploaderRef"
        mode="basic"
        chooseLabel="choose"
        class="invisible !absolute"
        :customUpload="true"
        :name="name"
        :accept="accept"
        :maxFileSize="maxSize"
        :auto="true"
        :multiple="multiple"
        :disabled="disabled"
        @uploader="(file: unknown) => onFileSelect(file as IFile)"
      />
    </div>
  </div>
</template>
