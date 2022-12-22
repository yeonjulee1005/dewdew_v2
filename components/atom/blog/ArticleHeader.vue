<template>
  <div class="article-header flex flex-column flex-space-between flex-align-end mb-20">
    <div class="title">
      {{ articleHeaderProps.data.title }}
    </div>
    <div class="time">
      {{ articleHeaderProps.data.createdAt }}
    </div>
  </div>
</template>
<script setup lang="ts">
const articleHeaderProps = defineProps({
  data: { type: Object, default: () => null }
})
</script>
