<template>
  <MoleculesADialog
    :dialog-trigger="createArticleProps.createArticleTrigger"
    custom-class="create-article-dialog"
    top="15vh"
    width="80vw"
    @close-dialog="closeCreateArticleDialog"
  >
    <div class="title ml-40 mb-20">
      {{ createArticleProps.title }}
    </div>
    <el-form
      ref="createArticleRef"
      :model="createArticleData"
      :rules="createArticleRules"
      :label-width="80"
      @submit.prevent
    >
      <el-form-item label="제목">
        <el-input
          v-model="createArticleData.title"
        />
      </el-form-item>
      <el-form-item label="컨텐츠">
        <AtomTiptapTextEditor
          :full-option="true"
          @update:model-value="updateArticle"
        />
      </el-form-item>
      <el-form-item class="submit-form-item">
        <el-button class="submit-button" type="primary" @click="submitArticle(createArticleRef)">
          {{ submitButtonText }}
        </el-button>
      </el-form-item>
    </el-form>
  </MoleculesADialog>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const createArticleProps = defineProps({
  createArticleTrigger: { type: Boolean, default: false },
  title: { type: String, default: '' },
  articleIndex: { type: Number, default: 0 }
})

const createArticleEmits = defineEmits([
  'create-article',
  'close-dialog'
])

const submitButtonText = ref('글쓰기!')
const createArticleRef = ref<FormInstance>()
const createArticleData = reactive({
  title: '',
  rawArticle: '',
  desc: '',
  like: 0,
  index: 0,
  comment: []
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

const createArticleRules = reactive<FormRules>({
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }]
})

const updateArticle = (article:string, rawArticle:string) => {
  createArticleData.desc = article
  createArticleData.rawArticle = rawArticle
  createArticleData.index = createArticleProps.articleIndex
}

const submitArticle = async (formEl:FormInstance|undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid, _fields) => {
    if (valid) {
      createArticleEmits('create-article', createArticleData)
    } else {
      useAlarm().notify('', 'warning', '비밀번호를 입력해주시죠..', true, 3000, 0)
    }
  })
}

const closeCreateArticleDialog = () => {
  createArticleEmits('close-dialog')
}

</script>
