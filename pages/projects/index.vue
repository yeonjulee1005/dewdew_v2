<template>
  <div>
    <div class="main-projects-container flex flex-column flex-justify-center flex-align-center">
      <nuxt-link
        v-for="project in projectLists"
        :key="project.index"
        :to="project.route"
        class="project-list mb-20"
      >
        {{ project.title }}
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDatabase } from '~/stores/database'
import { Route } from '~/interfaces/types'

useHead({
  title: '프로젝트',
  meta: [
    { property: 'description', content: '토이 프로젝트 리스트 입니다.' },
    { property: 'og:title', content: '개발자 이연주 | 프로젝트' },
    { property: 'og:url', content: 'https://dewdew.kr/projects/' },
    { property: 'og:description', content: '토이 프로젝트 리스트 입니다.' }
  ]
})

definePageMeta({
  title: 'Project'
})

const coreData = useDatabase().coreData.value

const projectLists = ref<Route[]>([])

coreData.forEach((core:any) => {
  switch (core.id) {
    case 'pages' :
      projectLists.value = core.subMenu.projects
      break
  }
})
</script>
