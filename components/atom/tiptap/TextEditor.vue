<template>
  <client-only>
    <div v-if="editor" class="tiptap-editor">
      <div class="tiptap-editor__header">
        <LazyAtomTiptapEditNormalButtons
          :is-active="() => editor ? editor.isActive('bold') : null"
          :action="() => editor ? editor.chain().focus().toggleBold().run() : null"
          type="bold"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('italic') : null"
          :action="() => editor ? editor.chain().focus().toggleItalic().run() : null"
          type="italic"
        />
        <LazyAtomTiptapEditNormalButtons
          :is-active="() => editor ? editor.isActive('underline') : null"
          :action="() => editor ? editor.chain().focus().toggleUnderline().run() : null"
          type="underline"
        />
        <LazyAtomTiptapEditNormalButtons
          :is-active="() => editor ? editor.isActive('strike') : null"
          :action="() => editor ? editor.chain().focus().toggleStrike().run() : null"
          type="strikethrough-2"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('highlight') : null"
          :action="() => editor ? editor.chain().focus().toggleHighlight().run() : null"
          type="mark-pen-fill"
        />
        <LazyAtomTiptapEditNormalButtons
          :is-active="() => editor ? editor.isActive('highlight', { color: '#ffc078' }) : null"
          :action="() => editor ? editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run() : null"
          type="mark-pen-line"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'left' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('left').run() : null"
          type="align-left"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'center' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('center').run() : null"
          type="align-center"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'right' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('right').run() : null"
          type="align-right"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'justify' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('justify').run() : null"
          type="align-justify"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('paragraph') : null"
          :action="() => editor ? editor.chain().focus().setParagraph().run() : null"
          type="paragraph"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('heading', { level: 1 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 1 }).run() : null"
          type="h-1"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('heading', { level: 2 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 2 }).run() : null"
          type="h-2"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('heading', { level: 3 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 3 }).run() : null"
          type="h-3"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('heading', { level: 4 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 4 }).run() : null"
          type="h-4"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('heading', { level: 5 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 5 }).run() : null"
          type="h-5"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :editor="editor"
          :is-active="() => editor ? editor.isActive('heading', { level: 6 }) : null"
          :action="() => editor ? editor.chain().focus().toggleHeading({ level: 6 }).run() : null"
          type="h-6"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('bulletList') : null"
          :action="() => editor ? editor.chain().focus().toggleBulletList().run() : null"
          type="list-unordered"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('orderedList') : null"
          :action="() => editor ? editor.chain().focus().toggleOrderedList().run() : null"
          type="list-ordered"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('taskList') : null"
          :action="() => editor ? editor.chain().focus().toggleTaskList().run() : null"
          type="task-line"
        />
        <LazyAtomTiptapEditNormalButtons
          :is-active="() => editor ? editor.isActive('codeBlock') : null"
          :action="() => editor ? editor.chain().focus().toggleCodeBlock().run() : null"
          type="code-box-line"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive('blockquote') : null"
          :action="() => editor ? editor.chain().focus().toggleBlockquote().run() : null"
          type="double-quotes-l"
        />
        <AtomTiptapEditSpecialButtons
          v-if="textEditorProps.fullOption"
          :action="() => editor ? editor.chain().focus().setHorizontalRule().run() : null"
          type="separator"
        />
        <LazyAtomTiptapEditNormalButtons
          :action="() => editor ? editor.chain().focus().setHardBreak().run() : null"
          type="more-line"
        />
        <AtomTiptapEditSpecialButtons
          v-if="textEditorProps.fullOption"
          :disabled="!editor.can().chain().focus().undo().run()"
          :action="() => editor ? editor.chain().focus().undo().run() : null"
          type="arrow-go-back-line"
        />
        <AtomTiptapEditSpecialButtons
          v-if="textEditorProps.fullOption"
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
        <LazyAtomTiptapEditNormalButtons
          :is-active="() => editor ? editor.isActive('bold') : null"
          :action="() => editor ? editor.chain().focus().toggleBold().run() : null"
          type="bold"
        />
        <LazyAtomTiptapEditNormalButtons
          :is-active="() => editor ? editor.isActive('underline') : null"
          :action="() => editor ? editor.chain().focus().toggleUnderline().run() : null"
          type="underline"
        />
        <LazyAtomTiptapEditNormalButtons
          :is-active="() => editor ? editor.isActive('highlight') : null"
          :action="() => editor ? editor.chain().focus().toggleHighlight().run() : null"
          type="mark-pen-fill"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'left' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('left').run() : null"
          type="align-left"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'center' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('center').run() : null"
          type="align-center"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'right' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('right').run() : null"
          type="align-right"
        />
        <LazyAtomTiptapEditNormalButtons
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
        <LazyAtomTiptapEditNormalButtons
          :is-active="() => editor ? editor.isActive('bold') : null"
          :action="() => editor ? editor.chain().focus().toggleBold().run() : null"
          type="bold"
        />
        <LazyAtomTiptapEditNormalButtons
          :is-active="() => editor ? editor.isActive('underline') : null"
          :action="() => editor ? editor.chain().focus().toggleUnderline().run() : null"
          type="underline"
        />
        <LazyAtomTiptapEditNormalButtons
          :is-active="() => editor ? editor.isActive('highlight') : null"
          :action="() => editor ? editor.chain().focus().toggleHighlight().run() : null"
          type="mark-pen-fill"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'left' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('left').run() : null"
          type="align-left"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'center' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('center').run() : null"
          type="align-center"
        />
        <LazyAtomTiptapEditNormalButtons
          v-if="textEditorProps.fullOption"
          :is-active="() => editor ? editor.isActive({ textAlign: 'right' }) : null"
          :action="() => editor ? editor.chain().focus().setTextAlign('right').run() : null"
          type="align-right"
        />
        <LazyAtomTiptapEditNormalButtons
          :is-active="() => editor ? editor.isActive('codeBlock') : null"
          :action="() => editor ? editor.chain().focus().toggleCodeBlock().run() : null"
          type="code-box-line"
        />
      </floating-menu>
      <editor-content class="tiptap-editor__content" :editor="editor" />
      <div v-if="editor" class="character-count">
        {{ editor.storage.characterCount.characters() + ' / ' + textEditorProps.textLimit + ' 자' }}
        <br>
        {{ editor.storage.characterCount.words() + ' 단어' }}
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CharacterCount from '@tiptap/extension-character-count'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Focus from '@tiptap/extension-focus'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { lowlight } from 'lowlight'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

const textEditorProps = defineProps({
  textLimit: { type: Number, default: 300 },
  fullOption: { type: Boolean, default: false }
})

const textEditorEmits = defineEmits([
  'update:model-value'
])

const editor = useEditor({
  content: '<p>글을 작성해주시지요 🤨</p>',
  extensions: [
    StarterKit,
    CodeBlockLowlight.configure({
      lowlight
    }),
    CharacterCount.configure({
      limit: textEditorProps.textLimit
    }),
    Underline,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    Highlight.configure({ multicolor: true }),
    Focus.configure({
      className: 'has-focus',
      mode: 'all'
    }),
    TaskItem.configure({
      nested: true
    }),
    TaskList
  ],
  onUpdate: ({ editor }) => {
    textEditorEmits('update:model-value', editor.getHTML(), editor.state.doc.textContent)
  }
})

</script>
