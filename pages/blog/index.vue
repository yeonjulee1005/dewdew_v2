<template>
  <NuxtLayout>
    <div class="blog-lists flex flex-column flex-justify-center flex-align-center">
      <div class="write-button-container flex flex-justify-end">
        <el-button
          class="write-blog"
          @click="writeBlogButton"
        >
          {{ writeButtonText }}
        </el-button>
      </div>
      <el-timeline class="blog-timeline">
        <el-timeline-item
          v-for="item in blogData"
          :key="item.index"
          center
          :timestamp="item.timeAgo"
          :color="item.like > 10 ? '#C74436' : '#D3E3D2'"
          placement="top"
          @click="clickBlogArticle(item)"
        >
          <AtomBlogCardComponent
            :card-item="item"
          />
        </el-timeline-item>
      </el-timeline>
    </div>
    <MoleculesADialog
      :dialog-trigger="adminConfirmDialog"
      custom-class="admin-check-dialog"
      top="30vh"
      :width="300"
    >
      <div class="title mb-20">
        {{ adminConfirmTitle }}
      </div>
      <el-input v-model="writePassword" class="mb-20" @keyup.prevent.enter="checkPassword">
        <template #append>
          <el-button @click="checkPassword">
            <el-icon><Lock /></el-icon>
          </el-button>
        </template>
      </el-input>
    </MoleculesADialog>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useDatabase } from '~/stores/database'
import { BlogList } from '~/interfaces/types'

useHead({
  title: '블로그'
})

definePageMeta({
  title: 'Blog'
})

const config = useRuntimeConfig()

const blogData = ref<BlogList[]>([])
const selectBlogData = ref({})

const writePassword = ref('')
const writeButtonText = ref('Write')
const adminConfirmTitle = ref('관리자 비밀번호를 입력해주세요.')
const adminConfirmDialog = ref(false)

useDatabase().blogData.value.forEach((blog:any) => {
  const processData:BlogList = {
    id: blog.id,
    index: blog.article.index,
    title: blog.article.title,
    desc: blog.article.desc,
    like: blog.article.like,
    timeAgo: useTimeAgo(new Date(blog.article.createdAt.seconds * 1000 + blog.article.createdAt.nanoseconds / 1000)),
    createdAt: new Date(blog.article.createdAt.seconds * 1000 + blog.article.createdAt.nanoseconds / 1000),
    comment: blog.article.comment
  }
  blogData.value.push(processData)
})

const clickBlogArticle = (selectBlog:BlogList) => {
  selectBlogData.value = selectBlog
  console.log(selectBlogData.value)
}

const writeBlogButton = () => {
  adminConfirmDialog.value = true
}

const checkPassword = () => {
  if (config.public.ADMIN_PASSWORD === writePassword.value) {
    console.log('얼레? 맞는뎅?')
  }
}

// 아래는 add 로 문서 추가하는 것(이걸로 블로그 글 쓸거당)
// await useApi().postAddData('blog/', { desc: '내용3', index: 0, title: '제11목이댱' }).then((res:any) => {
//   console.log(res)
// })
</script>
