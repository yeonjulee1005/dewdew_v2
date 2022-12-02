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
      :idle-trigger="idleTrigger"
      :texts="leaveText"
      :colors="colors"
      @dialog-close="dialogClose"
    />
  </el-container>
</template>

<script setup lang="ts">
import { useDatabase } from '~/stores/database'
import { Texts, Colors } from '~/interfaces/types'

const route = useRoute()
const { idle } = useIdle(10 * 60 * 1000)

useHead({
  meta: [{ property: 'og:title', content: `개발자 이연주 | ${route.meta.title}` }]
})

const coreData = useDatabase().coreData.value
const coreImages = useDatabase().imageData.value

const assetsImageData = ref([])
const leaveText = ref<Texts[]>([])
const colors = ref<Colors[]>([])
const idleTrigger = ref(false)

watch(idle, () => {
  idle.value ? idleTrigger.value = true : idleTrigger.value = false
})

console.log('여긴가? 시작', console.log(coreData))
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
console.log('여긴가? 종료', console.log(coreImages))
const dialogClose = (value:boolean) => {
  idleTrigger.value = value
}

</script>
