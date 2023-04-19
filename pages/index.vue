<template>
  <div>
    <LazyIntroBanner
      :intro-text="introTextData"
      :banner-images="bannersImage"
      :main-title-trigger="mainTitleTrigger"
      :main-text-trigger="mainTextTrigger"
      :scroll-down-trigger="scrollDownTrigger"
    />
    <LazyResumeDesc
      :resume-text="resumeTextData"
      :resume-image="resumeImage"
      :main-resume-trigger="mainResumeTrigger"
    />
    <LazySkillContents
      :skills-text="skillsTextData"
      :skills-image="skillsImageData"
      :skills-text-trigger="mainSkillsTextTrigger"
      :skills-bg-trigger="mainSkillsBgTrigger"
      :skills-list-trigger="mainSkillsListTrigger"
    />
    <LazyReferenceList
      :reference-text-data="referenceTextData"
      :reference-image-data="referencesImageData"
      :reference-list-trigger="referenceListTrigger"
    />
    <LazyContactMe
      :contact-data="contactTextData"
      :kakao-image="kakaoImage"
      :contact-trigger="contactTrigger"
    />
    <el-backtop :bottom="120" :right="30" />
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'default'
})

useHead({
  meta: [{ property: 'og:title', content: '개발자 이연주 | dewdew' }]
})

const { width } = useWindowSize()
const { y } = useWindowScroll()

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

const imageData = ref<MassImageData[]>([])
const bannersImage = ref('')
const resumeImage = ref('')
const kakaoImage = ref('')

const skillsImageData = ref<Images[]>([])
const referencesImageData = ref<ReferenceImage[]>([])

const mainTitleTrigger = ref(true)
const mainTextTrigger = ref(true)
const scrollDownTrigger = ref(true)
const mainResumeTrigger = ref(false)
const mainSkillsTextTrigger = ref(false)
const mainSkillsBgTrigger = ref(false)
const mainSkillsListTrigger = ref(false)
const referenceListTrigger = ref(false)
const contactTrigger = ref(false)

watch(y, () => {
  scrollDetect()
})

const initData = async () => {
  await coreImages.forEach((image:any) => {
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
  await coreData.forEach((core:any) => {
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

initData()

const scrollDetect = () => {
  const scrollY = y.value
  const windowWidth = width.value
  const scrollValue = Math.min(Math.ceil(windowWidth / 500), 3) - 1

  switch (scrollValue) {
    case 0 :
      mobile(scrollY)
      break
    case 1 :
      tablet(scrollY)
      break
    case 2 :
      pc(scrollY)
      break
  }
}

const mobile = (scrollY:number) => {
  mainTitleTrigger.value = scrollY < 200
  mainTextTrigger.value = scrollY < 350
  scrollDownTrigger.value = scrollY < 440
  mainResumeTrigger.value = scrollY > 200 && scrollY < 1400
  mainSkillsTextTrigger.value = scrollY > 1500 && scrollY < 2600
  mainSkillsBgTrigger.value = scrollY > 1300 && scrollY < 2900
  mainSkillsListTrigger.value = scrollY > 2600 && scrollY < 5000
  referenceListTrigger.value = scrollY > 5000 && scrollY < 8900
  contactTrigger.value = scrollY > 8800
}

const tablet = (scrollY:number) => {
  mainTitleTrigger.value = scrollY < 300
  mainTextTrigger.value = scrollY < 500
  scrollDownTrigger.value = scrollY < 500
  mainResumeTrigger.value = scrollY > 300 && scrollY < 1600
  mainSkillsTextTrigger.value = scrollY > 1500 && scrollY < 2600
  mainSkillsBgTrigger.value = scrollY > 1200 && scrollY < 2600
  mainSkillsListTrigger.value = scrollY > 2700 && scrollY < 5100
  referenceListTrigger.value = scrollY > 5000 && scrollY < 7300
  contactTrigger.value = scrollY > 7200
}

const pc = (scrollY:number) => {
  mainTitleTrigger.value = scrollY < 500
  mainTextTrigger.value = scrollY < 450
  scrollDownTrigger.value = scrollY < 650
  mainResumeTrigger.value = scrollY > 150 && scrollY < 1250
  mainSkillsTextTrigger.value = scrollY > 1300 && scrollY < 2200
  mainSkillsBgTrigger.value = scrollY > 900 && scrollY < 2700
  mainSkillsListTrigger.value = scrollY > 2300 && scrollY < 3800
  referenceListTrigger.value = scrollY > 4000 && scrollY < 5800
  contactTrigger.value = scrollY > 5500
}

</script>
