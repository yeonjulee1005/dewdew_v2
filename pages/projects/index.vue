<template>
  <NuxtLayout>
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
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useDatabase } from '~/stores/database'
import { Route } from '~/interfaces/types'

useHead({
  title: '프로젝트'
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
