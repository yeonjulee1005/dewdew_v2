<template>
  <div class="article-comments">
    <div class="comments-title">
      {{ articleCommentsProps.commentTitle }}
    </div>
    <el-timeline v-if="articleCommentsProps.commentData.length">
      <el-timeline-item
        v-for="(comment, index) in articleCommentsProps.commentData"
        :key="index"
        center
        :color="comment.timeAgo === 'just now' ? '#C74436' : '#D3E3D2'"
        :timestamp="comment.timeAgo"
      >
        <div class="comments-item flex flex-row flex-space-between flex-align-center">
          <div class="message-component mr-40">
            <p> {{ comment.name }} </p>
            <p v-html="comment.message" />
          </div>
          <el-button circle size="small" @click="deleteComment(comment)">
            <el-icon><Close /></el-icon>
          </el-button>
        </div>
      </el-timeline-item>
    </el-timeline>
    <el-empty v-else class="empty-comments" :description="articleCommentsProps.emptyText" />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { CommentList } from '~/types/interfaces'

const articleCommentsProps = defineProps({
  commentTitle: { type: String, default: '' },
  commentData: { type: Array as PropType<CommentList[]>, default: () => [] },
  emptyText: { type: String, default: '댓글이 없네요..ㅠㅠ' }
})

const articleCommentsEmits = defineEmits([
  'delete-comment'
])

const deleteComment = (comment:CommentList) => {
  articleCommentsEmits('delete-comment', comment)
}
</script>
