<template>
  <NuxtPage />
</template>
<script setup lang="ts">
import { useDatabase } from '@/store/database'

useHead({
  titleTemplate: (titleChunk:any) => {
    let title = titleChunk
    if (!titleChunk.includes('개발자 이연주 |')) {
      title = `개발자 이연주 | ${titleChunk}`
    }
    return title
  }
})

useDatabase().updateCoreData()
useDatabase().updateImageData()

</script>
