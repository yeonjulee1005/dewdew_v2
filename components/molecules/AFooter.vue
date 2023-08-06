<template>
  <el-footer class="footer">
    <div class="footer-section flex flex-column flex-justify-center flex-align-center">
      <div class="footer-menu-container flex flex-row flex-space-around mb-default">
        <nuxt-link
          v-for="menu in menuData"
          :key="menu.title"
          class="footer-links"
          :to="menu.url"
        >
          {{ menu.title }}
        </nuxt-link>
      </div>
      <div class="footer-sns-container flex flex-row flex-justify-center mb-default">
        <nuxt-link
          v-for="image in snsData"
          :key="image.title"
          class="sns-links flex flex-justify-center"
          :to="image.route"
          target="_blank"
        >
          <nuxt-img
            :src="image.url"
            width="50"
            height="50"
            format="webp"
            loading="lazy"
            :alt="image.title"
          />
        </nuxt-link>
      </div>
      <el-text class="flex copyright">
        {{ staticTexts.copyright }}
      </el-text>
      <el-text class="flex copyright">
        {{ staticTexts.designed }}
      </el-text>
      <el-text class="flex copyright">
        {{ $t('texts.version', { version: config.public.appVersion.replaceAll('"', '') }) }}
      </el-text>
    </div>
  </el-footer>
</template>

<script setup type="ts">

const config = useRuntimeConfig()

const props = defineProps({
  coreData: { type: Object, default: () => null }
})

const menuData = ref([])
const snsData = ref([])
const staticTexts = ref({})

props.coreData.forEach((core) => {
  switch (core.id) {
    case 'footer' :
      staticTexts.value = core
      break
    case 'pages' :
      menuData.value = core.menu
      snsData.value = core.sns
      break
  }
})
</script>
