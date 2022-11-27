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
    <AtomDialogLeaveCounter
      :texts="leaveText"
      :colors="colors"
    />
  </el-container>
</template>

<script setup lang="ts">
import { useDatabase } from '~/stores/database'
import { Texts, Colors } from '~/interfaces/types'

const route = useRoute()

useHead({
  meta: [{ property: 'og:title', content: `개발자 이연주 | ${route.meta.title}` }]
})

const coreData = useDatabase().coreData.value
const coreImages = useDatabase().imageData.value

const assetsImageData = ref([])

const leaveText = ref<Texts[]>([])
const colors = ref<Colors[]>([])

coreData.forEach((core:any) => {
  switch (core.id) {
    case 'main' :
      leaveText.value = core.leaveCount.texts
      colors.value = core.leaveCount.colors
      break
  }
})

coreImages.forEach((image:any) => {
  switch (image.id) {
    case 'assets' :
      assetsImageData.value = image.data
      break
  }
})

</script>
