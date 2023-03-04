<template>
  <div class="like-button flex flex-justify-end flex-align-center">
    <el-button
      class="fixed-like"
      :class="{'fixed-like-on': trigger}"
      circle
      size="large"
      :type="activateLike ? 'danger' : ''"
      @click="clickAffixButton"
    >
      {{ buttonText }}
    </el-button>
  </div>
</template>

<script setup lang="ts">

defineProps({
  trigger: { type: Boolean, default: false },
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
