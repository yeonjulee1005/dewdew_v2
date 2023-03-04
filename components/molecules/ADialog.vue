<template>
  <client-only>
    <el-dialog
      :model-value="dialogTrigger"
      :show-close="showClose"
      :class="customClass"
      :top="top"
      :width="width"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      close-on-click-modal
      close-on-press-escape
      destroy-on-close
      center
      @close="closeDialog"
    >
      <slot />
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">

defineProps({
  dialogTrigger: { type: Boolean, default: false },
  showClose: { type: Boolean, default: true },
  customClass: { type: String, default: '' },
  top: { type: [String, Number], default: '10vh' },
  width: { type: [String, Number], default: '90vw' },
  openDelay: { type: Number, default: 350 },
  closeDelay: { type: Number, default: 200 }
})

const dialogEmits = defineEmits([
  'close-dialog'
])

const closeDialog = () => {
  dialogEmits('close-dialog')
}
</script>
