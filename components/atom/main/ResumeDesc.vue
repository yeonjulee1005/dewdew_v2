<template>
  <div
    class="main-resume flex flex-justify-center flex-align-center"
    :class="{'main-resume-on': mainResumeTrigger}"
  >
    <div class="resume-container flex flex-row">
      <nuxt-picture
        class="resume-image flex flex-justify-center flex-align-center"
        :src="resumeImage"
        height="360"
        width="360"
        legacy-format="webp"
        loading="lazy"
        fit="cover"
        :img-attrs="{class: 'dewdew'}"
        alt="dewdew"
      />
      <div class="resume-texts flex flex-column flex-justify-center">
        <div class="title-container mb-default">
          <p class="title">
            {{ locale === 'ko' ? resumeText.title.textKo : resumeText.title.textEn }}
          </p>
          <p class="educate">
            {{ locale === 'ko' ? resumeText.educate.textKo : resumeText.educate.textEn }}
          </p>
        </div>
        <div
          v-for="content in resumeText.career"
          :key="content.index"
          class="career-container mt-5"
        >
          <p class="career-title">
            {{ locale === 'ko' ? content.title.textKo : content.title.textEn }}
          </p>
          <p class="career-desc">
            {{ locale === 'ko' ? content.desc.textKo : content.desc.textEn }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { locale } = useLocale()

withDefaults(
  defineProps<{
    resumeText: ResumeData,
    resumeImage?: string,
    mainResumeTrigger?: boolean
  }>(),
  {
    resumeImage: '',
    mainResumeTrigger: false
  }
)

</script>
