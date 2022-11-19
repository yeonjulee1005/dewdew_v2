<template>
  <div class="main-intro flex flex-justify-center">
    <div
      class="main-title"
      :class="{'main-title-off': mainTitleTrigger}"
    >
      {{ mainIntroProps.introText.mainTitle }}
    </div>
    <div
      class="main-text"
      :class="{'main-text-off': mainTextTrigger}"
    >
      <p
        v-for="item in mainIntroProps.introText.mainText"
        :key="item.index"
      >
        {{ item.text }}
      </p>
      <div class="sub-text">
        {{ mainIntroProps.introText.subText }}
      </div>
    </div>
    <div
      ref="scrollDown"
      class="scroll-down"
      :class="{'main-scroll-off': scrollDownTrigger}"
    >
      {{ mainIntroProps.introText.scrollDown }}
    </div>
    <el-image class="main-image" :src="mainIntroProps.bannerImages" fit="cover" />
  </div>
</template>
<script setup lang=ts>
import { PropType } from 'vue'
import { IntroData } from '~/interfaces/types'

const mainTitleTrigger = ref(false)
const mainTextTrigger = ref(false)
const scrollDownTrigger = ref(false)

const lastScrollY = ref(0)

const mainIntroProps = defineProps({
  introText: { type: Object as PropType<IntroData>, default: () => null },
  bannerImages: { type: String, default: '' }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  const scrollY = window.scrollY
  const direction = scrollY > lastScrollY.value ? 'down' : 'up'
  lastScrollY.value = scrollY

  const titleRange = scrollY > 450 && scrollY <= 550
  const textRange = scrollY > 520 && scrollY <= 620
  const downRange = scrollY > 560 && scrollY <= 660
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
