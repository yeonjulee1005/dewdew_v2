<template>
  <div>
    <el-button class="prev-button" round @click="routerBack">
      {{ $t('archives.back') }}
    </el-button>
    <LazyImageSlider
      :image-data="imageData"
      :inner-archive-trigger="true"
      @open-dialog="openImageDialog"
    />
    <ADialog
      :dialog-trigger="imageDialogTrigger"
      @close-dialog="closeImageDialog"
    >
      <nuxt-picture
        :src="selectImageData?.url"
        format="webp"
        fit="cover"
        :img-attrs="{style: 'width: 100%'}"
        :alt="selectImageData?.title"
      />
    </ADialog>
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()
const route = useRoute()

useHead({
  title: t('title.archives'),
  meta: [
    { property: 'description', content: t('title.archivesDesc') },
    { property: 'og:title', content: t('title.archivesOgTitle') },
    { property: 'og:url', content: `https://dewdew.kr${route.path}` },
    { property: 'og:description', content: t('title.archivesDesc') }
  ]
})

definePageMeta({
  pageTransition: false,
  layout: 'default'
})

const coreImages = useDatabase().imageData.value
const routeUrl = useRoute().path

const imageData = ref<ArchivesData[]>([])
const selectImageData = ref<MassImages>()
const imageDialogTrigger = ref(false)

onBeforeMount(() => {
  initImageData()
})

const initImageData = () => {
  if (!coreImages.length) {
    navigateTo('/')
  }
  imageData.value = []
  coreImages.forEach((images:any) => {
    if (images.id === routeUrl.split('/')[2]) {
      imageData.value = images.data
    }
  })
}

const openImageDialog = (imageData:MassImages) => {
  selectImageData.value = imageData
  imageDialogTrigger.value = true
}

const closeImageDialog = () => {
  imageDialogTrigger.value = false
}

const routerBack = () => {
  navigateTo('/archives')
}

</script>
