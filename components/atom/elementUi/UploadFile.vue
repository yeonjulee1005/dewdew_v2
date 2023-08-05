<template>
  <el-upload
    :drag="props.draggable"
    :file-list="fileList"
    :class="props.customClass"
    action="fileUrl"
    :show-file-list="false"
    :auto-upload="false"
    :multiple="false"
    :on-change="changeBadgeImage"
  >
    <div v-if="previewFile">
      <nuxt-img
        class="image-preview"
        :src="previewFile"
        width="300"
        height="200"
        fit="cover"
        alt="image-prev"
      />
    </div>
    <el-icon
      v-else
      class="el-icon--upload flex-column"
    >
      <Upload-filled />
      <div class="el-upload__text">
        {{ $t('colorsTranslate.uploadFile') }}
        <span class="accent">
          {{ $t('colorsTranslate.dropperDesc') }}
        </span>
        {{ $t('colorsTranslate.checkDropper') }}
      </div>
    </el-icon>
    <template #tip>
      <div class="el-upload__tip">
        {{ props.fileTypeAlarm.concat(', ', props.fileSizeAlarm) }}
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import type { UploadProps } from 'element-plus'

const fileList = ref<UploadProps[]>([])
const previewFile = ref('')

const limitType = ['image/jpeg', 'image/jpg']

const props = withDefaults(
  defineProps<{
    draggable?: boolean,
    // imageData?: string,
    customClass?: string,
    fileTypeAlarm?: string,
    fileSizeAlarm?: string,
    limitWidth?: number,
    limitHeight?: number,
    limitSize?: number
  }>(),
  {
    draggable: true,
    // imageData: '',
    customClass: 'upload-drag-files',
    fileTypeAlarm: '',
    fileSizeAlarm: '',
    limitWidth: 0,
    limitHeight: 0,
    limitSize: 0
  }
)

// const emits = defineEmits([
//   'upload'
// ])

const changeBadgeImage: UploadProps['onChange'] = (file:any) => {
  let fileType = false
  limitType.includes(file.raw?.type) ? fileType = true : fileType = false
  if (!fileType) {
    useAlarm().notify('', 'warning', props.fileTypeAlarm, true, 3000, 0)
    fileList.value = []
  } else if (file?.size / props.limitHeight / props.limitWidth > props.limitSize) {
    useAlarm().notify('', 'warning', props.fileSizeAlarm, true, 3000, 0)
    fileList.value = []
  } else {
    previewFile.value = URL.createObjectURL(file.raw!)
  }
  // emits('upload', file.raw)
}

</script>
