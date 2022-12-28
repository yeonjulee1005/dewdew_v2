<template>
  <div
    class="skill-images"
    :class="{'skill-images-on': skillsImageProps.skillsBgTrigger}"
  >
    <nuxt-img
      v-for="image in skillsImageProps.skillsImage"
      :key="image.index"
      :class="image.title"
      height="500"
      width="500"
      format="webp"
      :src="image.url"
      :alt="image.title"
    />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { Images } from '~/types/interfaces'

const skillsImageProps = defineProps({
  skillsImage: { type: Array as PropType<Images[]>, default: () => [] },
  skillsBgTrigger: { type: Boolean, default: false }
})
</script>
