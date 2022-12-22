<template>
  <div class="article-header flex flex-column flex-space-between mb-default">
    <div class="title">
      {{ articleHeaderProps.data.title }}
    </div>
    <div class="time flex flex-justify-end mt-default">
      {{ articleHeaderProps.data.createdAt }}
    </div>
  </div>
</template>
<script setup lang="ts">
const articleHeaderProps = defineProps({
  data: { type: Object, default: () => null }
})
</script>
