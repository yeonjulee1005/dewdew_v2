<template>
  <div class="default-layout-container">
    <client-only>
      <el-switch
        v-model="darkModeTrigger"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        @change="toggleDark()"
      />
    </client-only>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
// import { sideMenuStore } from '@/store/sideMenu'

const darkModeTrigger = ref(false)

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
  // window.innerWidth < 600 ? sideMenuStore().closeCollapse() : sideMenuStore().openCollapse()
}

</script>
