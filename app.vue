<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout name="default">
      <NuxtLoadingIndicator
        :height="5"
      />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { ID_INJECTION_KEY } from 'element-plus'

// const client = useSupabaseClient()

// const test = async () => {
//   const data = await client.from('profiles').select('*')
//   console.log(data)
// }

// test()

const { t } = useLocale()

provide(ID_INJECTION_KEY, {
  prefix: 100,
  current: 0
})

useHead({
  titleTemplate: (titleChunk:any) => {
    let title = titleChunk
    if (!titleChunk.includes(t('pageTitle.yeonju').concat(' | '))) {
      title = t('pageTitle.yeonju').concat(' | ', titleChunk)
    }
    return title
  }
})

await useDatabase().updateCoreData(await useApi().getSsrCoreData('core', 'images'))
if (typeof useDatabase().coreData.value === 'string') {
  await useDatabase().updateCoreData(await useApi().getClientCoreData('core', 'images'))
}

// 아래는 set으로 컬랙션 추가하는거
// await useApi().postSetData('blog', 'article', { desc: '내용3', index: 0, title: '제11목이댱' })
</script>
