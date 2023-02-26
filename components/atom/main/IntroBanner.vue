<template>
  <div class="main-intro flex flex-justify-center">
    <div
      class="main-title"
      :class="{'main-title-on': mainTitleTrigger}"
    >
      {{ introText.mainTitle }}
    </div>
    <div
      v-if="introText.subText"
      class="main-text"
      :class="{'main-text-on': mainTextTrigger}"
    >
      <p
        v-for="item in introText.mainText"
        :key="item.index"
      >
        {{ item.text }}
      </p>
      <p class="sub-text">
        {{ introText.subText }}
      </p>
    </div>
    <div
      ref="scrollDown"
      class="scroll-down"
      :class="{'main-scroll-on': scrollDownTrigger}"
    >
      {{ introText.scrollDown }}
    </div>
    <nuxt-picture
      :src="bannerImages"
      class="main-banner"
      width="2000"
      height="1333"
      legacy-format="webp"
      fit="cover"
      alt="main-banner"
      :img-attrs="{class: 'banner'}"
    />
  </div>
</template>
<script setup lang=ts>

defineProps({
  introText: { type: Object as PropType<IntroData>, default: () => null },
  bannerImages: { type: String, default: '' },
  mainTitleTrigger: { type: Boolean, default: false },
  mainTextTrigger: { type: Boolean, default: false },
  scrollDownTrigger: { type: Boolean, default: false }
})

</script>
