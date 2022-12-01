<template>
  <NuxtLayout>
    <div class="blog-article flex flex-column flex-align-center">
      <AtomBlogArticleHeader
        :data="articleData"
      />
      <AtomBlogArticleAddOn
        :article-id="String(articleId)"
        :data="articleData"
        :activate-like="articleLike?.trigger"
        @update-count="updateLikeCount"
      />
      <div class="article-body mt-default" v-html="articleData.desc" />
      <AtomBlogArticleComments
        :comment-title="commentTitle"
        :comment-data="commentList"
      />
      <div class="article-create flex flex-column flex-align-end mb-40">
        <AtomTiptapTextEditor
          @update:model-value="updateArticle"
        />
        <el-button class="mt-20">
          {{ submitMessageButton }}
        </el-button>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { BlogData, CommentList } from '~/interfaces/types'

useHead({
  title: 'Article'
})

definePageMeta({
  title: 'Article'
})

const articleId = useRoute().params.id
const beforeParsingLike = ref()
const articleLike = ref()
const commentTitle = ref('댓글')
const submitMessageButton = ref('댓글쓰기')

const articleData = ref({
  title: '',
  desc: '',
  like: 0,
  createdAt: ''
})
const commentList = ref<CommentList[]>([])

onMounted(() => {
  initArticleConfig()
  loadArticleData()
})

const initArticleConfig = () => {
  if (process.client) {
    getStorage(articleId)
      ? beforeParsingLike.value = getStorage(articleId)
      : articleLike.value = setStorage(articleId, false)
    articleLike.value = JSON.parse(beforeParsingLike.value)
  }
}

const updateLikeCount = async () => {
  const updateData = {
    method: 'increment',
    root: 'like',
    id: articleId,
    data: 0
  }
  articleLike.value.trigger
    ? updateData.data = -1
    : updateData.data = 1
  await useApi().postUpdateData('blog', updateData).then(() => {
    articleLike.value.trigger
      ? setStorage(articleId, false)
      : setStorage(articleId, true)
    loadArticleData()
    initArticleConfig()
    useAlarm().notify('', articleLike.value.trigger ? 'success' : 'error', '❤️', true, 1000, 0)
  })
}

const updateArticle = (article:string, _rawArticle:string) => {
  console.log(article)
}

const loadArticleData = async () => {
  await useApi().getSingleData('blog').then((res:any) => {
    commentList.value = []
    res.forEach((blog:BlogData) => {
      if (blog.id === articleId) {
        articleData.value.title = blog.title
        articleData.value.desc = blog.desc
        articleData.value.like = blog.like
        articleData.value.createdAt = new Date(blog.createdAt.seconds * 1000 + blog.createdAt.nanoseconds / 1000000).toLocaleString('ko-KR', { timeZone: 'UTC' })
        blog.comment.forEach((comment:any) => {
          const commentData:CommentList = {
            index: comment.index,
            name: comment.name,
            message: comment.message,
            password: comment.password,
            timeAgo: useTimeAgo(new Date(comment.createdAt.seconds * 1000 + comment.createdAt.nanoseconds / 1000000)),
            createdAt: new Date(comment.createdAt.seconds * 1000 + comment.createdAt.nanoseconds / 1000000)
          }
          commentList.value.push(commentData)
        })
      }
    })
  })
}

const getStorage = (articleId:string|string[]) => {
  return sessionStorage.getItem(String(articleId))
}

const setStorage = (articleId:string|string[], value:boolean) => {
  sessionStorage.setItem(String(articleId), JSON.stringify({ id: articleId, trigger: value }))
}
</script>
