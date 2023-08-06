<template>
  <LazyADialog
    :dialog-trigger="adminTrigger"
    :hide-double-button="true"
    :hide-single-button="true"
    custom-class="auth-check-dialog"
    top="30vh"
    width="360px"
    @close-dialog="closeDialog"
  >
    <div class="title mb-20">
      {{ title }}
    </div>
    <el-form
      ref="authKeyRef"
      :model="authKeyData"
      :rules="authKeyRules"
      :label-width="80"
      @submit.prevent
    >
      <el-form-item :label="$t('blog.password')" prop="password">
        <el-input
          v-model="authKeyData.password"
          type="password"
          show-password
          clearable
          class="mb-20"
          @keyup.enter="checkPassword(authKeyRef)"
        >
          <template #append>
            <el-button @click="checkPassword(authKeyRef)">
              <el-icon><Lock /></el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </LazyADialog>
</template>

<script setup lang="ts">

import type { FormInstance, FormRules } from 'element-plus'

const { t } = useLocale()

defineProps({
  adminTrigger: { type: Boolean, default: false },
  title: { type: String, default: '' }
})

const emits = defineEmits([
  'confirm-password',
  'close-dialog'
])

const authKeyRef = ref<FormInstance>()
const authKeyData = ref({
  password: ''
})

const validatePassword = (_rule:any, value:any, callback:any) => {
  const number = value.search(/[0-9]/g)
  const english = value.search(/[a-z]/g)
  const special = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
  if (value === '') {
    callback(new Error(t('validate.passwordEmpty')))
  } else if (number < 0 || english < 0 || special < 0) {
    return callback(new Error(t('validate.passwordFormat')))
  } else {
    callback()
  }
}

const authKeyRules = reactive<FormRules>({
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }]
})

const checkPassword = async (formEl:FormInstance|undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid, _fields) => {
    if (valid) {
      emits('confirm-password', authKeyData.value.password)
    } else {
      useAlarm().notify('', 'warning', t('validate.passwordCheck'), true, 3000, 0)
    }
  })
}

const closeDialog = () => {
  authKeyData.value.password = ''
  emits('close-dialog')
}

</script>
