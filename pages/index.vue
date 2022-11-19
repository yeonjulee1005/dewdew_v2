<template>
  <NuxtLayout>
    <AtomMainIntroBanner
      :intro-text="introTextData"
      :banner-images="bannersImage"
    />
    <AtomMainResumeDesc
      :resume-text="resumeTextData"
      :resume-image="resumeImage"
    />
    <div class="main-skills flex flex-column">
      <AtomMainSkillsDescriptions
        :skills-text="skillsTextData"
      />
    </div>
    <div
      v-for="image in skillsImageData"
      :key="image.index"
      class="skill-image"
    >
      <el-image
        :class="image.title"
        :src="image.url"
      />
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { Images, IntroData, ResumeData, SkillsData } from '~/interfaces/types'

const getCoreData = await useFetch('/api/query?col=core')
const getImageData = await useFetch('/api/query?col=images')

const coreData = ref()
const coreImages = ref()

coreData.value = getCoreData.data.value
coreImages.value = getImageData.data.value

const introTextData = ref<IntroData>({
  mainText: [],
  mainTitle: '',
  subText: '',
  scrollDown: ''
})

const resumeTextData = ref<ResumeData>({
  title: '',
  educate: '',
  career: []
})

const skillsTextData = ref<SkillsData>({
  title: [],
  firstDesc: [],
  secondDesc: [],
  thirdDesc: []
})

const skillsImageData = ref<Images[]>([])

const imageData = ref<any[]>([])
const bannersImage = ref('')
const resumeImage = ref('')

onMounted(() => {
  initData()
})

const initData = () => {
  coreImages.value.forEach((image:any) => {
    switch (image.id) {
      case 'assets' :
        bannersImage.value = image.data.banners.main.url
        resumeImage.value = image.data.thumb.url
        break
      case 'resources' :
        skillsImageData.value = image.logos
        console.log(skillsImageData.value)
        break
      default :
        imageData.value.push(image)
        break
    }
  })
  coreData.value.forEach((core:any) => {
    switch (core.id) {
      case 'main' :
        introTextData.value = core.intro
        resumeTextData.value = core.resume
        skillsTextData.value = core.skills
        break
    }
  })
}

</script>
