<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk:any) => {
    let title = titleChunk
    if (!titleChunk.includes('개발자 이연주 |')) {
      title = `개발자 이연주 | ${titleChunk}`
    }
    return title
  }
})

</script>
