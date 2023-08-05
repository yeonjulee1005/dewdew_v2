<template>
  <LazyADialog
    :dialog-trigger="props.createArticleTrigger"
    :hide-double-button="true"
    :hide-single-button="true"
    custom-class="create-article-dialog"
    top="15vh"
    width="80vw"
    @close-dialog="emits('close-dialog')"
  >
    <div class="title ml-40 mb-20">
      {{ props.title }}
    </div>
    <el-form
      ref="createArticleRef"
      :model="createArticleData"
      :rules="createArticleRules"
      :label-width="80"
      @submit.prevent
    >
      <el-form-item :label="$t('blog.articleTitle')" prop="title">
        <el-input
          v-model="createArticleData.title"
        />
      </el-form-item>
      <el-form-item :label="$t('blog.article')">
        <LazyTextEditor
          :text-limit="300000"
          :full-option="true"
          @update:model-value="updateArticle"
        />
      </el-form-item>
      <el-form-item class="submit-form-item">
        <el-button class="submit-button" type="primary" @click="submitArticle(createArticleRef)">
          {{ $t('blog.write') }}
        </el-button>
      </el-form-item>
    </el-form>
  </LazyADialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useLocale()

const props = withDefaults(
  defineProps<{
    createArticleTrigger?: boolean,
    title?: string,
    articleIndex?: number
  }>(),
  {
    createArticleTrigger: false,
    title: '',
    articleIndex: 0
  }
)

const emits = defineEmits([
  'create-article',
  'close-dialog'
])

const createArticleRef = ref<FormInstance>()
const createArticleData = reactive({
  title: '',
  rawArticle: '',
  desc: '',
  like: 0,
  index: 0,
  comment: []
})

const createArticleRules = reactive<FormRules>({
  title: [{ required: true, message: t('validate.articleEmpty'), trigger: 'blur' }]
})

const updateArticle = (article:string, rawArticle:string) => {
  createArticleData.desc = article
  createArticleData.rawArticle = rawArticle
  createArticleData.index = props.articleIndex
}

const submitArticle = async (formEl:FormInstance|undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid, _fields) => {
    if (valid) {
      emits('create-article', createArticleData)
    } else {
      useAlarm().notify('', 'warning', t('validate.titleEmpty'), true, 3000, 0)
    }
  })
}

</script>
