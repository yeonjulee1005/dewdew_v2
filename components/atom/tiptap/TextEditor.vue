<template>
  <client-only>
    <div v-if="editor" class="tiptap-editor">
      <div class="tiptap-editor__header">
        <LazyEditColorInput
          :color-value="editor ? selectColor(editor) : null"
          :tiptap-editor="editor"
          :tooltip-text="$t('tiptap.colors')"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('bold') : null"
          :action="() => editor ? editor.chain().focus().toggleBold().run() : null"
          icon-type="ri:bold"
          :tooltip-text="$t('tiptap.bold')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('italic') : null"
          :action="() => editor ? editor.chain().focus().toggleItalic().run() : null"
          icon-type="ri:italic"
          :tooltip-text="$t('tiptap.italic')"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('underline') : null"
          :action="() => editor ? editor.chain().focus().toggleUnderline().run() : null"
          icon-type="ri:underline"
          :tooltip-text="$t('tiptap.underline')"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('strike') : null"
          :action="() => editor ? editor.chain().focus().toggleStrike().run() : null"
          icon-type="ri:strikethrough-2"
          :tooltip-text="$t('tiptap.strikethrough')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('highlight') : null"
          :action="() => editor ? editor.chain().focus().toggleHighlight().run() : null"
          icon-type="ri:mark-pen-fill"
          :tooltip-text="$t('tiptap.marker1')"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('highlight', { color: '#ffc078' }) : null"
          :action="() => editor ? editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run() : null"
          icon-type="ri:mark-pen-line"
          :tooltip-text="$t('tiptap.marker2')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'left' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('left').run() : null"
          icon-type="ri:align-left"
          :tooltip-text="$t('tiptap.alignLeft')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'center' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('center').run() : null"
          icon-type="ri:align-center"
          :tooltip-text="$t('tiptap.alignCenter')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'right' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('right').run() : null"
          icon-type="ri:align-right"
          :tooltip-text="$t('tiptap.alignRight')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'justify' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('justify').run() : null"
          icon-type="ri:align-justify"
          :tooltip-text="$t('tiptap.alignJustify')"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('link') : null"
          :action="() => editor ? editor.chain().focus().extendMarkRange('link').setLink({ href: setHref(editor), target: '_blank'}).run() : null"
          icon-type="ri:link"
          :tooltip-text="$t('tiptap.link')"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('link') : null"
          :action="() => editor ? editor.chain().focus().unsetLink().run() : null"
          icon-type="ri:link-unlink"
          :tooltip-text="$t('tiptap.unlink')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('paragraph') : null"
          :action="() => editor ? editor.chain().focus().setParagraph().run() : null"
          icon-type="ri:paragraph"
          :tooltip-text="$t('tiptap.paragraph')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('heading', { level: 1 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 1 }).run() : null"
          icon-type="ri:h-1"
          :tooltip-text="$t('tiptap.h1')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('heading', { level: 2 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 2 }).run() : null"
          icon-type="ri:h-2"
          :tooltip-text="$t('tiptap.h2')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('heading', { level: 3 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 3 }).run() : null"
          icon-type="ri:h-3"
          :tooltip-text="$t('tiptap.h3')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('heading', { level: 4 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 4 }).run() : null"
          icon-type="ri:h-4"
          :tooltip-text="$t('tiptap.h4')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('heading', { level: 5 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 5 }).run() : null"
          icon-type="ri:h-5"
          :tooltip-text="$t('tiptap.h5')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :editor="editor"
          :is-active="() => editor ? editor.isActive('heading', { level: 6 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 6 }).run() : null"
          icon-type="ri:h-6"
          :tooltip-text="$t('tiptap.h6')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('bulletList') : null"
          :action="() => editor ? editor.chain().focus().toggleBulletList().run() : null"
          icon-type="ri:list-unordered"
          :tooltip-text="$t('tiptap.dotList')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('orderedList') : null"
          :action="() => editor ? editor.chain().focus().toggleOrderedList().run() : null"
          icon-type="ri:list-ordered"
          :tooltip-text="$t('tiptap.list')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('taskList') : null"
          :action="() => editor ? editor.chain().focus().toggleTaskList().run() : null"
          icon-type="ri:task-line"
          :tooltip-text="$t('tiptap.tasks')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('blockquote') : null"
          :action="() => editor ? editor.chain().focus().toggleBlockquote().run() : null"
          icon-type="ri:double-quotes-l"
          :tooltip-text="$t('tiptap.quotes')"
        />
        <LazyEditSpecialButtons
          v-if="textEditorProps.fullOption"
          :action="() => editor ? editor.chain().focus().setHorizontalRule().run() : null"
          icon-type="ri:separator"
          :tooltip-text="$t('tiptap.separator')"
        />
        <LazyEditNormalButtons
          :action="() => editor ? editor.chain().focus().setHardBreak().run() : null"
          icon-type="ri:more-line"
          :tooltip-text="$t('tiptap.moreLine')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :action="() => editor ? editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() : null"
          icon-type="ri:table-2"
          :tooltip-text="$t('tiptap.createTable')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :action="() => editor ? editor.chain().focus().addColumnBefore().run() : null"
          icon-type="ri:layout-left-fill"
          :tooltip-text="$t('tiptap.addColumnBefore')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :action="() => editor ? editor.chain().focus().addColumnAfter().run() : null"
          icon-type="ri:layout-right-fill"
          :tooltip-text="$t('tiptap.addColumnAfter')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :action="() => editor ? editor.chain().focus().deleteColumn().run() : null"
          icon-type="ri:delete-column"
          :tooltip-text="$t('tiptap.deleteColumn')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :action="() => editor ? editor.chain().focus().addRowBefore().run() : null"
          icon-type="ri:layout-top-fill"
          :tooltip-text="$t('tiptap.addRowBefore')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :action="() => editor ? editor.chain().focus().addRowAfter().run() : null"
          icon-type="ri:layout-bottom-fill"
          :tooltip-text="$t('tiptap.addRowAfter')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :action="() => editor ? editor.chain().focus().deleteRow().run() : null"
          icon-type="ri:delete-row"
          :tooltip-text="$t('tiptap.deleteRow')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :action="() => editor ? editor.chain().focus().mergeOrSplit().run() : null"
          icon-type="ri:merge-cells-horizontal"
          :tooltip-text="$t('tiptap.mergeOrSplit')"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :action="() => editor ? editor.chain().focus().deleteTable().run() : null"
          icon-type="ci:table-delete"
          :tooltip-text="$t('tiptap.deleteTable')"
        />
        <LazyEditSpecialButtons
          v-if="textEditorProps.fullOption"
          :disabled="!editor.can().chain().focus().undo().run()"
          :action="() => editor ? editor.chain().focus().undo().run() : null"
          icon-type="ri:arrow-go-back-line"
          :tooltip-text="$t('tiptap.goBack')"
        />
        <LazyEditSpecialButtons
          v-if="textEditorProps.fullOption"
          :disabled="!editor.can().chain().focus().redo().run()"
          :action="() => editor ? editor.chain().focus().redo().run() : null"
          icon-type="ri:arrow-go-forward-line"
          :tooltip-text="$t('tiptap.goForward')"
        />
      </div>
      <bubble-menu
        class="bubble-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
      >
        <LazyEditColorInput
          :color-value="editor ? selectColor(editor) : null"
          :tiptap-editor="editor"
          :tooltip-text="$t('tiptap.colors')"
          :tooltip-trigger="true"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('bold') : null"
          :action="() => editor ? editor.chain().focus().toggleBold().run() : null"
          icon-type="ri:bold"
          :tooltip-text="$t('tiptap.bold')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('underline') : null"
          :action="() => editor ? editor.chain().focus().toggleUnderline().run() : null"
          icon-type="ri:underline"
          :tooltip-text="$t('tiptap.underline')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('highlight') : null"
          :action="() => editor ? editor.chain().focus().toggleHighlight().run() : null"
          icon-type="ri:mark-pen-fill"
          :tooltip-text="$t('tiptap.marker1')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('link') : null"
          :action="() => editor ? editor.chain().focus().extendMarkRange('link').setLink({ href: setHref(editor), target: '_blank'}).run() : null"
          icon-type="ri:link"
          :tooltip-text="$t('tiptap.link')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('link') : null"
          :action="() => editor ? editor.chain().focus().unsetLink().run() : null"
          icon-type="ri:link-unlink"
          :tooltip-text="$t('tiptap.unlink')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'left' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('left').run() : null"
          icon-type="ri:align-left"
          :tooltip-text="$t('tiptap.alignLeft')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'center' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('center').run() : null"
          icon-type="ri:align-center"
          :tooltip-text="$t('tiptap.alignCenter')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'right' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('right').run() : null"
          icon-type="ri:align-right"
          :tooltip-text="$t('tiptap.alignRight')"
          :tooltip-trigger="false"
        />
      </bubble-menu>
      <floating-menu
        class="floating-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
      >
        <LazyEditColorInput
          :color-value="editor ? selectColor(editor) : null"
          :tiptap-editor="editor"
          :tooltip-text="$t('tiptap.colors')"
          :tooltip-trigger="true"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('bold') : null"
          :action="() => editor ? editor.chain().focus().toggleBold().run() : null"
          icon-type="ri:bold"
          :tooltip-text="$t('tiptap.bold')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('underline') : null"
          :action="() => editor ? editor.chain().focus().toggleUnderline().run() : null"
          icon-type="ri:underline"
          :tooltip-text="$t('tiptap.underline')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('highlight') : null"
          :action="() => editor ? editor.chain().focus().toggleHighlight().run() : null"
          icon-type="ri:mark-pen-fill"
          :tooltip-text="$t('tiptap.marker1')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('link') : null"
          :action="() => editor ? editor.chain().focus().extendMarkRange('link').setLink({ href: setHref(editor), target: '_blank'}).run() : null"
          icon-type="ri:link"
          :tooltip-text="$t('tiptap.link')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          :is-active="() => editor ? editor.isActive('link') : null"
          :action="() => editor ? editor.chain().focus().unsetLink().run() : null"
          icon-type="ri:link-unlink"
          :tooltip-text="$t('tiptap.unlink')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'left' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('left').run() : null"
          icon-type="ri:align-left"
          :tooltip-text="$t('tiptap.alignLeft')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'center' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('center').run() : null"
          icon-type="ri:align-center"
          :tooltip-text="$t('tiptap.alignCenter')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'right' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('right').run() : null"
          icon-type="ri:align-right"
          :tooltip-text="$t('tiptap.alignRight')"
          :tooltip-trigger="false"
        />
      </floating-menu>
      <editor-content class="tiptap-editor__content" :editor="editor" />
      <div v-if="editor" class="character-count">
        {{ editor.storage.characterCount.characters() + ' / '.concat(String(textEditorProps.textLimit), $t('tiptap.characters')) }}
        <br>
        {{ editor.storage.characterCount.words() + ' '.concat($t('tiptap.words')) }}
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3'
import starterKit from '@tiptap/starter-kit'
import textStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import placeholder from '@tiptap/extension-placeholder'
import characterCount from '@tiptap/extension-character-count'
import underline from '@tiptap/extension-underline'
import textAlign from '@tiptap/extension-text-align'
import highlight from '@tiptap/extension-highlight'
import focus from '@tiptap/extension-focus'
import taskItem from '@tiptap/extension-task-item'
import taskList from '@tiptap/extension-task-list'
import link from '@tiptap/extension-link'
import table from '@tiptap/extension-table'
import tableCell from '@tiptap/extension-table-cell'
import tableHeader from '@tiptap/extension-table-header'
import tableRow from '@tiptap/extension-table-row'

