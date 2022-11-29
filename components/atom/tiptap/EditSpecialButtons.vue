<template>
  <el-button
    class="menu-item"
    :disabled="editButtonProps.disabled"
    @click="editButtonProps.action"
  >
    <Icon :icon="`ri:${type}`" />
  </el-button>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'

const editButtonProps = defineProps({
  editor: { type: Object, default: () => null },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: '' },
  action: { type: Function, default: null }
})
</script>
