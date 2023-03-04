<template>
  <div>
    <div class="blog-article flex flex-column flex-align-center">
      <LazyArticleHeader
        :data="articleData"
      />
      <LazyArticleAddOn
        :article-id="String(articleId)"
        :data="articleData"
        :activate-like="articleLike?.trigger"
        @update-count="updateLikeCount"
      />
      <div class="article-body mt-default" v-html="articleData.desc" />
      <LazyArticleComments
        :comment-title="$t('blog.commentTitle')"
        :comment-data="commentList"
        @delete-comment="openDeleteConfirmDialog"
      />
      <LazyCreateComment
        @create-comment="createComment"
      />
      <LazyLikeButton
        :trigger="displayFloatButtonTrigger"
        :activate-like="articleLike?.trigger"
        @click-affix="updateLikeCount"
      />
    </div>
    <LazyAuthCheckDialog
      :admin-trigger="deleteConfirmTrigger"
      :title="$t('messages.enterCommentPassword')"
      @confirm-password="deleteComment"
      @close-dialog="closeAuthCheckDialog"
    />
    <el-backtop :bottom="120" :right="30" />
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()
const route = useRoute()

const articleData = ref({
  title: '',
  desc: '',
  like: 0,
  createdAt: ''
})

useHead({
  title: 'Article',
  meta: [
    { property: 'description', content: articleData.value.desc },
    { property: 'og:title', content: articleData.value.title },
    { property: 'og:url', content: `https://dewdew.kr${route.path}` },
    { property: 'og:description', content: articleData.value.desc }
  ]
})

definePageMeta({
  layout: 'default'
})

const { y } = useWindowScroll()

const articleId = useRoute().params.id

const commentList = ref<CommentList[]>([])
const deleteCommentData = ref<CommentList>()
const displayFloatButtonTrigger = ref(false)
const deleteConfirmTrigger = ref(false)
const beforeParsingLike = ref('')
const articleLike = ref()
const writeIndex = ref(0)

watch(y, () => {
  y.value
    ? displayFloatButtonTrigger.value = true
    : displayFloatButtonTrigger.value = false
})

const initArticleConfig = async () => {
  if (process.client) {
    await getStorage(articleId)
      ? updateLikeData()
      : createLikeData()
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
    useAlarm().notify('', 'success', t('messages.commentWriteSuccess'), true, 1000, 0)
    initArticleConfig()
    loadArticleData()
  })
}

const openDeleteConfirmDialog = (comment:CommentList) => {
  deleteCommentData.value = comment
  deleteConfirmTrigger.value = true
}

const deleteComment = (password:string) => {
  deleteCommentData.value?.password === password
    ? deleteSequence(deleteCommentData.value.index)
    : rejectDeleteSequence()
}

const deleteSequence = (commentIndex:number) => {
  const copyComment = Object.assign([], commentList.value)
  const removeComment = copyComment.filter((comment:any) => { return comment.index !== commentIndex })
  const updateData = {
    method: 'addObject',
    root: 'comment',
    id: articleId,
    data: removeComment
  }
  useApi().postUpdateData('blog', updateData).then(() => {
    useAlarm().notify('', 'success', t('messages.commentDelete'), true, 1000, 0)
    initArticleConfig()
    loadArticleData()
  })
}

const rejectDeleteSequence = () => {
  closeAuthCheckDialog()
  useAlarm().notify('', 'error', t('messages.unAuthorizedComment'), true, 1000, 0)
}

const closeAuthCheckDialog = () => {
  deleteConfirmTrigger.value = false
}

const loadArticleData = () => {
  useApi().getSingleData('blog', 'client').then((res:any) => {
    commentList.value = []
    res.forEach((blog:BlogData) => {
      if (blog.id === articleId) {
        articleData.value.title = blog.title
        articleData.value.desc = blog.desc
        articleData.value.like = blog.like
        articleData.value.createdAt = new Date(blog.createdAt.seconds * 1000 + blog.createdAt.nanoseconds / 1000000).toLocaleString('ko-KR', { timeZone: 'UTC' })
        blog.comment.forEach((comment:CommentList) => {
          const commentData:CommentList = {
            ...comment,
            timeAgo: useTimeAgo(new Date(comment.createdAt.seconds * 1000 + comment.createdAt.nanoseconds / 1000000)),
            createdDate: new Date(comment.createdAt.seconds * 1000 + comment.createdAt.nanoseconds / 1000000)
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

const updateLikeData = () => {
  beforeParsingLike.value = getStorage(articleId) ?? ''
  articleLike.value = JSON.parse(beforeParsingLike.value)
}

const createLikeData = () => {
  setStorage(articleId, false)
  updateLikeData()
}

initArticleConfig()

</script>