const { t } = useLocale()

const textEditorProps = defineProps({
  textData: { type: String, default: '' },
  textLimit: { type: Number, default: 300 },
  fullOption: { type: Boolean, default: false }
})

const textEditorEmits = defineEmits([
  'update:model-value'
])

const editor = useEditor({
  content: textEditorProps.textData,
  extensions: [
    starterKit,
    placeholder.configure({
      placeholder: t('tiptap.placeholder')
    }),
    characterCount.configure({
      limit: textEditorProps.textLimit
    }),
    underline,
    textAlign.configure({
      types: ['heading', 'paragraph']
    }),
    highlight.configure({ multicolor: true }),
    focus.configure({
      className: 'has-focus',
      mode: 'all'
    }),
    taskItem.configure({
      nested: true
    }),
    taskList,
    link.configure({
      HTMLAttributes: { target: '_blank' },
      protocols: ['ftp', 'mailto'],
      openOnClick: true
    }),
    table.configure({
      resizable: true
    }),
    tableRow,
    tableHeader,
    tableCell,
    textStyle,
    Color
  ],
  onUpdate: ({ editor }) => {
    textEditorEmits('update:model-value', editor.getHTML(), editor.state.doc.textContent)
  }
})

const setHref = (editor:any) => {
  const previousUrl = editor.getAttributes('link').href
  return window.prompt('URL', previousUrl) ?? ''
}

const selectColor = (editor:any) => {
  const selectionColor = editor.getAttributes('textStyle').color
  if (selectionColor) {
    return selectionColor
  }
}

</script>
