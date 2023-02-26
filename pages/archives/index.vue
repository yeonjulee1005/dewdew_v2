<template>
  <div>
    <div class="main-archives-title">
      {{ $t('archives.title') }}
    </div>
    <LazyImageSlider
      :image-data="thumbImageData"
      :main-slider-trigger="true"
    />
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()

useHead({
  title: t('title.archives'),
  meta: [
    { property: 'description', content: t('title.archivesDesc') },
    { property: 'og:title', content: t('title.archivesOgTitle') },
    { property: 'og:url', content: 'https://dewdew.kr/archives/' },
    { property: 'og:description', content: t('title.archivesDesc') }
  ]
})

definePageMeta({
  pageTransition: false,
  layout: 'default'
})

const coreImages = useDatabase().imageData.value
const thumbImageData = ref<ArchivesData[]>([])

onBeforeMount(() => {
  initImageData()
})

const initImageData = () => {
  thumbImageData.value = []
  coreImages.forEach((images:any) => {
    if (images.id !== 'assets' && images.id !== 'resources' && images.data.length) {
      const randomNumber = Math.floor(Math.random() * images.data.length)
      const data:ArchivesData = {
        year: images.id,
        url: images.data[randomNumber].url,
        route: '/archives/' + images.id
      }
      thumbImageData.value.push(data)
    }
  })
}

</script>
