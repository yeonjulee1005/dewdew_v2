<template>
  <div>
    <div class="blog-lists flex flex-column flex-justify-center flex-align-center">
      <div class="write-button-container flex flex-justify-end">
        <el-button
          class="write-blog"
          @click="openAdminCheckDialog"
        >
          {{ writeButtonText }}
        </el-button>
      </div>
      <el-timeline v-if="blogData.length" class="blog-timeline">
        <el-timeline-item
          v-for="item in blogData"
          :key="item.index"
          center
          :timestamp="item.timeAgo"
          :color="item.like > 10 ? '#C74436' : '#D3E3D2'"
          placement="top"
          @click="clickBlogArticle(item)"
        >
          <LazyCardComponent
            :card-item="item"
          />
        </el-timeline-item>
      </el-timeline>
      <el-empty v-else class="blog-timeline" description="글이 없네요..ㅠㅠ" />
    </div>
    <LazyAuthCheckDialog
      :admin-trigger="adminConfirmDialogTrigger"
      :title="'관리자 비밀번호를 입력해주세요!'"
      @confirm-password="openCreateArticleDialog"
      @close-dialog="closeAdminCheckDialog"
    />
    <LazyCreateArticleDialog
      :create-article-trigger="createArticleTrigger"
      :title="'글을 써보자!'"
      :article-index="writeIndex"
      @create-article="writeArticle"
      @close-dialog="closeCreateArticleDialog"
    />
  </div>
</template>
<script setup lang="ts" nuxt:static>

useHead({
  title: '블로그',
  meta: [
    { property: 'description', content: 'FE개발자 이연주의 개발 블로그 입니다.' },
    { property: 'og:title', content: '개발자 이연주 | 블로그' },
    { property: 'og:url', content: 'https://dewdew.kr/blog/' },
    { property: 'og:description', content: 'FE개발자 이연주의 개발 블로그 입니다.' }
  ]
})

definePageMeta({
  title: 'Blog'
})

const blogData = ref<BlogList[]>([])

const writeButtonText = ref('Write')
const writeIndex = ref(0)
const adminConfirmDialogTrigger = ref(false)
const createArticleTrigger = ref(false)

onMounted(() => {
  loadBlogData()
})

const clickBlogArticle = (selectBlog:any) => {
  const id = selectBlog.id
  useRouter().push({
    name: 'blog-id',
    params: { id }
  })
}

const openAdminCheckDialog = () => {
  adminConfirmDialogTrigger.value = true
}

const closeAdminCheckDialog = () => {
  adminConfirmDialogTrigger.value = false
}

const openCreateArticleDialog = (password:string) => {
  useDatabase().adminPassword.value === password
    ? createArticleTrigger.value = true
    : useAlarm().notify('', 'error', '어딜...감히..', true, 3000, 0)
}

const writeArticle = async (data:CreateArticle) => {
  await useApi().postAddData('blog/', data).then((res:any) => {
    if (res.id) {
      useAlarm().notify('', 'success', '글이 작성되었네용!!', true, 3000, 0)
      loadBlogData()
      closeAdminCheckDialog()
      closeCreateArticleDialog()
    } else {
      useAlarm().notify('', 'error', '글 작성이 실패했넹??', true, 3000, 0)
    }
  })
}

const closeCreateArticleDialog = () => {
  createArticleTrigger.value = false
}

const loadBlogData = async () => {
  await useApi().getSingleData('blog', 'client').then((res:any) => {
    blogData.value = []
    res.forEach((blog:BlogData) => {
      const processData = {
        ...blog,
        timeAgo: useTimeAgo(new Date(blog.createdAt.seconds * 1000 + blog.createdAt.nanoseconds / 1000000)),
        createdAt: new Date(blog.createdAt.seconds * 1000 + blog.createdAt.nanoseconds / 1000000)
      }
      blogData.value.push(processData)
    })
    writeIndex.value = blogData.value.length
  })
}

</script>
