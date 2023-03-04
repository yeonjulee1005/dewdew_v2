<template>
  <el-card class="blog-card">
    <div class="card-header flex flex-row flex-align-center">
      <span class="title">
        {{ cardItem.title }}
      </span>
      <el-tag
        class="like ml-default"
        type="success"
        effect="light"
      >
        {{ cardItem.like + ' ❤️' }}
      </el-tag>
    </div>
    <p class="desc">
      {{ cardItem.rawArticle }}
    </p>
  </el-card>
</template>

<script setup lang="ts">

defineProps({
  cardItem: { type: Object, default: () => null }
})

</script>
