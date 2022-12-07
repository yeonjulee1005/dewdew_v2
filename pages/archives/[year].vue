<template>
  <div>
    <el-button class="prev-button" round @click="routerBack">
      {{ prev }}
    </el-button>
    <AtomArchivesImageSlider
      :image-data="imageData"
      @open-dialog="openImageDialog"
    />
    <MoleculesADialog
      :dialog-trigger="imageDialogTrigger"
      @close-dialog="closeImageDialog"
    >
      <el-image
        :src="selectImageData?.url"
      />
    </MoleculesADialog>
  </div>
</template>
<script setup lang="ts">
import { ArchivesData, MassImages } from '~/interfaces/types'
import { useDatabase } from '~/stores/database'

const route = useRoute()

useHead({
  title: '아카이브',
  meta: [
    { property: 'description', content: 'FE개발자 이연주의 사진기록 입니다.' },
    { property: 'og:title', content: '개발자 이연주 | 아카이브' },
    { property: 'og:url', content: `https://dewdew.kr${route.path}` },
    { property: 'og:description', content: 'FE개발자 이연주의 사진기록 입니다.' }
  ]
})

definePageMeta({
  title: 'Images'
})

const coreImages = useDatabase().imageData.value
const routeUrl = useRoute().path

const imageData = ref<ArchivesData[]>([])
const selectImageData = ref<MassImages>()
const prev = ref('뒤로가기')
const imageDialogTrigger = ref(false)

onMounted(() => {
  initImageData()
})

const initImageData = () => {
  if (!coreImages.length) {
    useRouter().push('/')
  }
  imageData.value = []
  coreImages.forEach((images:any) => {
    if (images.id === routeUrl.split('/')[2]) {
      imageData.value = images.data
    }
  })
}

const openImageDialog = (imageData:MassImages) => {
  selectImageData.value = imageData
  imageDialogTrigger.value = true
}

const closeImageDialog = () => {
  imageDialogTrigger.value = false
}

const routerBack = () => {
  useRouter().push('/'.concat(routeUrl.split('/')[1]))
}

</script>
