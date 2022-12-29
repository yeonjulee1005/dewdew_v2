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
      <nuxt-link class="github mx-default" :to="snsData[0].route" target="_blank">
        <nuxt-img
          :src="snsData[0].url"
          width="50"
          height="50"
          format="webp"
          :alt="snsData[0].title"
        />
      </nuxt-link>
      <client-only>
        <el-switch
          v-model="darkModeTrigger"
          class="dark-mode-switch flex-end mx-default"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          label="theme-mode"
          @change="toggleDark()"
        />
        <div
          v-if="!desktopModeTrigger"
          class="float-mobile-menu flex flex-column"
        >
          <nuxt-link
            v-for="menu in menuData"
            :key="menu.index"
            class="mobile-menu-links flex flex-justify-center"
            :to="menu.url"
          >
            <Icon :icon="`ep:${menu.icon}`" />
          </nuxt-link>
        </div>
      </client-only>
    </div>
  </el-header>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { SnsLogo, Images, IndexSignature } from '~/types/interfaces'

const headerProps = defineProps({
  coreData: { type: Object, default: () => null },
  images: { type: Object, default: () => null }
})

const favicon = ref('')
const { width } = useWindowSize()

const iconList = reactive<IndexSignature>({
  Home: 'home-filled',
  Blog: 'notebook',
  Projects: 'opportunity',
  Archives: 'picture-filled'
})

const menuData = ref<Images[]>([])
const snsData = ref<SnsLogo[]>([])
const darkModeTrigger = ref(false)
const desktopModeTrigger = ref(false)

const initMenuData = (data:Images[]) => {
  data.forEach((item:Images) => {
    const menu = {
      ...item,
      icon: iconList[item.title]
    }
    menuData.value.push(menu)
  })
}

headerProps.coreData.forEach((core:any) => {
  switch (core.id) {
    case 'pages' :
      // menuData.value = core.menu
      initMenuData(core.menu)
      snsData.value = core.sns
      break
  }
})

onMounted(() => {
  darkModeTrigger.value = isDarkTrigger.value
  handleResize(width.value)
})

watch(width, () => { handleResize(width.value) })
watch(darkModeTrigger, () => {
  darkModeTrigger.value ? favicon.value = 'favicon_black.png' : favicon.value = 'favicon_white.png'
})
useFavicon(favicon)

const handleResize = (width:number) => {
  width < 800 ? desktopModeTrigger.value = false : desktopModeTrigger.value = true
}

</script>
