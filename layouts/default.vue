<template>
  <el-container class="default-layout-container">
    <LazyAHeader
      :core-data="coreData"
      :images="assetsImageData"
    />
    <el-main class="main">
      <InstallPwa />
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

const { idle } = useIdle(10 * 60 * 1000)

const assetsImageData = ref([])
const leaveText = ref<Texts[]>([])
const colors = ref<Colors[]>([])
const idleTrigger = ref(false)

const coreData = useDatabase().coreData.value
const coreImages = useDatabase().imageData.value

watch(idle, () => {
  idle.value
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
