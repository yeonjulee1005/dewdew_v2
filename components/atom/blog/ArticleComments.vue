<template>
  <div class="article-comments">
    <div class="comments-title">
      {{ articleCommentsProps.commentTitle }}
    </div>
    <el-timeline v-if="articleCommentsProps.commentData.length">
      <el-timeline-item
        v-for="(activity, index) in articleCommentsProps.commentData"
        :key="index"
        center
        :color="activity.timeAgo === 'just now' ? '#C74436' : '#D3E3D2'"
        :timestamp="activity.timeAgo"
      >
        <p> {{ activity.name }} </p>
        <p v-html="activity.message" />
      </el-timeline-item>
    </el-timeline>
    <el-empty v-else class="empty-comments" :description="articleCommentsProps.emptyText" />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { CommentList } from '~/interfaces/types'

const articleCommentsProps = defineProps({
  commentTitle: { type: String, default: '' },
  commentData: { type: Array as PropType<CommentList[]>, default: () => [] },
  emptyText: { type: String, default: '댓글이 없네요..ㅠㅠ' }
})
</script>
