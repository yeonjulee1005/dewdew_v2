<template>
  <client-only>
    <el-popover
      trigger="hover"
      width="auto"
      :show-arrow="false"
      popper-class="tiptap-editor-group-menu"
    >
      <template #reference>
        <el-button>
          <Icon icon="ri:menu-add-line" />
        </el-button>
      </template>
      <LazyEditNormalButtons
        v-if="fullOption"
        :is-active="tiptapEditor.isActive({ textAlign: 'left' })"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().setTextAlign('left').run() : null"
        icon-type="ri:align-left"
        :tooltip-text="$t('tiptap.alignLeft')"
      />
      <LazyEditNormalButtons
        v-if="fullOption"
        :is-active="tiptapEditor.isActive({ textAlign: 'center' })"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().setTextAlign('center').run() : null"
        icon-type="ri:align-center"
        :tooltip-text="$t('tiptap.alignCenter')"
      />
      <LazyEditNormalButtons
        v-if="fullOption"
        :is-active="tiptapEditor.isActive({ textAlign: 'right' })"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().setTextAlign('right').run() : null"
        icon-type="ri:align-right"
        :tooltip-text="$t('tiptap.alignRight')"
      />
      <LazyEditNormalButtons
        v-if="fullOption"
        :is-active="tiptapEditor.isActive({ textAlign: 'justify' })"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().setTextAlign('justify').run() : null"
        icon-type="ri:align-justify"
        :tooltip-text="$t('tiptap.alignJustify')"
      />
    </el-popover>
  </client-only>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import { Icon } from '@iconify/vue'

withDefaults(
  defineProps<{
    tiptapEditor: Editor,
    fullOption?: boolean
  }>(),
  {
    fullOption: false
  }
)

</script>
