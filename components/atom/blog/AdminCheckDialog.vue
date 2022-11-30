<template>
  <MoleculesADialog
    :dialog-trigger="adminCheckProps.adminTrigger"
    custom-class="admin-check-dialog"
    top="30vh"
    :width="360"
    @close-dialog="closeAdminCheckDialog"
  >
    <div class="title mb-20">
      {{ adminCheckProps.title }}
    </div>
    <el-form
      ref="adminKeyRef"
      :model="adminKeyData"
      :rules="adminKeyRules"
      :label-width="80"
      @submit.prevent
    >
      <el-form-item label="비밀번호" prop="password">
        <el-input
          v-model="adminKeyData.password"
          type="password"
          show-password
          clearable
          class="mb-20"
          @keyup.enter="checkPassword(adminKeyRef)"
        >
          <template #append>
            <el-button @click="checkPassword(adminKeyRef)">
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
import { useDatabase } from '~/stores/database'

const adminCheckProps = defineProps({
  adminTrigger: { type: Boolean, default: false },
  title: { type: String, default: '' }
})

const adminCheckEmits = defineEmits([
  'confirm-password',
  'close-dialog'
])

const adminKeyRef = ref<FormInstance>()
const adminKeyData = reactive({
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

const adminKeyRules = reactive<FormRules>({
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }]
})

const checkPassword = async (formEl:FormInstance|undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid, _fields) => {
    if (valid) {
      useDatabase().adminPassword.value === adminKeyData.password
        ? adminCheckEmits('confirm-password')
        : useAlarm().notify('', 'error', '어딜...감히..', true, 3000, 0)
    } else {
      useAlarm().notify('', 'warning', '비밀번호를 입력해주시죠..', true, 3000, 0)
    }
  })
}

const closeAdminCheckDialog = () => {
  adminCheckEmits('close-dialog')
}

</script>
