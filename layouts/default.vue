<template>
  <el-container class="default-layout-container">
    <MoleculesAHeader
      :core-data="coreData"
      :images="assetsImageData"
    />
    <el-main class="main">
      <slot />
    </el-main>
    <MoleculesAFooter
      :core-data="coreData"
    />
  </el-container>
</template>

<script setup lang="ts">
import { useDatabase } from '~/stores/database'

const route = useRoute()

useHead({
  meta: [{ property: 'og:title', content: `개발자 이연주 | ${route.meta.title}` }]
})

const coreData = useDatabase().coreData.value
const coreImages = useDatabase().imageData.value

const assetsImageData = ref([])

coreImages.forEach((image:any) => {
  switch (image.id) {
    case 'assets' :
      assetsImageData.value = image.data
      break
  }
})

</script>
