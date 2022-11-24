<template>
  <NuxtPage />
</template>
<script setup lang="ts">
import { ID_INJECTION_KEY } from 'element-plus'
import { useDatabase } from '~/stores/database'

provide(ID_INJECTION_KEY, {
  prefix: 100,
  current: 0
})

useHead({
  titleTemplate: (titleChunk:any) => {
    let title = titleChunk
    if (!titleChunk.includes('개발자 이연주 |')) {
      title = `개발자 이연주 | ${titleChunk}`
    }
    return title
  }
})

useDatabase().updateData(await useApi().getAsyncData('core', 'images'))

</script>
