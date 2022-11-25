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
      :skills-text-trigger="mainSkillsTextTrigger"
      :skills-bg-trigger="mainSkillsBgTrigger"
      :skills-list-trigger="mainSkillsListTrigger"
    />
    <AtomMainReferenceList
      :reference-text-data="referenceTextData"
      :reference-image-data="referencesImageData"
      :reference-list-trigger="referenceListTrigger"
    />
    <AtomMainContactMe
      :contact-data="contactTextData"
      :kakao-image="kakaoImage"
      :contact-trigger="contactTrigger"
    />
    <el-backtop :bottom="60" :right="60" />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useDatabase } from '~/stores/database'
import { CoreData, Images, IntroData, ResumeData, SkillsData, ReferenceData, ReferenceImage, ContactData } from '~/interfaces/types'

const coreData:CoreData[] = useDatabase().coreData.value
const coreImages = useDatabase().imageData.value

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
const contactTextData = ref<ContactData>({
  id: '',
  title: '',
  email: {
    key: '',
    template: '',
    title: ''
  },
  kakaoTalk: {
    title: '',
    url: '',
    desc: ''
  }
})

const imageData = ref<any[]>([])
const bannersImage = ref('')
const resumeImage = ref('')
const kakaoImage = ref('')

const skillsImageData = ref<Images[]>([])
const referencesImageData = ref<ReferenceImage[]>([])

const mainTitleTrigger = ref(false)
const mainTextTrigger = ref(false)
const scrollDownTrigger = ref(false)

const mainResumeTrigger = ref(false)
const mainSkillsTextTrigger = ref(false)
const mainSkillsBgTrigger = ref(false)
const mainSkillsListTrigger = ref(false)
const referenceListTrigger = ref(false)
const contactTrigger = ref(false)

const lastScrollY = ref(0)

onMounted(() => {
  initData()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const initData = () => {
  coreImages.forEach((image:any) => {
    switch (image.id) {
      case 'assets' :
        bannersImage.value = image.data.banners.main.url
        resumeImage.value = image.data.thumb.url
        kakaoImage.value = image.data.kakao.url
        break
      case 'resources' :
        skillsImageData.value = image.logos
        referencesImageData.value = image.references
        break
      default :
        imageData.value.push(image)
        break
    }
  })
  coreData.forEach((core:any) => {
    switch (core.id) {
      case 'main' :
        introTextData.value = core.intro
        resumeTextData.value = core.resume
        skillsTextData.value = core.skills
        referenceTextData.value = core.reference
        contactTextData.value = core.contact
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

  if (windowWidth > 1000) {
    titleRange = scrollY > 100 && scrollY < 550
    textRange = scrollY > 120 && scrollY < 600
    downRange = scrollY > 140 && scrollY < 650
    mainResumeTrigger.value = scrollY > 150 && scrollY < 1250
    mainSkillsTextTrigger.value = scrollY > 1300 && scrollY < 2200
    mainSkillsBgTrigger.value = scrollY > 900 && scrollY < 2700
    mainSkillsListTrigger.value = scrollY > 2300 && scrollY < 3800
    referenceListTrigger.value = scrollY > 4000 && scrollY < 5800
    contactTrigger.value = scrollY > 5500
  } else if (windowWidth > 500 && windowWidth < 1000) {
    titleRange = scrollY > 250 && scrollY < 350
    textRange = scrollY > 400 && scrollY < 500
    downRange = scrollY > 400 && scrollY < 500
    mainResumeTrigger.value = scrollY > 200 && scrollY < 1250
    mainSkillsTextTrigger.value = scrollY > 1500 && scrollY < 2600
    mainSkillsBgTrigger.value = scrollY > 1200 && scrollY < 2600
    mainSkillsListTrigger.value = scrollY > 2700 && scrollY < 5100
    referenceListTrigger.value = scrollY > 5000 && scrollY < 7300
    contactTrigger.value = scrollY > 7200
  } else {
    titleRange = scrollY > 150 && scrollY < 250
    textRange = scrollY > 350 && scrollY < 450
    downRange = scrollY > 200 && scrollY < 300
    mainResumeTrigger.value = scrollY > 200 && scrollY < 1400
    mainSkillsTextTrigger.value = scrollY > 1500 && scrollY < 2600
    mainSkillsBgTrigger.value = scrollY > 1300 && scrollY < 2600
    mainSkillsListTrigger.value = scrollY > 2300 && scrollY < 5100
    referenceListTrigger.value = scrollY > 5000 && scrollY < 8800
    contactTrigger.value = scrollY > 8800
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
