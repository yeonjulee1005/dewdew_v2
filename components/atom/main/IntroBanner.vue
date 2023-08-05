<template>
  <div class="main-intro flex flex-justify-center">
    <div
      class="main-title"
      :class="{'main-title-on': mainTitleTrigger}"
    >
      {{ introText.mainTitle }}
    </div>
    <div
      class="main-text"
      :class="{'main-text-on': mainTextTrigger}"
    >
      <p
        v-for="item in introText.mainText"
        :key="item.index"
      >
        {{ locale === 'ko' ? item.textKo : item.textEn }}
      </p>
      <div class="sub-text">
        {{ locale === 'ko' ? introText.subText.textKo : introText.subText.textEn }}
      </div>
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

const { locale } = useLocale()

withDefaults(
  defineProps<{
    introText: IntroData,
    bannerImages?: string,
    mainTitleTrigger?: boolean,
    mainTextTrigger?: boolean,
    scrollDownTrigger?: boolean
  }>(),
  {
    bannerImages: '',
    mainTitleTrigger: false,
    mainTextTrigger: false,
    scrollDownTrigger: false
  }
)

</script>
