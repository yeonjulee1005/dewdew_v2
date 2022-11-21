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

const coreData = ref()
const coreImages = ref()

const menuData = ref([])
const infoData = ref({})
const imageData = ref<any[]>([])
const assetsImageData = ref([])

const getCoreData = await useFetch('/api/query?col=core')
const getImageData = await useFetch('/api/query?col=images')

coreData.value = getCoreData.data.value
coreImages.value = getImageData.data.value

menuData.value = coreData.value.filter((core:any) => core.id === 'pages')[0].menu
infoData.value = coreData.value[0].info

coreImages.value.forEach((image:any) => {
  switch (image.id) {
    case 'assets' :
      assetsImageData.value = image.data
      break
    default :
      imageData.value.push(image)
      break
  }
})

</script>
