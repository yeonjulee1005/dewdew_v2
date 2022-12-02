<template>
  <NuxtPage />
</template>
<script setup lang="ts">
import { ID_INJECTION_KEY } from 'element-plus'
import { useDatabase } from '~/stores/database'

provide(ID_INJECTION_KEY, {
  prefix: 100,
  current: 0
})

useHead({
  titleTemplate: (titleChunk:any) => {
    let title = titleChunk
    if (!titleChunk.includes('개발자 이연주 |')) {
      title = `개발자 이연주 | ${titleChunk}`
    }
    return title
  }
})

await useDatabase().updateCoreData(await useApi().getSsrCoreData('core', 'images'))
console.log(typeof useDatabase().coreData.value)
console.log(useDatabase().coreData.value)
console.log(useDatabase().coreData.value.length)
console.log(typeof useDatabase().imageData.value)
console.log(useDatabase().imageData.value)
console.log(useDatabase().imageData.value.length)
if (typeof useDatabase().coreData.value === 'string') {
  await useDatabase().updateCoreData(await useApi().getClientCoreData('core', 'images'))
}

// 아래는 set으로 컬랙션 추가하는거
// await useApi().postSetData('blog', 'article', { desc: '내용3', index: 0, title: '제11목이댱' })
</script>
