<template>
  <div
    class="main-resume flex flex-justify-center flex-align-center"
    :class="{'main-resume-on': resumeProps.mainResumeTrigger}"
  >
    <div class="resume-container flex flex-row">
      <nuxt-picture
        class="resume-image flex flex-justify-center flex-align-center"
        :src="resumeProps.resumeImage"
        height="360"
        width="360"
        legacy-format="webp"
        fit="cover"
        :img-attrs="{class: 'dewdew'}"
        alt="dewdew"
      />
      <div class="resume-texts flex flex-column flex-justify-center">
        <div class="title-container mb-default">
          <p class="title">
            {{ resumeProps.resumeText.title }}
          </p>
          <p class="educate">
            {{ resumeProps.resumeText.educate }}
          </p>
        </div>
        <div
          v-for="content in resumeProps.resumeText.career"
          :key="content.index"
          class="career-container mt-5"
        >
          <p class="career-title">
            {{ content.title }}
          </p>
          <p class="career-desc">
            {{ content.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const resumeProps = defineProps({
  resumeText: { type: Object, default: () => null },
  resumeImage: { type: String, default: '' },
  mainResumeTrigger: { type: Boolean, default: false }
})
</script>
