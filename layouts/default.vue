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
import { useDatabase } from '~/stores/database'

const coreData = useDatabase().coreData.value
const coreImages = useDatabase().imageData.value

const menuData = ref([])
const assetsImageData = ref([])

menuData.value = coreData.filter((core:any) => core.id === 'pages')[0].menu

coreImages.forEach((image:any) => {
  switch (image.id) {
    case 'assets' :
      assetsImageData.value = image.data
      break
  }
})

</script>
