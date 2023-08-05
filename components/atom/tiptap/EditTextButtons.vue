<template>
  <client-only>
    <el-tooltip
      :visible="visible"
      effect="dark"
      placement="bottom"
      :content="text"
    >
      <el-button
        class="tiptap-text-menu-item"
        :class="{'is-active': isActive}"
        @mouseenter="!tooltipTrigger ? visible = false : visible = true"
        @mouseleave="visible = false"
        @click="clickAction"
      >
        <el-text
          :style="{ fontFamily: fontFamilyName }"
        >
          {{ text }}
        </el-text>
      </el-button>
    </el-tooltip>
  </client-only>
</template>

<script setup lang="ts">

const visible = ref(false)

const editTextButtonsProps = withDefaults(
  defineProps<{
    isActive: boolean,
    action: Function,
    fontFamilyName?: string,
    tooltipTrigger?: boolean,
    text?: string
  }>(),
  {
    tooltipTrigger: true,
    fontFamilyName: '',
    text: ''
  }
)

const editTextButtonsEmits = defineEmits([
  'select-button'
])

const clickAction = () => {
  editTextButtonsProps.action()
  editTextButtonsEmits('select-button')
}

</script>
