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
      <div class="flex copyright">
        {{ staticTexts.copyright }}
      </div>
      <div class="flex copyright">
        {{ staticTexts.designed }}
      </div>
    </div>
  </el-footer>
</template>
<script setup type="ts">

const footerProps = defineProps({
  coreData: { type: Object, default: () => null }
})

const menuData = ref([])
const staticTexts = ref({})

footerProps.coreData.forEach((core) => {
  switch (core.id) {
    case 'footer' :
      staticTexts.value = core
      break
    case 'pages' :
      menuData.value = core.menu
      break
  }
})
</script>
