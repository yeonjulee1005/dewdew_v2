<template>
  <el-container class="default-layout-container">
    <LazyAHeader
      :core-data="coreData"
      :images="assetsImageData"
    />
    <el-main class="main">
      <slot />
    </el-main>
    <LazyAFooter
      :core-data="coreData"
    />
    <LazyLeaveCounter
      :idle-trigger="idleTrigger"
      :texts="leaveText"
      :colors="colors"
      @dialog-close="dialogClose"
    />
  </el-container>
</template>

<script setup lang="ts">
import { useDatabase } from '~/stores/database'
import { Texts, Colors } from '~/types/interfaces'

const route = useRoute()
const { idle } = useIdle(10 * 60 * 1000)

useHead({
  meta: [{ property: 'og:title', content: `개발자 이연주 | ${route.meta.title}` }]
})

const assetsImageData = ref([])
const leaveText = ref<Texts[]>([])
const colors = ref<Colors[]>([])
const idleTrigger = ref(false)

const coreData = useDatabase().coreData.value
const coreImages = useDatabase().imageData.value

watch(idle, () => {
  idle.value && useRoute().path !== '/'
    ? idleTrigger.value = true
    : idleTrigger.value = false
})

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

const dialogClose = (value:boolean) => {
  idleTrigger.value = value
}
</script>
