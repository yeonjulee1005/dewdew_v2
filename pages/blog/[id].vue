<template>
  <NuxtLayout>
    <div class="blog-article flex flex-column flex-align-center">
      <AtomBlogArticleHeader
        :data="articleData"
      />
      <AtomBlogArticleAddOn
        :article-id="String(articleId)"
        :data="articleData"
        :activate-like="articleLike.trigger"
        @update-count="updateLikeCount"
      />
      <div class="article-body mt-default" v-html="articleData.desc" />
      <div class="article-comments mt-20">
        <el-timeline v-if="commentList.length">
          <el-timeline-item
            v-for="(activity, index) in commentList"
            :key="index"
            center
            :color="activity.timeAgo === 'just now' ? '#C74436' : '#D3E3D2'"
            :timestamp="activity.timeAgo"
          >
            <p> {{ activity.name }} </p>
            <p v-html="activity.message" />
          </el-timeline-item>
        </el-timeline>
        <el-empty v-else class="blog-timeline" description="댓글이 없네요..ㅠㅠ" />
      </div>
      <AtomTiptapTextEditor
        @update:model-value="updateArticle"
      />
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { BlogData } from '~/interfaces/types'

useHead({
  title: 'Article'
})

definePageMeta({
  title: 'Article'
})

const articleId = useRoute().params.id
const articleLike = useStorage(String(articleId), { id: articleId, trigger: false }, sessionStorage)
const articleData = ref({
  title: '',
  desc: '',
  like: 0,
  createdAt: ''
})
const commentList = ref<any[]>([])

onMounted(() => {
  setTimeout(() => {
    loadArticleData()
  }, 2)
})

const loadArticleData = async () => {
  commentList.value = []
  await useApi().getSingleData('blog').then((res:any) => {
    res.data.value.forEach((blog:BlogData) => {
      if (blog.id === articleId) {
        articleData.value.title = blog.article.title
        articleData.value.desc = blog.article.desc
        articleData.value.like = blog.article.like
        articleData.value.createdAt = new Date(blog.createdAt.seconds * 1000 + blog.createdAt.nanoseconds / 1000000).toLocaleString('ko-KR', { timeZone: 'UTC' })
        blog.article.comment.forEach((comment:any) => {
          const commentData = {
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

const updateLikeCount = async () => {
  const updateData = {
    method: 'increment',
    root: 'article.like',
    id: articleId,
    data: 0
  }
  articleLike.value.trigger
    ? updateData.data = -1
    : updateData.data = 1
  await useApi().postUpdateData('blog', updateData).then(() => {
    loadArticleData()
    articleLike.value.trigger
      ? articleLike.value.trigger = false
      : articleLike.value.trigger = true
    useAlarm().notify('', articleLike.value.trigger ? 'success' : 'error', '❤️', true, 1000, 0)
  })
}

const updateArticle = (article:string, _rawArticle:string) => {
  console.log(article)
}

</script>
