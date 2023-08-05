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
        :class="{'is-active': isActive}"
        @mouseenter="!tooltipTrigger ? visible = false : visible = true"
        @mouseleave="visible = false"
        @click="clickAction"
      >
        <Icon :icon="iconType" />
      </el-button>
    </el-tooltip>
  </client-only>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const visible = ref(false)

const editNormalButtonProps = withDefaults(
  defineProps<{
    iconType: string,
    isActive?: boolean,
    action: Function,
    tooltipTrigger?: boolean,
    tooltipText?: string
  }>(),
  {
    isActive: false,
    tooltipTrigger: true,
    tooltipText: ''
  }
)

const editNormalButtonsEmits = defineEmits([
  'select-button'
])

const clickAction = () => {
  editNormalButtonProps.action()
  editNormalButtonsEmits('select-button')
}

</script>
