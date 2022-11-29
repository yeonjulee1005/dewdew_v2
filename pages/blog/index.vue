<template>
  <NuxtLayout>
    <div class="blog-lists flex flex-column flex-justify-center flex-align-center">
      <div class="write-button-container flex flex-justify-end">
        <el-button
          class="write-blog"
          @click="openAdminCheckDialog"
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
    <AtomBlogAdminCheckDialog
      :admin-trigger="adminConfirmDialogTrigger"
      :title="'관리자 비밀번호를 입력해주세요!'"
      @confirm-password="openCreateArticleDialog"
      @close-dialog="closeAdminCheckDialog"
    />
    <AtomBlogCreateArticleDialog
      :create-article-trigger="createArticleTrigger"
      :title="'글을 써보자!'"
      :article-index="writeIndex"
      @create-article="writeArticle"
      @close-dialog="closeCreateArticleDialog"
    />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useDatabase } from '~/stores/database'
import { BlogList, CreateArticle } from '~/interfaces/types'

useHead({
  title: '블로그'
})

definePageMeta({
  title: 'Blog'
})

const blogData = ref<BlogList[]>([])
const selectBlogData = ref({})

const writeButtonText = ref('Write')
const adminConfirmDialogTrigger = ref(false)
const createArticleTrigger = ref(false)

const writeIndex = ref(useDatabase().blogData.value.length)

useDatabase().blogData.value.forEach((blog:any) => {
  const processData = {
    id: blog.id,
    index: blog.article.index,
    title: blog.article.title,
    rawArticle: blog.article.rawArticle,
    desc: blog.article.desc,
    like: blog.article.like,
    timeAgo: useTimeAgo(new Date(blog.createdAt.seconds * 1000 + blog.createdAt.nanoseconds / 1000000)),
    createdAt: new Date(blog.createdAt.seconds * 1000 + blog.createdAt.nanoseconds / 1000000),
    comment: blog.article.comment
  }
  blogData.value.push(processData)
})

const clickBlogArticle = (selectBlog:BlogList) => {
  selectBlogData.value = selectBlog
  console.log(selectBlogData.value)
}

const openAdminCheckDialog = () => {
  adminConfirmDialogTrigger.value = true
}

const closeAdminCheckDialog = () => {
  adminConfirmDialogTrigger.value = false
}

const openCreateArticleDialog = () => {
  createArticleTrigger.value = true
  adminConfirmDialogTrigger.value = false
}

const writeArticle = async (data:CreateArticle) => {
  await useApi().postAddData('blog/', data).then((res:any) => {
    if (res.data.value.result.type) {
      useAlarm().notify('', 'success', '글이 작성되었네용!!', true, 3000, 0)
      useRouter().push('/')
      closeCreateArticleDialog()
    } else {
      useAlarm().notify('', 'error', '글 작성이 실패했넹??', true, 3000, 0)
    }
  })
}

const closeCreateArticleDialog = () => {
  createArticleTrigger.value = false
}

</script>
