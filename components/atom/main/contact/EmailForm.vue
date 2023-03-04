<template>
  <div class="email flex flex-column flex-align-center">
    <div class="email-title">
      {{ emailFormProps.formTitle }}
    </div>
    <el-form
      ref="contactRuleFormRef"
      :model="contactRuleForm"
      :rules="rules"
      label-width="120px"
      class="email-form mt-20"
      label-position="top"
    >
      <el-form-item
        label="Name"
        prop="name"
      >
        <el-input
          v-model="contactRuleForm.name"
          placeholder="성함을 입력해주세요."
        />
      </el-form-item>
      <el-form-item
        label="E-mail"
        prop="email"
      >
        <el-input
          v-model="contactRuleForm.email"
          placeholder="이메일을 입력해주세요."
          type="email"
        />
      </el-form-item>
      <el-form-item
        label="Message"
        prop="message"
      >
        <el-input
          v-model="contactRuleForm.message"
          placeholder="내용을 입력해주세요."
          :rows="5"
          :maxlength="2000"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          @click="submitForm(contactRuleFormRef)"
        >
          {{ createButtonText }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { send } from '@emailjs/browser'
import type { FormInstance, FormRules } from 'element-plus'

const createButtonText = ref('Create')
const contactRuleFormRef = ref<FormInstance>()
const contactRuleForm = reactive({
  name: '',
  email: '',
  message: ''
})

const emailFormProps = defineProps({
  formTitle: { type: String, default: '' },
  emailTemplate: { type: String, default: '' },
  emailKey: { type: String, default: '' }
})

const validateEmail = (_rule:any, value:any, callback:any) => {
  if (value === '') {
    callback(new Error('이메일을 입력해주세요.'))
  } else if (!useUi().checkEmail(value)) {
    return callback(new Error('이메일 형식을 확인해주세요.'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '이름을 입력해주세요.', trigger: 'blur' },
    { min: 2, max: 20, message: '이름은 2~20자 사이로 입력해주세요.', trigger: 'blur' }
  ],
  email: [
    { required: true, validator: validateEmail, trigger: 'blur' }
  ],
  message: [
    { required: true, message: '내용을 입력해주세요.', trigger: 'blur' },
    { min: 20, message: '내용은 20자 이상 입력해주세요.', trigger: 'blur' }
  ]
})

const submitForm = async (formEl:FormInstance|undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid) => {
    if (valid) {
      send('dewdew', emailFormProps.emailTemplate, contactRuleForm, emailFormProps.emailKey).then(() => {
        useAlarm().notify('', 'success', '이메일 발송에 성공하였습니다.', true, 3000, 0)
      }).catch(() => {
        useAlarm().notify('', 'error', '이메일 발송에 실패하였습니다.', true, 3000, 0)
      })
    } else {
      useAlarm().notify('', 'error', '이메일 발송에 실패하였습니다.', true, 3000, 0)
    }
  })
}

</script>
