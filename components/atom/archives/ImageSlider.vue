<template>
  <div
    class="main-slider-section"
    :class="{'inner-slider-section': imageSliderProps.innerArchiveTrigger}"
  >
    <client-only>
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
            <nuxt-picture
              :src="item.url"
              width="360"
              height="300"
              format="webp"
              :img-attrs="{class: 'thumbnail'}"
              :alt="item.title"
            />
            <div class="text-group">
              <p class="title">
                {{ $t('archives.historyTitle') }}
              </p>
              <p class="subtitle">
                {{ item.year }}
              </p>
            </div>
          </nuxt-link>
          <div v-else class="image-component">
            <nuxt-picture
              :src="item.url"
              width="360"
              height="300"
              format="webp"
              :img-attrs="{class: 'thumbnail'}"
              :alt="item.title"
              @click="imageClick(item)"
            />
          </div>
        </Slide>
      </Carousel>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const { width } = useWindowSize()
const imageSliderProps = defineProps({
  imageData: { type: Array as PropType<ArchivesData[]>, default: () => [] },
  touchDrag: { type: Boolean, default: true },
  mouseDrag: { type: Boolean, default: false },
  mainSliderTrigger: { type: Boolean, default: false },
  innerArchiveTrigger: { type: Boolean, default: false }
})

const imageSliderEmits = defineEmits([
  'open-dialog'
])

const sliderShowCount = ref(0)

watch(width, () => { handleResize(width.value) })

onMounted(() => {
  handleResize(width.value)
})

const handleResize = (width:number) => {
  const showCount = [1.5, 1.75, 2.5]
  const caseWidth = Math.min(Math.floor(width / 500), 2)
  sliderShowCount.value = showCount[caseWidth]
}

const imageClick = (imageData:ArchivesData) => {
  imageSliderEmits('open-dialog', imageData)
}
</script>
