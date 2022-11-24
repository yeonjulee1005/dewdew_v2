<template>
  <NuxtLayout>
    <div>
      아카이브
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useDatabase } from '~/stores/database'

useHead({
  title: '아카이브'
})

const coreImages = useDatabase().imageData.value
const thumbImageData = ref<any[]>([])

onMounted(() => {
  initImageData()
})

const initImageData = () => {
  thumbImageData.value = []
  coreImages.forEach((images:any) => {
    if (images.id !== 'assets' && images.id !== 'resources') {
      const randomNumber = Math.floor(Math.random() * images.length)
      console.log(images.id)
      const data = {
        year: images.id,
        url: images.data[randomNumber].url,
        route: '/archives/' + images.id
      }
      thumbImageData.value.push(data)
    }
  })
  console.log(thumbImageData.value)
}
</script>
