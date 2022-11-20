<template>
  <el-row class="flex-align-center">
    <span class="skills-text">
      {{ progressProps.progressData.title }}
    </span>
    <el-progress
      :text-inside="true"
      :stroke-width="23"
      :percentage="progressProps.progressData.percent"
      :color="progressProps.progressData.color"
      :indeterminate="true"
      :duration="progressProps.progressData.duration"
      class="progress"
      :style="progressProps.width"
    >
      <span :style="progressProps.progressData.style">
        {{ progressProps.progressData.percentText }}
      </span>
    </el-progress>
  </el-row>
</template>

<script setup lang="ts">
const progressProps = defineProps({
  progressData: { type: Object, default: () => null },
  width: { type: String, default: 'width: 300px;' }
})

</script>
