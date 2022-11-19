<template>
  <NuxtLayout>
    <div class="main-intro flex flex-justify-center">
      <div ref="mainTitle" class="main-title">
        FRONT END DEVELOPER
      </div>
      <div ref="mainText" class="main-text">
        <p>
          노력하는 사람은 즐기는 사람을 이길 수 없습니다.
        </p>
        <p>
          개발과 취미를 즐기며 살아가고 있는 FE 개발자 이연주입니다.
        </p>
        <div ref="subText" class="sub-text">
          본 페이지는' + ' \'' + 'Nuxt 3' + ' & ' + 'TypeScript' + '\'' + '으로 제작되었습니다.
        </div>
      </div>
      <div ref="scrollDown" class="scroll-down">
        👇🏻Scroll Down
      </div>
      <el-image class="main-image" :src="bannersImage" fit="cover" />
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">

const coreData = ref()
const coreImages = ref()

const imageData = ref<any[]>([])
const bannersImage = ref('')

const getCoreData = await useFetch('/api/query?col=core')
const getImageData = await useFetch('/api/query?col=images')

coreData.value = getCoreData.data.value
coreImages.value = getImageData.data.value

onMounted(() => {
  initData()
})

const initData = () => {
  coreImages.value.forEach((image:any) => {
    switch (image.id) {
      case 'assets' :
        bannersImage.value = image.data.banners.main.url
        break
      default :
        imageData.value.push(image)
        break
    }
  })
}
</script>
