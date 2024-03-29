<template>
  <client-only>
    <div
      v-if="editor"
      class="tiptap-editor"
    >
      <div class="tiptap-editor__header">
        <TiptapFontFamilyGroup
          :tiptap-editor="editor"
          :full-option="fullOption"
        />
        <TiptapHeadingGroup
          v-if="!commentOption"
          :tiptap-editor="editor"
          :full-option="fullOption"
        />
        <TiptapTextStyleGroup
          :tiptap-editor="editor"
          :full-option="fullOption"
        />
        <TiptapStrokeGroup
          v-if="!commentOption"
          :tiptap-editor="editor"
          :full-option="fullOption"
        />
        <TiptapTextAlignGroup
          v-if="!commentOption"
          :tiptap-editor="editor"
          :full-option="fullOption"
        />
        <TiptapTextListGroup
          v-if="!commentOption"
          :tiptap-editor="editor"
          :full-option="fullOption"
        />
        <LazyEditNormalButtons
          v-if="!commentOption"
          :is-active="false"
          :action="() => editor ? imageUploadDialogTrigger = true : null"
          icon-type="ri:image-2-line"
          :tooltip-text="$t('tiptap.image')"
        />
        <TiptapLinkGroup
          v-if="!commentOption"
          :tiptap-editor="editor"
          :full-option="fullOption"
          @open-hyper-link="() => hyperLinkDialogTrigger = true"
          @open-youtube-link="() => youtubeLinkDialogTrigger = true"
        />
        <TiptapTableGroup
          v-if="!commentOption"
          :tiptap-editor="editor"
          :full-option="fullOption"
        />
        <TiptapExtraGroup
          v-if="!commentOption"
          :tiptap-editor="editor"
          :full-option="fullOption"
        />
      </div>
      <bubble-menu
        class="bubble-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
      >
        <LazyEditNormalButtons
          :is-active="editor.isActive('bold')"
          :action="() => editor ? editor.chain().focus().toggleBold().run() : null"
          icon-type="ri:bold"
          :tooltip-text="$t('tiptap.bold')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          :is-active="editor.isActive('underline')"
          :action="() => editor ? editor.chain().focus().toggleUnderline().run() : null"
          icon-type="ri:underline"
          :tooltip-text="$t('tiptap.underline')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          :is-active="editor.isActive('highlight')"
          :action="() => editor ? editor.chain().focus().toggleHighlight().run() : null"
          icon-type="ri:mark-pen-fill"
          :tooltip-text="$t('tiptap.marker1')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          :is-active="editor.isActive('link')"
          :action="() => editor ? hyperLinkDialogTrigger = true : null"
          icon-type="ri:link"
          :tooltip-text="$t('tiptap.link')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          :is-active="editor.isActive('link')"
          :action="() => editor ? editor.chain().focus().unsetLink().run() : null"
          icon-type="ri:link-unlink"
          :tooltip-text="$t('tiptap.unlink')"
          :tooltip-trigger="false"
        />
        <LazyEditNormalButtons
          v-if="fullOption"
          :is-active="editor.isActive({ textAlign: 'center' })"
          :action="() => editor ? editor.chain().focus().setTextAlign('center').run() : null"
          icon-type="ri:align-center"
          :tooltip-text="$t('tiptap.alignCenter')"
          :tooltip-trigger="false"
        />
      </bubble-menu>
      <editor-content class="tiptap-editor__content" :editor="editor" />
      <div v-if="editor" class="character-count flex flex-column">
        <el-text>
          {{ editor.storage.characterCount.characters() + ' / '.concat(String(textLimit), $t('tiptap.characters')) }}
        </el-text>
        <el-text>
          {{ editor.storage.characterCount.words() + ' '.concat($t('tiptap.words')) }}
        </el-text>
      </div>
    </div>
    <HyperLinkDialog
      :visible="hyperLinkDialogTrigger"
      custom-class="tiptap-hyper-link-dialog"
      :title="$t('tiptap.dialog.hyperLinkTitle')"
      :double-first-text="$t('texts.save')"
      :double-second-text="$t('texts.close')"
      @submit-link="submitHyperLink"
      @close="(trigger:boolean) => hyperLinkDialogTrigger = trigger"
    />
    <YoutubeLinkDialog
      :visible="youtubeLinkDialogTrigger"
      custom-class="tiptap-youtube-link-dialog"
      :title="$t('tiptap.dialog.youtubeLinkTitle')"
      :double-first-text="$t('texts.save')"
      :double-second-text="$t('texts.close')"
      @submit-link="submitYoutubeLink"
      @close="(trigger:boolean) => youtubeLinkDialogTrigger = trigger"
    />
    <ImageUploadDialog
      :visible="imageUploadDialogTrigger"
      custom-class="tiptap-image-upload-dialog"
      :title="$t('tiptap.dialog.imageUploadTitle')"
      :double-first-text="$t('texts.save')"
      :double-second-text="$t('texts.close')"
      @submit-image="submitImage"
      @close="(trigger:boolean) => imageUploadDialogTrigger = trigger"
    />
  </client-only>
</template>

<script setup lang="ts">
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import starterKit from '@tiptap/starter-kit'
import textStyle from '@tiptap/extension-text-style'
import { Youtube } from '@tiptap/extension-youtube'
import { FontFamily } from '@tiptap/extension-font-family'
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
const { width: windowWidth } = useWindowSize()

const props = withDefaults(
  defineProps<{
    textData?: string,
    textLimit?: number,
    fullOption?: boolean,
    commentOption?: boolean
  }>(),
  {
    textData: '',
    textLimit: 300,
    fullOption: false,
    commentOption: false
  }
)

const emits = defineEmits([
  'update:model-value'
])

const editor = ref()

const hyperLinkDialogTrigger = ref(false)
const youtubeLinkDialogTrigger = ref(false)
const imageUploadDialogTrigger = ref(false)

onMounted(() => {
  editor.value = new Editor({
    content: props.textData,
    extensions: [
      starterKit,
      placeholder.configure({
        placeholder: t('tiptap.placeholder')
      }),
      characterCount.configure({
        limit: props.textLimit
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
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank'
        },
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
      FontFamily,
      Youtube.configure({
        progressBarColor: 'white',
        interfaceLanguage: 'ko',
        modestBranding: true,
        width: 400,
        height: 280
      }),
      useTiptapImage().BaseCustomMediaNode,
      Color
    ],
    onUpdate: () => {
      emits('update:model-value', editor.value?.getHTML())
    }
  })
})

watch(
  () => props.textData,
  (value) => {
    const isSame = editor.value?.getHTML() === value
    if (!isSame) {
      editor.value?.commands.setContent(value, false)
    }
  }
)

onBeforeUnmount(() => {
  editor.value.destroy()
  editor.value = null
})

const submitHyperLink = (link:string) => {
  link
    ? editor.value?.chain().focus().setLink({ href: link, target: '_blank' }).run()
    : editor.value?.chain().focus().unsetLink().run()
}

const submitYoutubeLink = (link:string) => {
  editor.value?.commands.setYoutubeVideo({
    src: link,
    width: windowWidth.value > 600 ? 400 : windowWidth.value - 100,
    height: windowWidth.value > 600 ? 280 : 200
  })
}

const submitImage = (imageUrl:string, hyperLink:string) => {
  editor.value?.chain().focus().setImage({ src: imageUrl, href: hyperLink === '' ? undefined : hyperLink }).run()
}

</script>
