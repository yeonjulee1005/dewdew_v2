<template>
  <div class="skills-descriptions flex flex-column">
    <span
      v-for="(item, index) in skillsDescProps.skillsText.title"
      :key="index"
      class="skills-text"
    >
      {{ item.text }}
    </span>
    <span
      v-for="(item, index) in skillsDescProps.skillsText.firstDesc"
      :key="index"
      class="skills-text"
    >
      {{ item.text }}
    </span>
    <span
      v-for="(item, index) in skillsDescProps.skillsText.secondDesc"
      :key="index"
      class="skills-text"
    >
      {{ item.text }}
    </span>
    <span
      v-for="(item, index) in skillsDescProps.skillsText.thirdDesc"
      :key="index"
      class="skills-text"
    >
      {{ item.text }}
    </span>
    <div class="skills-title-box" />
  </div>
</template>
<script setup lang="ts">
const skillsDescProps = defineProps({
  skillsText: { type: Object, default: () => null }
})
</script>
