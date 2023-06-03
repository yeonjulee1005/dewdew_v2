<template>
  <div
    class="main-references flex flex-column flex-justify-center"
    :class="{'main-references-on': referenceListTrigger}"
  >
    <div class="section-title">
      {{ locale === 'ko' ? referenceTextData.title.textKo : referenceTextData.title.textEn }}
    </div>
    <div class="section-text">
      {{ locale === 'ko' ? referenceTextData.desc.textKo : referenceTextData.desc.textEn }}
    </div>
    <div class="section-bg-text">
      {{ referenceTextData.background }}
    </div>
    <div class="references-list flex flex-row flex-wrap flex-justify-center flex-align-center mx-80">
      <div
        v-for="item in referenceImageData"
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
            format="webp"
            loading="lazy"
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
    <LazyADialog
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
      <nuxt-picture
        class="detail-image"
        :src="selectReference.detailsImage"
        width="2000"
        height="2400"
        format="webp"
        fit="cover"
        :alt="selectReference.alt"
        :img-attrs="{class: 'image'}"
        @click="openReference"
      />
    </LazyADialog>
  </div>
</template>

<script setup lang="ts">

const { locale } = useLocale()

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

defineProps({
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
