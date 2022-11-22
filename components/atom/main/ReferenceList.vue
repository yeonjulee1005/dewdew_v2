<template>
  <div class="main-references flex flex-column flex-justify-center">
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
          <el-image
            class="reference-thumb"
            :src="item.image"
            fit="cover"
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
      @close-dialog="closeReferenceDialog"
    >
      <div>
        {{ selectReference.title }}
      </div>
      <div>
        {{ selectReference.desc }}
      </div>
      <el-image :src="selectReference.detailsImage" />
    </MoleculesADialog>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { ReferenceImage } from '~/interfaces/types'

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
  referenceImageData: { type: Array as PropType<ReferenceImage[]>, default: () => [] }
})

const clickReference = (data:ReferenceImage) => {
  selectReference.value = data
  referenceDialogTrigger.value = true
}

const closeReferenceDialog = () => {
  referenceDialogTrigger.value = false
}

</script>
