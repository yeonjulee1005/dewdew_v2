<template>
  <div>
    <div class="blog-lists flex flex-column flex-justify-center flex-align-center">
      <div class="write-button-container flex flex-justify-end">
        <el-button
          class="write-blog"
          @click="openAdminCheckDialog"
        >
          {{ $t('blog.write') }}
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
      <el-empty v-else class="blog-timeline" :description="$t('messages.emptyArticle')" />
    </div>
    <LazyAuthCheckDialog
      :admin-trigger="adminConfirmDialogTrigger"
      :title="$t('messages.enterPassword')"
      @confirm-password="openCreateArticleDialog"
      @close-dialog="closeAdminCheckDialog"
    />
    <LazyCreateArticleDialog
      :create-article-trigger="createArticleTrigger"
      :title="$t('messages.writeArticle')"
      :article-index="writeIndex"
      @create-article="writeArticle"
      @close-dialog="closeCreateArticleDialog"
    />
  </div>
</template>

<script setup lang="ts" nuxt:static>

const { t } = useLocale()

useHead({
  title: t('pageTitle.blog'),
  meta: [
    { property: 'description', content: t('pageTitle.blogDesc') },
    { property: 'og:title', content: t('pageTitle.blogOgTitle') },
    { property: 'og:url', content: 'https://dewdew.kr/blog/' },
    { property: 'og:description', content: t('pageTitle.blogDesc') }
  ]
})

definePageMeta({
  layout: 'default'
})

const blogData = ref<BlogList[]>([])

const writeIndex = ref(0)
const adminConfirmDialogTrigger = ref(false)
const createArticleTrigger = ref(false)

onMounted(() => {
  loadBlogData()
})

const clickBlogArticle = (selectBlog:any) => {
  navigateTo(`/blog/${selectBlog.id}`)
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
    : useAlarm().notify('', 'error', t('messages.unAuthorizedWrite'), true, 3000, 0)
}

const writeArticle = async (data:CreateArticle) => {
  await useApi().postAddData('blog/', data).then((res:any) => {
    if (res.id) {
      useAlarm().notify('', 'success', t('messages.writeSuccess'), true, 3000, 0)
      loadBlogData()
      closeAdminCheckDialog()
      closeCreateArticleDialog()
    } else {
      useAlarm().notify('', 'error', t('messages.writeFailed'), true, 3000, 0)
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
