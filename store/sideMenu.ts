import { defineStore } from 'pinia'

export const sideMenuStore = defineStore('sideMenu', () => {
  const collapseTrigger = ref(false)

  function closeCollapse () {
    collapseTrigger.value = true
  }

  function openCollapse () {
    collapseTrigger.value = false
  }
  return {
    collapseTrigger,
    closeCollapse,
    openCollapse
  }
})
