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
      <AtomBlogCreateComment
        @create-comment="createComment"
      />
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { BlogData, CommentList, CreateComment } from '~/interfaces/types'

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
const writeIndex = ref(0)

const articleData = ref({
  title: '',
  desc: '',
  like: 0,
  createdAt: ''
})
const commentList = ref<CommentList[]>([])

onBeforeMount(() => {
  initArticleConfig()
})

const initArticleConfig = async () => {
  if (process.client) {
    await getStorage(articleId)
      ? beforeParsingLike.value = getStorage(articleId)
      : articleLike.value = setStorage(articleId, false)
    if (beforeParsingLike.value) {
      articleLike.value = JSON.parse(beforeParsingLike.value)
    }
    loadArticleData()
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
    useAlarm().notify('', !articleLike.value.trigger ? 'success' : 'error', '❤️', true, 1000, 0)
    articleLike.value.trigger
      ? setStorage(articleId, false)
      : setStorage(articleId, true)
    initArticleConfig()
    loadArticleData()
  })
}

const createComment = (comment:CreateComment) => {
  const commentData = {
    ...comment,
    index: writeIndex.value
  }
  const updateData = {
    method: 'addArray',
    root: 'comment',
    id: articleId,
    data: commentData
  }
  useApi().postUpdateData('blog', updateData).then(() => {
    useAlarm().notify('', articleLike.value.trigger ? 'success' : 'error', '❤️', true, 1000, 0)
    initArticleConfig()
    loadArticleData()
  })
}

const loadArticleData = async () => {
  await useApi().getSingleData('blog', 'client').then((res:any) => {
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
    writeIndex.value = commentList.value.length
  })
}

const getStorage = (articleId:string|string[]) => {
  return sessionStorage.getItem(String(articleId))
}

const setStorage = (articleId:string|string[], value:boolean) => {
  sessionStorage.setItem(String(articleId), JSON.stringify({ id: articleId, trigger: value }))
}
</script>
