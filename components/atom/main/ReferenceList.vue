<template>
  <div
    class="main-references flex flex-column flex-justify-center"
    :class="{'main-references-on': referenceProps.referenceListTrigger}"
  >
    <div class="section-title">
      {{ referenceTextData.title }}
    </div>
    <div class="section-text">
      {{ referenceTextData.desc }}
    </div>
    <div class="section-bg-text">
      {{ referenceTextData.background }}
    </div>
    <div class="references-list flex flex-row flex-wrap flex-justify-center flex-align-center mx-80">
      <div
        v-for="item in referenceProps.referenceImageData"
        :key="item.index"
        class="reference-item flex flex-column"
      >
        <div
          class="reference-item flex flex-column flex-align-center"
          @click="clickReference(item)"
        >
          <nuxt-img
            class="reference-thumb"
            :src="item.image"
            width="200"
            height="200"
            fit="cover"
            :alt="item.alt"
          />
          <div class="reference-text mt-default">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="reference-background" />
    <div class="reference-background" />
    <MoleculesADialog
      :dialog-trigger="referenceDialogTrigger"
      custom-class="reference-dialog"
      @close-dialog="closeReferenceDialog"
    >
      <div class="title mb-default">
        {{ selectReference.title }}
      </div>
      <div class="description mb-default">
        {{ selectReference.desc }}
      </div>
      <el-image
        :src="selectReference.detailsImage"
        class="image"
        loading="eager"
        :alt="selectReference.alt"
        @click="openReference"
      />
    </MoleculesADialog>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { ReferenceImage } from '~/types/interfaces'

const selectReference = ref<ReferenceImage>({
  alt: '',
  desc: '',
  detailsImage: '',
  image: '',
  index: 0,
  title: '',
  url: ''
})
const referenceDialogTrigger = ref(false)

const referenceProps = defineProps({
  referenceTextData: { type: Object, default: () => null },
  referenceImageData: { type: Array as PropType<ReferenceImage[]>, default: () => [] },
  referenceListTrigger: { type: Boolean, default: false }
})

const openReference = () => {
  window.open(selectReference.value.url, '_blank')
}

const clickReference = (data:ReferenceImage) => {
  selectReference.value = data
  referenceDialogTrigger.value = true
}

const closeReferenceDialog = () => {
  referenceDialogTrigger.value = false
}

</script>
