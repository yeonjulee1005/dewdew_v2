<template>
  <div class="main-intro flex flex-justify-center">
    <div
      class="main-title"
      :class="{'main-title-on': mainIntroProps.mainTitleTrigger}"
    >
      {{ mainIntroProps.introText.mainTitle }}
    </div>
    <div
      v-if="mainIntroProps.introText.subText"
      class="main-text"
      :class="{'main-text-on': mainIntroProps.mainTextTrigger}"
    >
      <p
        v-for="item in mainIntroProps.introText.mainText"
        :key="item.index"
      >
        {{ item.text }}
      </p>
      <p class="sub-text">
        {{ mainIntroProps.introText.subText }}
      </p>
    </div>
    <div
      ref="scrollDown"
      class="scroll-down"
      :class="{'main-scroll-on': mainIntroProps.scrollDownTrigger}"
    >
      {{ mainIntroProps.introText.scrollDown }}
    </div>
    <el-image class="main-image" :src="mainIntroProps.bannerImages" fit="cover" alt="banner" />
  </div>
</template>
<script setup lang=ts>
import { PropType } from 'vue'
import { IntroData } from '~/types/interfaces'

const mainIntroProps = defineProps({
  introText: { type: Object as PropType<IntroData>, default: () => null },
  bannerImages: { type: String, default: '' },
  mainTitleTrigger: { type: Boolean, default: false },
  mainTextTrigger: { type: Boolean, default: false },
  scrollDownTrigger: { type: Boolean, default: false }
})

</script>
