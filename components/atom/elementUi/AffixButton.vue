<template>
  <el-affix
    :class="{'el-affix-on': affixButtonProps.trigger}"
    :position="affixButtonProps.position"
    :offset="affixButtonProps.offset"
  >
    <el-button
      circle
      size="large"
      :type="affixButtonProps.activateLike ? 'danger' : ''"
      @click="clickAffixButton"
    >
      {{ affixButtonProps.buttonText }}
    </el-button>
  </el-affix>
</template>
<script setup lang="ts">
const affixButtonProps = defineProps({
  trigger: { type: Boolean, default: false },
  position: { type: String, default: 'bottom' },
  offset: { type: Number, default: 200 },
  buttonText: { type: String, default: '❤️' },
  activateLike: { type: Boolean, default: false }
})

const affixButtonEmits = defineEmits([
  'click-affix'
])

const clickAffixButton = () => {
  affixButtonEmits('click-affix')
}

</script>
