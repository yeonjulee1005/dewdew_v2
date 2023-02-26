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

const { t } = useLocale()

useHead({
  title: t('pageTitle.project'),
  meta: [
    { property: 'description', content: t('openGraph.projectDesc') },
    { property: 'og:title', content: t('openGraph.projectOgTitle') },
    { property: 'og:url', content: 'https://dewdew.kr/projects/' },
    { property: 'og:description', content: t('openGraph.projectDesc') }
  ]
})

definePageMeta({
  layout: 'default'
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
