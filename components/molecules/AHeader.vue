<template>
  <el-header class="header flex flex-justify-center">
    <div class="header-container flex flex-row flex-align-center">
      <nuxt-link to="/">
        <nuxt-picture
          class="logo flex-fixed"
          :src="headerProps.images.logo.url"
          height="46"
          width="160"
          legacy-format="webp"
          :img-attrs="{class: 'dewdew-logo'}"
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
          <nuxt-img
            :src="snsData[0].url"
            width="30"
            height="30"
            format="webp"
            :alt="snsData[0].title"
          />
        </nuxt-link>
        <el-switch
          v-model="darkModeTrigger"
          class="dark-mode-switch flex-end mx-default"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          label="theme-mode"
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
        <el-sub-menu index="1" label="menus">
          <template #title>
            <el-icon> <Grid /> </el-icon>
          </template>
          <el-menu-item
            v-for="menu in menuData"
            :key="menu.index"
            :aria-command-name="menu.title"
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
import { SnsLogo, Images } from '~/types/interfaces'

const headerProps = defineProps({
  coreData: { type: Object, default: () => null },
  images: { type: Object, default: () => null }
})

const favicon = ref('')
const { width } = useWindowSize()

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

watch(width, () => { handleResize(width.value) })
watch(darkModeTrigger, () => {
  darkModeTrigger.value ? favicon.value = 'favicon_black.png' : favicon.value = 'favicon_white.png'
})
useFavicon(favicon)

onMounted(() => {
  darkModeTrigger.value = isDarkTrigger.value
  handleResize(width.value)
})

onUpdated(() => {
  darkModeTrigger.value = isDarkTrigger.value
})

const handleResize = (width:number) => {
  width < 800 ? desktopModeTrigger.value = false : desktopModeTrigger.value = true
}

</script>
