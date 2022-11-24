<template>
  <NuxtLayout>
    <AtomArchivesImageSlider
      :image-data="thumbImageData"
      :main-slider-trigger="true"
    />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { ArchivesData } from '~/interfaces/types'
import { useDatabase } from '~/stores/database'

useHead({
  title: '아카이브'
})

const coreImages = useDatabase().imageData.value
const thumbImageData = ref<ArchivesData[]>([])

onMounted(() => {
  initImageData()
})

const initImageData = () => {
  thumbImageData.value = []
  coreImages.forEach((images:any) => {
    if (images.id !== 'assets' && images.id !== 'resources') {
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
