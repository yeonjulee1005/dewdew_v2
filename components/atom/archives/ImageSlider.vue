<template>
  <div class="main-slider-section">
    <Carousel
      :items-to-show="2.5"
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
          <el-image
            class="image"
            :src="item.url"
            fit="cover"
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
          <el-image
            class="image"
            :src="item.url"
            fit="cover"
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
import { ArchivesData } from '~~/interfaces/types'
import 'vue3-carousel/dist/carousel.css'

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

const imageClick = (imageData:ArchivesData) => {
  imageSliderEmits('open-dialog', imageData)
}
</script>
