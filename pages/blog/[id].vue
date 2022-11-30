<template>
  <NuxtLayout>
    <div class="blog-article flex flex-column flex-align-center">
      <div class="article-header flex flex-row flex-space-between flex-align-end mb-20">
        <div class="title">
          {{ articleData.title }}
        </div>
        <div class="time">
          {{ articleData.createdAt }}
        </div>
      </div>
      <div class="article-add-on flex flex-justify-end mt-default mb-default">
        <el-tag class="like">
          {{ articleData.like + ' 👍🏻' }}
        </el-tag>
      </div>
      <div class="article-body mt-default" v-html="articleData.desc" />
      <div class="article-comments mt-20">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in commentList"
            :key="index"
            :timestamp="activity.timeAgo"
          >
            {{ activity.message }}
          </el-timeline-item>
        </el-timeline>
      </div>
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
const articleData = ref({
  title: '',
  desc: '',
  like: 0,
  createdAt: ''
})
const commentList = ref<any[]>([])

useDatabase().blogData.value.forEach((blog:BlogData) => {
  if (blog.id === articleId) {
    articleData.value.title = blog.article.title
    articleData.value.desc = blog.article.desc
    articleData.value.like = blog.article.like
    articleData.value.createdAt = new Date(blog.createdAt.seconds * 1000 + blog.createdAt.nanoseconds / 1000000).toLocaleString('ko-KR', { timeZone: 'UTC' })
    blog.article.comment.forEach((comment:any) => {
      const commentData = {
        index: comment.index,
        message: comment.message,
        password: comment.password,
        timeAgo: useTimeAgo(new Date(comment.createdAt.seconds * 1000 + comment.createdAt.nanoseconds / 1000000)),
        createdAt: new Date(comment.createdAt.seconds * 1000 + comment.createdAt.nanoseconds / 1000000)
      }
      commentList.value.push(commentData)
    })
  }
})
console.log(commentList.value)

</script>
