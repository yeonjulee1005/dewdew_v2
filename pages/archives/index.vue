<template>
  <NuxtLayout>
    <div>
      아카이브
    </div>
    <MoleculesAFooter
      :core-data="coreData"
    />
  </NuxtLayout>
</template>
<script setup lang="ts">

const getCoreData = await useFetch('/api/query?col=core')

const coreData = ref()
coreData.value = getCoreData.data.value

useHead({
  title: '아카이브'
})

</script>
