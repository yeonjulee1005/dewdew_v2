<template>
  <div class="main-slider-section">
    <Carousel
      :items-to-show="sliderShowCount"
      :transition="1600"
      :autoplay="1800"
      :wrap-around="true"
      :touch-drag="touchDrag"
      :mouse-drag="mouseDrag"
    >
      <Slide
        v-for="item in imageSliderProps.imageData"
        :key="item.year"
      >
        <nuxt-link
          v-if="imageSliderProps.mainSliderTrigger"
          class="image-component"
          :to="item.route"
        >
          <nuxt-img
            class="image"
            :src="item.url"
            width="360"
            height="300"
            format="webp"
            fit="cover"
            :alt="item.title"
          />
          <div class="text-group">
            <p class="title">
              {{ title }}
            </p>
            <p class="subtitle">
              {{ item.year }}
            </p>
          </div>
        </nuxt-link>
        <div v-else class="image-component">
          <nuxt-img
            class="image"
            :src="item.url"
            width="360"
            height="300"
            format="webp"
            fit="cover"
            :alt="item.title"
            @click="imageClick(item)"
          />
        </div>
      </Slide>
    </Carousel>
  </div>
</template>
<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'
import { PropType } from 'vue'
import { ArchivesData } from '~/types/interfaces'
import 'vue3-carousel/dist/carousel.css'

const { width } = useWindowSize()
const imageSliderProps = defineProps({
  imageData: { type: Array as PropType<ArchivesData[]>, default: () => [] },
  touchDrag: { type: Boolean, default: true },
  mouseDrag: { type: Boolean, default: false },
  mainSliderTrigger: { type: Boolean, default: false }
})

const imageSliderEmits = defineEmits([
  'open-dialog'
])

const title = ref('HISTORY OF')
const sliderShowCount = ref(0)

watch(width, () => { handleResize(width.value) })

onMounted(() => {
  handleResize(width.value)
})

const handleResize = (width:number) => {
  width >= 500 ? sliderShowCount.value = 2.5 : sliderShowCount.value = 1.5
}

const imageClick = (imageData:ArchivesData) => {
  imageSliderEmits('open-dialog', imageData)
}
</script>
