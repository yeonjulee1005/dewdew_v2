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
        <el-switch
          v-model="darkModeTrigger"
          class="dark-mode-switch flex-end"
          inline-prompt
          size="large"
          :active-icon="Moon"
          :inactive-icon="Sunny"
          @change="toggleDark()"
        />
      </client-only>
      <el-menu
        v-if="!desktopModeTrigger"
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

const headerProps = defineProps({
  menuList: { type: Array, default: () => [] },
  images: { type: Object, default: () => null }
})

const menuData:any[] = reactive(headerProps.menuList)
const darkModeTrigger = ref(false)
const desktopModeTrigger = ref(false)

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
