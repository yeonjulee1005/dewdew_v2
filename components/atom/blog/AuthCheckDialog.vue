<template>
  <MoleculesADialog
    :dialog-trigger="authCheckProps.adminTrigger"
    custom-class="auth-check-dialog"
    top="30vh"
    :width="360"
    @close-dialog="closeAuthCheckDialog"
  >
    <div class="title mb-20">
      {{ authCheckProps.title }}
    </div>
    <el-form
      ref="authKeyRef"
      :model="authKeyData"
      :rules="authKeyRules"
      :label-width="80"
      @submit.prevent
    >
      <el-form-item label="비밀번호" prop="password">
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
  </MoleculesADialog>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const authCheckProps = defineProps({
  adminTrigger: { type: Boolean, default: false },
  title: { type: String, default: '' }
})

const authCheckEmits = defineEmits([
  'confirm-password',
  'close-dialog'
])

const authKeyRef = ref<FormInstance>()
const authKeyData = reactive({
  password: ''
})

const validatePassword = (_rule:any, value:any, callback:any) => {
  const number = value.search(/[0-9]/g)
  const english = value.search(/[a-z]/g)
  const special = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
  if (value === '') {
    callback(new Error('비밀번호를 입력해주세요!'))
  } else if (number < 0 || english < 0 || special < 0) {
    return callback(new Error('비밀번호는 숫자, 영문, 특수문자가 섞여있죠?'))
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
      authCheckEmits('confirm-password', authKeyData.password)
    } else {
      useAlarm().notify('', 'warning', '비밀번호를 확인해주세요~', true, 3000, 0)
    }
  })
}

const closeAuthCheckDialog = () => {
  authCheckEmits('close-dialog')
}

</script>
