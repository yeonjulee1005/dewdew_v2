<template>
  <div class="like-button flex flex-justify-end flex-align-center">
    <el-button
      class="fixed-like"
      :class="{'fixed-like-on': affixButtonProps.trigger}"
      circle
      size="large"
      :type="affixButtonProps.activateLike ? 'danger' : ''"
      @click="clickAffixButton"
    >
      {{ affixButtonProps.buttonText }}
    </el-button>
  </div>
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
