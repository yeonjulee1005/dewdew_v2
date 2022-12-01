<template>
  <el-button
    class="menu-item"
    :class="{'is-active': editButtonProps.isActive ? editButtonProps.isActive() : null}"
    @click="editButtonProps.action"
  >
    <Icon :icon="`ri:${type}`" />
  </el-button>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'

const editButtonProps = defineProps({
  type: { type: String, default: '' },
  isActive: { type: Function, default: null },
  action: { type: Function, default: null }
})
</script>
