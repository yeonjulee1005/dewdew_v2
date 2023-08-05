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

const editSpecialButtonProps = withDefaults(
  defineProps<{
    iconType: string,
    action: Function,
    disabled?: boolean,
    tooltipTrigger?: boolean,
    tooltipText?: string
  }>(),
  {
    disabled: false,
    tooltipTrigger: true,
    tooltipText: ''
  }
)

const editSpecialButtonsEmits = defineEmits([
  'select-button'
])

const clickAction = () => {
  editSpecialButtonProps.action()
  editSpecialButtonsEmits('select-button')
}

</script>
