<template>
  <div class="article-create-comment flex flex-column flex-align-end mb-40">
    <el-form
      ref="createCommentRef"
      class="create-form"
      :model="createCommentData"
      :rules="createArticleRules"
      :label-width="80"
      @submit.prevent
    >
      <el-form-item :label="createCommentProps.nameLabel" prop="name">
        <el-input
          v-model="createCommentData.name"
          :maxlength="16"
          show-word-limit
          clearable
        >
          <template #append>
            <el-button :icon="Refresh" @click="initCommentName" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="createCommentProps.contentLabel">
        <AtomTiptapTextEditor
          @update:model-value="updateArticle"
        />
      </el-form-item>
      <el-form-item :label="createCommentProps.passwordLabel" prop="password">
        <el-input
          v-model="createCommentData.password"
          type="password"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item class="submit-form-item">
        <el-button class="submit-button mt-20" type="primary" @click="submitArticle(createCommentRef)">
          {{ submitCommentButton }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { CreateComment } from '~/interfaces/types'
import { useDatabase } from '~/stores/database'

const createCommentProps = defineProps({
  nameLabel: { type: String, default: '이름' },
  contentLabel: { type: String, default: '내용' },
  passwordLabel: { type: String, default: '비밀번호' }
})

const createCommentEmits = defineEmits([
  'create-comment'
])

const createCommentRef = ref<FormInstance>()
const submitCommentButton = ref('댓글쓰기')

const createCommentData = ref<CreateComment>({
  name: '',
  message: '',
  password: ''
})

const validateName = (_rule:any, value:any, callback:any) => {
  if (value === '') {
    callback(new Error('이름을 입력해주세요!'))
  } else {
    if (value < 2) {
      return callback(new Error('이름은 2자 이상 입력해주세요!'))
    }
    callback()
  }
}

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

const createArticleRules = reactive<FormRules>({
  name: [{ required: true, validator: validateName, trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }]
})

onMounted(() => {
  initCommentName()
})

const initCommentName = () => {
  createCommentData.value.name = useDatabase().generateCommentName()
}

const updateArticle = (article:string, _rawArticle:string) => {
  createCommentData.value.message = article
}

const submitArticle = async (formEl:FormInstance|undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid, _fields) => {
    if (valid && createCommentData.value.message) {
      createCommentEmits('create-comment', createCommentData.value)
      setTimeout(() => {
        formEl.resetFields()
      }, 1000)
    } else {
      useAlarm().notify('', 'warning', '내용을 입력해주시죠..', true, 3000, 0)
    }
  })
}

</script>
