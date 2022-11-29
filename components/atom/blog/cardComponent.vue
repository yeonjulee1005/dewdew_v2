<template>
  <el-card class="blog-card">
    <p class="flex flex-row flex-align-center">
      <span class="title">
        {{ blogCardProps.cardItem.title }}
      </span>
      <el-tag class="like ml-default" type="success" effect="light">
        {{ blogCardProps.cardItem.like + ' 👍🏻' }}
      </el-tag>
    </p>
    <p class="desc">
      {{ blogCardProps.cardItem.rawArticle }}
    </p>
  </el-card>
</template>
<script setup lang="ts">
const blogCardProps = defineProps({
  cardItem: { type: Object, default: () => null }
})
</script>
