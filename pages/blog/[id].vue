<template>
  <NuxtLayout>
    <div class="blog-article">
      <div class="title">
        {{ articleData.title }}
      </div>
      <div class="body" v-html="articleData.desc" />
      {{ articleData }}
      {{ commentList }}
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useDatabase } from '~/stores/database'
import { BlogData } from '~/interfaces/types'

useHead({
  title: 'Article'
})

definePageMeta({
  title: 'Article'
})

const articleId = useRoute().params.id
const articleData = reactive({
  title: '',
  desc: '',
  like: 0,
  timeAgo: '',
  createdAt: ''
})
const commentList = ref<any[]>([])

useDatabase().blogData.value.forEach((blog:BlogData) => {
  if (blog.id === articleId) {
    articleData.title = blog.article.title
    articleData.desc = blog.article.desc
    articleData.like = blog.article.like
    // articleData.timeAgo = useTimeAgo(new Date(blog.createdAt.seconds * 1000 + blog.createdAt.nanoseconds / 1000000))
    // articleData.createdAt = new Date(blog.createdAt.seconds * 1000 + blog.createdAt.nanoseconds / 1000000)
    blog.article.comment.forEach((comment:any) => {
      const commentData = {
        message: comment.message,
        password: comment.password,
        timeAgo: useTimeAgo(new Date(comment.createdAt.seconds * 1000 + comment.createdAt.nanoseconds / 1000000)),
        createdAt: new Date(comment.createdAt.seconds * 1000 + comment.createdAt.nanoseconds / 1000000)
      }
      commentList.value.push(commentData)
    })
  }
})
console.log(articleData)
console.log(commentList.value)

</script>
