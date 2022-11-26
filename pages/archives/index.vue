<template>
  <section>
    <div class="main-archives-title">
      {{ title }}
    </div>
    <AtomArchivesImageSlider
      :image-data="thumbImageData"
      :main-slider-trigger="true"
    />
  </section>
</template>
<script setup lang="ts">
import { ArchivesData } from '~/interfaces/types'
import { useDatabase } from '~/stores/database'

useHead({
  title: '아카이브'
})

definePageMeta({
  title: 'Archives'
})

const title = ref('Dewdew History')
const coreImages = useDatabase().imageData.value
const thumbImageData = ref<ArchivesData[]>([])

onMounted(() => {
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
