<template>
  <div class="article-add-on flex flex-justify-end mt-default mb-default">
    <el-tag
      class="like"
      :effect="articleAddOnProps.activateLike ? 'light' : 'plain'"
      @click="updateLikeCount"
    >
      {{ articleAddOnProps.data.like + ' ❤️' }}
    </el-tag>
  </div>
</template>
<script setup lang="ts">
const articleAddOnProps = defineProps({
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
