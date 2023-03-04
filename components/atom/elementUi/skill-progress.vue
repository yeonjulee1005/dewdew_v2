<template>
  <div class="flex-align-center">
    <span class="skills-text">
      {{ progressData.title }}
    </span>
    <el-progress
      :text-inside="true"
      :stroke-width="23"
      :percentage="progressData.percent"
      :color="progressData.color"
      :indeterminate="true"
      :duration="progressData.duration"
      class="progress"
      :style="width"
      title="skills"
    >
      <span :style="progressData.style">
        {{ progressData.percentText }}
      </span>
    </el-progress>
  </div>
</template>

<script setup lang="ts">

defineProps({
  progressData: { type: Object, default: () => null },
  width: { type: String, default: 'width: 360px;' }
})

</script>
