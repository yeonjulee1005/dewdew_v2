<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk:any) => {
    let title = titleChunk
    if (!titleChunk.includes('USIMSA |')) {
      title = `USIMSA | ${titleChunk}`
    }
    return title
  }
})
</script>
