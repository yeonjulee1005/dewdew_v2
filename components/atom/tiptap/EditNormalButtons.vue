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
        :class="{'is-active': isActive ? isActive() : null}"
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
  isActive: { type: Function, default: null },
  action: { type: Function, default: null },
  tooltipTrigger: { type: Boolean, default: true },
  tooltipText: { type: String, default: '' }
})

const visible = ref(false)

</script>
