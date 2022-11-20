<template>
  <NuxtLayout>
    <AtomMainIntroBanner
      :intro-text="introTextData"
      :banner-images="bannersImage"
      :main-title-trigger="mainTitleTrigger"
      :main-text-trigger="mainTextTrigger"
      :scroll-down-trigger="scrollDownTrigger"
    />
    <AtomMainResumeDesc
      :resume-text="resumeTextData"
      :resume-image="resumeImage"
      :main-resume-trigger="mainResumeTrigger"
    />
    <AtomMainSkillContents
      :skills-text="skillsTextData"
      :skills-image="skillsImageData"
    />
    <div class="main-references flex flex-column flex-justify-center">
      <div class="section-title">
        {{ referenceTextData.title }}
      </div>
      <div class="section-text">
        {{ referenceTextData.desc }}
      </div>
      <div class="section-bg-text">
        {{ referenceTextData.background }}
      </div>
      <div class="references-list flex flex-row flex-wrap flex-justify-center flex-align-center mx-80">
        <div
          v-for="item in referencesImageData"
          :key="item.index"
          class="reference-item flex flex-column"
        >
          <div class="reference-item flex flex-column flex-align-center">
            <el-image
              class="reference-thumb"
              :src="item.image"
              fit="cover"
            />
            <div class="reference-text mt-default">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="reference-background" />
      <div class="reference-background" />
    </div>
    <MoleculesAFooter
      :core-data="coreData"
    />
    <el-backtop :bottom="60" :right="60" />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { Images, IntroData, ResumeData, SkillsData, ReferenceData, ReferenceImage } from '~/interfaces/types'

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
const referenceTextData = ref<ReferenceData>({
  title: '',
  desc: '',
  background: ''
})

const imageData = ref<any[]>([])
const bannersImage = ref('')
const resumeImage = ref('')

const skillsImageData = ref<Images[]>([])
const referencesImageData = ref<ReferenceImage[]>([])

const mainTitleTrigger = ref(false)
const mainTextTrigger = ref(false)
const scrollDownTrigger = ref(false)
const mainResumeTrigger = ref(false)

const lastScrollY = ref(0)

onMounted(() => {
  initData()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
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
        referencesImageData.value = image.references
        console.log(referencesImageData.value)
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
        referenceTextData.value = core.reference
        break
    }
  })
}

const handleScroll = () => {
  const scrollY = window.scrollY
  const windowWidth = window.innerWidth
  const direction = scrollY > lastScrollY.value ? 'down' : 'up'
  let titleRange = false
  let textRange = false
  let downRange = false
  let resumeRange = false

  if (windowWidth > 1000) {
    titleRange = scrollY > 450 && scrollY <= 550
    textRange = scrollY > 520 && scrollY <= 620
    downRange = scrollY > 560 && scrollY <= 660
    resumeRange = scrollY > 150 && scrollY < 1250
  } else if (windowWidth > 500 || windowWidth <= 1000) {
    titleRange = scrollY > 450 && scrollY <= 550
    textRange = scrollY > 520 && scrollY <= 620
    downRange = scrollY > 560 && scrollY <= 660
  } else {
    titleRange = scrollY > 450 && scrollY <= 550
    textRange = scrollY > 520 && scrollY <= 620
    downRange = scrollY > 560 && scrollY <= 660
  }
  lastScrollY.value = scrollY
  if (titleRange) {
    transitionMainTitle(direction)
  }
  if (textRange) {
    transitionMainText(direction)
  }
  if (downRange) {
    transitionScrollDown(direction)
  }
  mainResumeTrigger.value = resumeRange
}

const transitionMainTitle = (direction:string) => {
  direction === 'down' ? mainTitleTrigger.value = true : mainTitleTrigger.value = false
}

const transitionMainText = (direction:string) => {
  direction === 'down' ? mainTextTrigger.value = true : mainTextTrigger.value = false
}

const transitionScrollDown = (direction:string) => {
  direction === 'down' ? scrollDownTrigger.value = true : scrollDownTrigger.value = false
}

</script>
