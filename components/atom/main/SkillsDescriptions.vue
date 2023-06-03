<template>
  <div
    class="skills-descriptions flex flex-column"
    :class="{'skills-descriptions-on': skillsTextTrigger}"
  >
    <span
      v-for="(item, index) in skillsText.title"
      :key="index"
      class="skills-text"
    >
      {{ locale === 'ko' ? item.textKo : item.textEn }}
    </span>
    <span
      v-for="(item, index) in skillsText.firstDesc"
      :key="index"
      class="skills-text"
    >
      {{ locale === 'ko' ? item.textKo : item.textEn }}
    </span>
    <span
      v-for="(item, index) in skillsText.secondDesc"
      :key="index"
      class="skills-text"
    >
      {{ locale === 'ko' ? item.textKo : item.textEn }}
    </span>
    <span
      v-for="(item, index) in skillsText.thirdDesc"
      :key="index"
      class="skills-text"
    >
      {{ locale === 'ko' ? item.textKo : item.textEn }}
    </span>
    <div class="skills-title-box" />
  </div>
</template>

<script setup lang="ts">

const { locale } = useLocale()

defineProps({
  skillsText: { type: Object, default: () => null },
  skillsTextTrigger: { type: Boolean, default: false }
})

</script>
