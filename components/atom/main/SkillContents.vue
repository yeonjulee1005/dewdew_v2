<template>
  <div class="main-skills flex flex-column">
    <AtomMainSkillsDescriptions
      :skills-text="skillsProps.skillsText"
    />
    <AtomMainSkillsImage
      :skills-image="skillsProps.skillsImage"
    />
    <div class="skill-list">
      <div class="frontend-list flex flex-column flex-justify-center mb-40">
        <div class="frontend-text flex flex-column">
          {{ titleLists.frontEndTitle }}
        </div>
        <div
          v-for="item in frontEndData"
          :key="item.title"
        >
          <AtomElementUiSkillProgress :progress-data="item" />
        </div>
      </div>
      <el-row class="backend-list flex flex-column flex-justify-center mb-40">
        <div class="backend-text flex flex-column">
          {{ titleLists.backEndTitle }}
        </div>
        <div
          v-for="item in backEndData"
          :key="item.title"
        >
          <AtomElementUiSkillProgress :progress-data="item" />
        </div>
      </el-row>
      <el-row class="tools-list flex flex-column flex-justify-center mb-40">
        <div class="tools-text flex flex-column">
          {{ titleLists.toolsTitle }}
        </div>
        <div
          v-for="item in toolsData"
          :key="item.title"
        >
          <AtomElementUiSkillProgress :progress-data="item" />
        </div>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { Images } from '~/interfaces/types'

const skillsProps = defineProps({
  skillsText: { type: Object, default: () => null },
  skillsImage: { type: Array as PropType<Images[]>, default: () => [] }
})

const titleLists = ref({
  frontEndTitle: 'FE Skills',
  backEndTitle: 'BE Skills',
  toolsTitle: 'Tools'
})

const frontEndData = reactive([
  { title: 'Nuxt.js', duration: 8, percent: 100, percentText: '⚙️ 90%', color: '#a2add0', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'Vue.js', duration: 11, percent: 100, percentText: '⚙️ 85%', color: '#89729e', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'TypeScript', duration: 5, percent: 70, percentText: '⚙️ 65%', color: '#56887d', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'JavaScript', duration: 8, percent: 80, percentText: '⚙️ 80%', color: '#a0e6ff', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'SASS/SCSS', duration: 7, percent: 90, percentText: '⚙️ 90%', color: '#fce883', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'HTML5', duration: 6, percent: 100, percentText: '⚙️ 100%', color: '#c5e384', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'CSS3', duration: 10, percent: 100, percentText: '⚙️ 100%', color: '#ebc2af', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Flutter', duration: 6, percent: 30, percentText: '⚙️ 40%', color: '#b56c60', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' }
])

const backEndData = reactive([
  { title: 'Node.js', duration: 7, percent: 60, percentText: '⚙️ 60%', color: '#bfc0ee', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'PostgreSQL', duration: 8, percent: 70, percentText: '⚙️ 70%', color: '#ffa089', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'Python', duration: 10, percent: 30, percentText: '⚙️ 60%', color: '#7b1113', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' }
])

const toolsData = reactive([
  { title: 'Azure', duration: 6, percent: 85, percentText: '⚙️ 85%', color: '#8878c3', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'Firebase', duration: 11, percent: 90, percentText: '⚙️ 80%', color: '#a0d6b4', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'VS Code', duration: 7, percent: 100, percentText: '⚙️ 100%', color: '#ffddca', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Vim', duration: 10, percent: 95, percentText: '⚙️ 95%', color: '#4166f5', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'GitHub', duration: 5, percent: 100, percentText: '⚙️ 100%', color: '#fc6c85', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'Jira', duration: 11, percent: 90, percentText: '⚙️ 100%', color: '#ffb300', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'Postman', duration: 5, percent: 90, percentText: '⚙️ 90%', color: '#0073cf', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'Illustration', duration: 7, percent: 100, percentText: '⚙️ 100%', color: '#808080', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'XD', duration: 10, percent: 100, percentText: '⚙️ 100%', color: '#deaa88', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' },
  { title: 'Zeplin', duration: 6, percent: 100, percentText: '⚙️ 100%', color: '#ffa089', style: 'font-size: 20px; margin-right: 120px; color: #f5f3ef;' }
])
</script>
