<template>
  <ADialog
    :dialog-trigger="visibleSync"
    :hide-single-button="true"
    :custom-class="customClass"
    :title="title"
    :double-first-text="doubleFirstText"
    :double-second-text="doubleSecondText"
    width="360px"
    @click-first-button="submitLink(youtubeLinkFormRef)"
    @click-second-button="closeDialog"
    @close-dialog="closeDialog"
  >
    <el-form
      ref="youtubeLinkFormRef"
      :model="youtubeLinkForm"
      :rules="youtubeLinkRules"
      class="youtube-link-form mt-20"
      label-position="top"
      @submit.prevent
    >
      <el-form-item
        :label="$t('tiptap.youtube')"
        prop="link"
      >
        <el-input
          v-model="youtubeLinkForm.link"
          :placeholder="$t('placeholder.inputYoutube')"
          size="large"
          clearable
          @keyup.enter="submitLink(youtubeLinkFormRef)"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const youtubeLinkFormRef = ref<FormInstance>()

const { t } = useLocale()

const youtubeLinkForm = reactive({
  link: ''
})
const visibleSync = ref(false)

const validateLink = (_rule:any, value:any, callback:any) => {
  if (!value) {
    callback(new Error(t('validate.youtubeRequire')))
  } else if (!useUi().checkYoutubeLink(value)) {
    callback(new Error(t('validate.youtubeFormat')))
  } else {
    callback()
  }
}

const youtubeLinkRules = reactive<FormRules>({
  link: [{ required: true, validator: validateLink, trigger: 'blur' }]
})

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

const youtubeLinkDialogEmits = defineEmits([
  'close',
  'submit-link'
])

watchEffect(() => {
  visibleSync.value = youtubeLinkDialogProps.visible
})

const submitLink = async (formEl:FormInstance | undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid) => {
    if (valid) {
      youtubeLinkDialogEmits('submit-link', youtubeLinkForm.link)
      closeDialog(false)
      formEl.resetFields()
    } else {
      useAlarm().notify('', 'error', t('messages.failed'), true, 3000, 0)
    }
  })
}

const closeDialog = (trigger:boolean) => {
  youtubeLinkForm.link = ''
  youtubeLinkDialogEmits('close', trigger)
}

</script>
