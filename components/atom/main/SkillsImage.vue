<template>
  <div class="skill-images">
    <el-image
      v-for="image in skillsImageProps.skillsImage"
      :key="image.index"
      :class="image.title"
      :src="image.url"
    />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { Images } from '~/interfaces/types'

const skillsImageProps = defineProps({
  skillsImage: { type: Array as PropType<Images[]>, default: () => [] }
})
</script>
