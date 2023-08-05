<template>
  <client-only>
    <el-popover
      trigger="hover"
      width="auto"
      :show-arrow="false"
      popper-class="tiptap-editor-group-menu font-family-group flex-wrap"
    >
      <template #reference>
        <el-button class="first-tiptap-menu-item">
          <Icon icon="ri:font-family" />
        </el-button>
      </template>
      <LazyEditTextButtons
        :is-active="tiptapEditor.isActive('textStyle', { fontFamily: 'Pretendard' })"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().setFontFamily('Pretendard').run() : null"
        font-family-name="Pretendard"
        :text="$t('tiptap.pretendard')"
      />
      <LazyEditTextButtons
        :is-active="tiptapEditor.isActive('textStyle', { fontFamily: 'DungGeunMo' })"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().setFontFamily('DungGeunMo').run() : null"
        font-family-name="DungGeunMo"
        :text="$t('tiptap.dungGeunMo')"
      />
      <LazyEditTextButtons
        :is-active="tiptapEditor.isActive('textStyle', { fontFamily: 'Shilla_CultureB-Bold' })"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().setFontFamily('Shilla_CultureB-Bold').run() : null"
        font-family-name="Shilla_CultureB-Bold"
        :text="$t('tiptap.shillaCulture')"
      />
      <LazyEditTextButtons
        :is-active="tiptapEditor.isActive('textStyle', { fontFamily: 'EliceDigitalBaeum_Bold' })"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().setFontFamily('EliceDigitalBaeum_Bold').run() : null"
        font-family-name="EliceDigitalBaeum_Bold"
        :text="$t('tiptap.eliceDigital')"
      />
      <LazyEditTextButtons
        :is-active="tiptapEditor.isActive('textStyle', { fontFamily: 'KOTRAHOPE' })"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().setFontFamily('KOTRAHOPE').run() : null"
        font-family-name="KOTRAHOPE"
        :text="$t('tiptap.kotraHope')"
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
