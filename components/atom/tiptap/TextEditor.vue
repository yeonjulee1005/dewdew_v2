<template>
  <client-only>
    <div v-if="editor" class="tiptap-editor">
      <div class="tiptap-editor__header">
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('bold') : null"
          :action="() => editor ? editor.chain().focus().toggleBold().run() : null"
          type="bold"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('italic') : null"
          :action="() => editor ? editor.chain().focus().toggleItalic().run() : null"
          type="italic"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('strike') : null"
          :action="() => editor ? editor.chain().focus().toggleStrike().run() : null"
          type="strikethrough-2"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('highlight') : null"
          :action="() => editor ? editor.chain().focus().toggleHighlight().run() : null"
          type="mark-pen-fill"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('highlight', { color: '#ffc078' }) : null"
          :action="() => editor ? editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run() : null"
          type="mark-pen-line"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive({ textAlign: 'left' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('left').run() : null"
          type="align-left"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive({ textAlign: 'center' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('center').run() : null"
          type="align-center"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive({ textAlign: 'right' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('right').run() : null"
          type="align-right"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive({ textAlign: 'justify' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('justify').run() : null"
          type="align-justify"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('paragraph') : null"
          :action="() => editor ? editor.chain().focus().setParagraph().run() : null"
          type="paragraph"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('heading', { level: 1 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 1 }).run() : null"
          type="h-1"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('heading', { level: 2 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 2 }).run() : null"
          type="h-2"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('heading', { level: 3 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 3 }).run() : null"
          type="h-3"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('heading', { level: 4 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 4 }).run() : null"
          type="h-4"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('heading', { level: 5 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 5 }).run() : null"
          type="h-5"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('heading', { level: 6 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 6 }).run() : null"
          type="h-6"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('bulletList') : null"
          :action="() => editor ? editor.chain().focus().toggleBulletList().run() : null"
          type="list-unordered"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('orderedList') : null"
          :action="() => editor ? editor.chain().focus().toggleOrderedList().run() : null"
          type="list-ordered"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('codeBlock') : null"
          :action="() => editor ? editor.chain().focus().toggleCodeBlock().run() : null"
          type="code-box-line"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('blockquote') : null"
          :action="() => editor ? editor.chain().focus().toggleBlockquote().run() : null"
          type="double-quotes-l"
        />
        <AtomTiptapEditSpecialButtons
          :editor="editor"
          :action="() => editor ? editor.chain().focus().setHorizontalRule().run() : null"
          type="separator"
        />
        <AtomTiptapEditSpecialButtons
          :editor="editor"
          :disabled="!editor.can().chain().focus().undo().run()"
          :action="() => editor ? editor.chain().focus().undo().run() : null"
          type="arrow-go-back-line"
        />
        <AtomTiptapEditSpecialButtons
          :editor="editor"
          :disabled="!editor.can().chain().focus().redo().run()"
          :action="() => editor ? editor.chain().focus().redo().run() : null"
          type="arrow-go-forward-line"
        />
      </div>
      <bubble-menu
        class="bubble-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
      >
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('bold') : null"
          :action="() => editor ? editor.chain().focus().toggleBold().run() : null"
          type="bold"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('highlight') : null"
          :action="() => editor ? editor.chain().focus().toggleHighlight().run() : null"
          type="mark-pen-fill"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive({ textAlign: 'left' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('left').run() : null"
          type="align-left"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive({ textAlign: 'center' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('center').run() : null"
          type="align-center"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive({ textAlign: 'right' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('right').run() : null"
          type="align-right"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('codeBlock') : null"
          :action="() => editor ? editor.chain().focus().toggleCodeBlock().run() : null"
          type="code-box-line"
        />
      </bubble-menu>

      <floating-menu
        class="floating-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
      >
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('bold') : null"
          :action="() => editor ? editor.chain().focus().toggleBold().run() : null"
          type="bold"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('highlight') : null"
          :action="() => editor ? editor.chain().focus().toggleHighlight().run() : null"
          type="mark-pen-fill"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive({ textAlign: 'left' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('left').run() : null"
          type="align-left"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive({ textAlign: 'center' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('center').run() : null"
          type="align-center"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive({ textAlign: 'right' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('right').run() : null"
          type="align-right"
        />
        <AtomTiptapEditNormalButtons
          :editor="editor"
          :is-active="() => editor ? editor.isActive('codeBlock') : null"
          :action="() => editor ? editor.chain().focus().toggleCodeBlock().run() : null"
          type="code-box-line"
        />
      </floating-menu>
      <editor-content class="tiptap-editor__content" :editor="editor" />
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'

const textEditorEmits = defineEmits([
  'update:model-value'
])

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    Highlight.configure({ multicolor: true })
  ],
  onUpdate: ({ editor }) => {
    textEditorEmits('update:model-value', editor.getHTML(), editor.state.doc.textContent)
  }
})

</script>
