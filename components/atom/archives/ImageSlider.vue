<template>
  <div
    class="main-slider-section"
    :class="{'inner-slider-section': props.innerArchiveTrigger}"
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
          v-for="item in props.imageData"
          :key="item.year"
        >
          <nuxt-link
            v-if="props.mainSliderTrigger"
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
              @click="$emit('open-dialog', item)"
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

const sliderShowCount = ref(0)

const props = withDefaults(
  defineProps<{
    imageData: ArchivesData[],
    touchDrag?: boolean,
    mouseDrag?: boolean,
    mainSliderTrigger?: boolean,
    innerArchiveTrigger?: boolean
  }>(),
  {
    touchDrag: true,
    mouseDrag: false,
    mainSliderTrigger: false,
    innerArchiveTrigger: false
  }
)

defineEmits([
  'open-dialog'
])

watch(width, () => { handleResize(width.value) })

onMounted(() => {
  handleResize(width.value)
})

const handleResize = (width:number) => {
  const showCount = [1.5, 1.75, 2.5]
  const caseWidth = Math.min(Math.floor(width / 500), 2)
  sliderShowCount.value = showCount[caseWidth]
}

</script>
