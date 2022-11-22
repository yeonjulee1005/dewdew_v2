<template>
  <el-container class="default-layout-container">
    <MoleculesAHeader
      :menu-list="menuData"
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
import { useDatabase } from '@/store/database'

const coreData = ref()
const coreImages = ref()

const menuData = ref([])
const assetsImageData = ref([])

coreData.value = useDatabase().coreData
coreImages.value = useDatabase().imageData

menuData.value = coreData.value.data.filter((core:any) => core.id === 'pages')[0].menu

coreImages.value.data.forEach((image:any) => {
  switch (image.id) {
    case 'assets' :
      assetsImageData.value = image.data
      break
  }
})

</script>
