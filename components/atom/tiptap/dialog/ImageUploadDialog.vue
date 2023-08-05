<template>
  <ADialog
    :dialog-trigger="visibleSync"
    :custom-class="customClass"
    :draggable="false"
    :hide-single-button="true"
    :title="title"
    :double-first-text="doubleFirstText"
    :double-second-text="doubleSecondText"
    width="360px"
    @click-first-button="submitImage"
    @click-second-button="closeDialog"
    @close-dialog="closeDialog"
  >
    <el-upload
      ref="imageUpload"
      class="upload-component flex flex-column mt-default mb-default"
      action="#"
      :limit="1"
      list-type="picture"
      :on-exceed="handleExceed"
      :http-request="changeImage"
    >
      <template #trigger>
        <el-tooltip
          :content="$t('texts.upload')"
          :offset="8"
          placement="bottom"
        >
          <Icon class="save-icon" icon="ri:upload-cloud-2-line" />
        </el-tooltip>
      </template>
      <template #file="{ file }">
        <div class="upload-file-information">
          <el-image
            class="upload-thumbnail"
            :src="file.url"
            alt="avatar"
          />
        </div>
      </template>
    </el-upload>
    <el-radio-group
      v-model="imageHyperLinkTrigger"
    >
      <el-radio :label="true" size="large">
        {{ $t('texts.insertLink') }}
      </el-radio>
      <el-radio :label="false" size="large">
        {{ $t('texts.noUse') }}
      </el-radio>
    </el-radio-group>
    <el-input
      v-if="imageHyperLinkTrigger"
      v-model="hyperLink"
      :placeholder="$t('placeholder.inputLink')"
      size="large"
      clearable
    />
  </ADialog>
</template>

<script setup lang="ts">
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'
import { Icon } from '@iconify/vue'

const imageUpload = ref<UploadInstance>()

const { t } = useLocale()

const exportUrl = ref('')
const hyperLink = ref('')
const imageHyperLinkTrigger = ref(false)
const visibleSync = ref(false)

const youtubeLinkDialogProps = withDefaults(
  defineProps<{
    visible?: boolean,
    customClass?: string,
    title?: string,
    doubleFirstText?: string,
    doubleSecondText?: string
  }>(),
  {
    visible: false,
    customClass: '',
    title: '',
    doubleFirstText: '',
    doubleSecondText: ''
  }
)

const imageUploadDialogEmits = defineEmits([
  'close',
  'submit-image'
])

watchEffect(() => {
  visibleSync.value = youtubeLinkDialogProps.visible
})

const genUid = () => {
  return (new Date().getTime() + Math.random().toString(36).substring(2, 16))
}

const downloadImage = (imageName:string) => {
  if (!imageName) { return }
  /**
   * ! image url download process !
   * @exportUrl 텍스트 에디터로 전달할 이미지 경로
  */
  exportUrl.value = imageName
}

const changeImage = async (evt:any) => {
  if (!fileValidation(evt.file.size, evt.file.type)) {
    imageUpload.value!.clearFiles()
    return
  }
  const file = evt.file
  const fileExt = file.name.split('.').pop()
  const filePath = `${genUid()}.${fileExt}`
  /**
   * ! file upload process !
   * ? evt.file : 이미지 파일 ?
   * ? filePath : 파일 경로 ?
  */
  await downloadImage(filePath)
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  fileValidation(files[0].size, files[0].type)
  imageUpload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  imageUpload.value!.handleStart(file)
}

const fileValidation = (size:number, type:string) => {
  let fileType = false
  type === 'image/jpeg' || type === 'image/png' || type === 'image/webp' || type === 'image/svg+xml' ? fileType = true : fileType = false
  if (!fileType) {
    return fileFailedProcess(t('validate.imageUploadFormat'))
  } else if (size / 1024 / 1024 > 5) {
    return fileFailedProcess(t('validate.imageUploadSmallSize'))
  } else {
    return true
  }
}

const fileFailedProcess = (message:string) => {
  useAlarm().notify('', 'warning', message, true, 3000, 0)
  imageUpload.value!.clearFiles()
  return false
}

const submitImage = () => {
  if (!exportUrl.value) {
    return
  }
  useAlarm().notify('', 'error', '이미지 업로드는 구현 예정이에요.', true, 3000, 0)
  // imageUploadDialogEmits('submit-image', exportUrl.value, imageHyperLinkTrigger.value ? hyperLink.value : '')
  closeDialog(false)
}

const closeDialog = (trigger:boolean) => {
  exportUrl.value = ''
  imageUploadDialogEmits('close', trigger)
}

</script>
