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
          <Icon icon="ri:table-2" />
        </el-button>
      </template>
      <LazyEditNormalButtons
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() : null"
        icon-type="ri:table-2"
        :tooltip-text="$t('tiptap.createTable')"
      />
      <LazyEditNormalButtons
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().addColumnBefore().run() : null"
        icon-type="ri:layout-left-fill"
        :tooltip-text="$t('tiptap.addColumnBefore')"
      />
      <LazyEditNormalButtons
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().addColumnAfter().run() : null"
        icon-type="ri:layout-right-fill"
        :tooltip-text="$t('tiptap.addColumnAfter')"
      />
      <LazyEditNormalButtons
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().deleteColumn().run() : null"
        icon-type="ri:delete-column"
        :tooltip-text="$t('tiptap.deleteColumn')"
      />
      <LazyEditNormalButtons
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().addRowBefore().run() : null"
        icon-type="ri:layout-top-fill"
        :tooltip-text="$t('tiptap.addRowBefore')"
      />
      <LazyEditNormalButtons
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().addRowAfter().run() : null"
        icon-type="ri:layout-bottom-fill"
        :tooltip-text="$t('tiptap.addRowAfter')"
      />
      <LazyEditNormalButtons
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().deleteRow().run() : null"
        icon-type="ri:delete-row"
        :tooltip-text="$t('tiptap.deleteRow')"
      />
      <LazyEditNormalButtons
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().mergeOrSplit().run() : null"
        icon-type="ri:merge-cells-horizontal"
        :tooltip-text="$t('tiptap.mergeOrSplit')"
      />
      <LazyEditNormalButtons
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().deleteTable().run() : null"
        icon-type="ci:table-delete"
        :tooltip-text="$t('tiptap.deleteTable')"
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
