<template>
  <div>
    <div class="main-archives-title">
      {{ title }}
    </div>
    <LazyImageSlider
      :image-data="thumbImageData"
      :main-slider-trigger="true"
    />
  </div>
</template>
<script setup lang="ts">

useHead({
  title: '아카이브',
  meta: [
    { property: 'description', content: 'FE개발자 이연주의 사진기록 입니다.' },
    { property: 'og:title', content: '개발자 이연주 | 아카이브' },
    { property: 'og:url', content: 'https://dewdew.kr/archives/' },
    { property: 'og:description', content: 'FE개발자 이연주의 사진기록 입니다.' }
  ]
})

definePageMeta({
  title: 'Archives',
  pageTransition: false
})

const title = ref('Dewdew History')
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
