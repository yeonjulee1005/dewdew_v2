<template>
  <div class="article-header flex flex-column flex-space-between mb-default">
    <nuxt-link class="route-back flex flex-row flex-align-center mb-20" to="/blog">
      <el-icon><ArrowLeftBold /></el-icon>
      <p class="ml-8">
        {{ $t('archives.back') }}
      </p>
    </nuxt-link>
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
