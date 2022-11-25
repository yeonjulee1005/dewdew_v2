<template>
  <el-header class="header flex flex-justify-center">
    <div class="header-container flex flex-row flex-align-center">
      <nuxt-link to="/">
        <el-image
          class="flex-fixed logo"
          :src="headerProps.images.logo.url"
          :alt="headerProps.images.logo.title"
        />
      </nuxt-link>
      <div class="flex-auto" />
      <div
        v-if="desktopModeTrigger"
        class="desktop-menu flex flex-fixed mr-20"
      >
        <nuxt-link
          v-for="menu in menuData"
          :key="menu.index"
          class="menu-links mr-20"
          :to="menu.url"
        >
          {{ menu.title }}
        </nuxt-link>
      </div>
      <client-only>
        <nuxt-link class="github mx-default" :to="snsData[0].route" target="_blank">
          <el-image :src="snsData[0].url" />
        </nuxt-link>
        <el-switch
          v-model="darkModeTrigger"
          class="dark-mode-switch flex-end mx-default"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          @change="toggleDark()"
        />
      </client-only>
      <el-menu
        v-if="!desktopModeTrigger"
        v-show="!desktopModeTrigger"
        ref="mobileMenu"
        class="mobile-menu flex-end mx-20"
        :router="true"
        menu-trigger="click"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon> <Grid /> </el-icon>
          </template>
          <el-menu-item
            v-for="menu in menuData"
            :key="menu.index"
            class="flex-justify-end"
            :index="menu.url"
          >
            <nuxt-link class="menu-links" :to="menu.url">
              {{ menu.title }}
            </nuxt-link>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </el-header>
</template>
<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { SnsLogo, Images } from '~/interfaces/types'

const headerProps = defineProps({
  coreData: { type: Object, default: () => null },
  images: { type: Object, default: () => null }
})

const menuData = ref<Images[]>([])
const snsData = ref<SnsLogo[]>([])
const darkModeTrigger = ref(false)
const desktopModeTrigger = ref(false)

headerProps.coreData.forEach((core:any) => {
  switch (core.id) {
    case 'pages' :
      menuData.value = core.menu
      snsData.value = core.sns
      break
  }
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
  darkModeTrigger.value = isDarkTrigger.value
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

onUpdated(() => {
  darkModeTrigger.value = isDarkTrigger.value
})

const handleResize = () => {
  window.innerWidth < 800 ? desktopModeTrigger.value = false : desktopModeTrigger.value = true
}

</script>
