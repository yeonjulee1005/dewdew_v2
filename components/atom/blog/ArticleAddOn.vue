<template>
  <div class="article-add-on flex flex-justify-end mt-default mb-default">
    <el-tag
      class="like"
      :effect="activateLike ? 'light' : 'plain'"
      @click="updateLikeCount"
    >
      {{ data.like + ' ❤️' }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">

defineProps({
  articleId: { type: String, default: '' },
  data: { type: Object, default: () => null },
  activateLike: { type: Boolean, default: false }
})

const articleAddOnEmits = defineEmits([
  'update-count'
])

const updateLikeCount = () => {
  articleAddOnEmits('update-count')
}
</script>
