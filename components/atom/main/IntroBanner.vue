<template>
  <div class="main-intro flex flex-justify-center">
    <div
      class="main-title"
      :class="{'main-title-off': mainIntroProps.mainTitleTrigger}"
    >
      {{ mainIntroProps.introText.mainTitle }}
    </div>
    <div
      class="main-text"
      :class="{'main-text-off': mainIntroProps.mainTextTrigger}"
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
      :class="{'main-scroll-off': mainIntroProps.scrollDownTrigger}"
    >
      {{ mainIntroProps.introText.scrollDown }}
    </div>
    <el-image class="main-image" :src="mainIntroProps.bannerImages" fit="cover" />
  </div>
</template>
<script setup lang=ts>
import { PropType } from 'vue'
import { IntroData } from '~/interfaces/types'

const mainIntroProps = defineProps({
  introText: { type: Object as PropType<IntroData>, default: () => null },
  bannerImages: { type: String, default: '' },
  mainTitleTrigger: { type: Boolean, default: false },
  mainTextTrigger: { type: Boolean, default: false },
  scrollDownTrigger: { type: Boolean, default: false }
})

</script>
