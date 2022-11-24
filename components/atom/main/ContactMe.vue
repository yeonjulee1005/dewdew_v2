<template>
  <div
    class="main-contact flex flex-column flex-align-center"
    :class="{'main-contact-on': contactProps.contactTrigger}"
  >
    <div class="contact-title mb-40">
      {{ contactProps.contactData.title }}
    </div>
    <div class="contact-lists flex flex-row flex-justify-center">
      <div class="kakaotalk flex flex-column flex-align-center flex-space-between">
        <div class="title mt-default mb-default">
          {{ contactProps.contactData.kakaoTalk.title }}
        </div>
        <nuxt-link
          :to="contactProps.contactData.kakaoTalk.url"
          class="image-group flex flex-column flex-align-center"
          target="_blank"
        >
          <el-image
            class="image mt-default mb-default"
            :src="contactProps.kakaoImage"
          />
          <div class="desc mt-default mb-default">
            {{ contactProps.contactData.kakaoTalk.desc }}
          </div>
        </nuxt-link>
        <div />
      </div>
      <div class="email flex flex-column flex-align-center">
        <div class="email-title">
          {{ contactProps.contactData.email.title }}
        </div>
        <el-form
          ref="contactRuleFormRef"
          :model="contactRuleFormR"
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
              v-model="contactRuleFormR.name"
              placeholder="입력해주세요."
            />
          </el-form-item>
          <el-form-item
            label="E-mail"
            prop="email"
          >
            <el-input
              v-model="contactRuleFormR.email"
              placeholder="입력해주세요."
              type="email"
            />
          </el-form-item>
          <el-form-item
            label="Message"
            prop="message"
          >
            <el-input
              v-model="contactRuleFormR.message"
              placeholder="입력해주세요."
              type="textarea"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="submit-button"
              type="primary"
              @click="submitForm(contactRuleFormRef)"
            >
              Create
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const contactRuleFormRef = ref<FormInstance>()
const contactRuleFormR = reactive({
  name: '',
  email: '',
  message: ''
})

const contactProps = defineProps({
  contactData: { type: Object, default: () => null },
  kakaoImage: { type: String, default: '' },
  contactTrigger: { type: Boolean, default: false }
})

const validateEmail = (_rule: any, value: any, callback: any) => {
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
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      formEl.resetFields()
      console.log('error submit!', fields)
    }
  })
}

</script>
