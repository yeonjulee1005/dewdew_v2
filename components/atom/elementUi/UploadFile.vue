<template>
  <el-upload
    :drag="uploadFileProps.draggable"
    :file-list="fileList"
    :class="uploadFileProps.customClass"
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
        {{ uploadFileProps.fileTypeAlarm.concat(', ', uploadFileProps.fileSizeAlarm) }}
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import type { UploadProps } from 'element-plus'

const fileList = ref<UploadProps[]>([])
const previewFile = ref('')

const uploadFileProps = defineProps({
  draggable: { type: Boolean, default: true },
  // imageData: { type: String, default: '' },
  customClass: { type: String, default: 'upload-drag-files' },
  fileTypeAlarm: { type: String, default: '' },
  fileSizeAlarm: { type: String, default: '' },
  limitType: { type: Array, default: () => ['image/jpeg', 'image/jpg'] },
  limitWidth: { type: Number, default: 0 },
  limitHeight: { type: Number, default: 0 },
  limitSize: { type: Number, default: 0 }
})

// const uploadFileEmits = defineEmits([
//   'upload'
// ])

const changeBadgeImage: UploadProps['onChange'] = (file:any) => {
  let fileType = false
  uploadFileProps.limitType.includes(file.raw?.type) ? fileType = true : fileType = false
  if (!fileType) {
    useAlarm().notify('', 'warning', uploadFileProps.fileTypeAlarm, true, 3000, 0)
    fileList.value = []
  } else if (file?.size / uploadFileProps.limitHeight / uploadFileProps.limitWidth > uploadFileProps.limitSize) {
    useAlarm().notify('', 'warning', uploadFileProps.fileSizeAlarm, true, 3000, 0)
    fileList.value = []
  } else {
    previewFile.value = URL.createObjectURL(file.raw!)
  }
  // uploadFileEmits('upload', file.raw)
}

</script>
