<template>
  <client-only>
    <el-tooltip
      :disabled="tooltipTrigger"
      effect="dark"
      placement="bottom"
      :content="tooltipText"
    >
      <input
        class="edit-color-input"
        type="color"
        :value="colorValue"
        @input="tiptapEditor ? tiptapEditor.chain().focus().setColor($event.target.value).run() : null"
      >
    </el-tooltip>
  </client-only>
</template>

<script setup>

defineProps({
  colorValue: { type: String, default: '#ffffff' },
  tiptapEditor: { type: Object, default: null },
  tooltipText: { type: String, default: '' },
  tooltipTrigger: { type: Boolean, default: false }
})

</script>
