<template>
  <client-only>
    <el-tooltip
      :visible="visible"
      effect="dark"
      placement="bottom"
      :content="tooltipText"
    >
      <el-button
        class="menu-item"
        :disabled="disabled"
        @mouseenter="!tooltipTrigger ? visible = false : visible = true"
        @mouseleave="visible = false"
        @click="action"
      >
        <Icon :icon="iconType" />
      </el-button>
    </el-tooltip>
  </client-only>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  iconType: { type: String, default: '' },
  action: { type: Function, default: null },
  disabled: { type: Boolean, default: false },
  tooltipTrigger: { type: Boolean, default: true },
  tooltipText: { type: String, default: '' }
})

const visible = ref(false)

</script>
