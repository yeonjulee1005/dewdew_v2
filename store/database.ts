import { defineStore } from 'pinia'

export const useDatabase = defineStore('database', () => {
  const coreData = ref()
  const imageData = ref()

  async function updateCoreData () {
    coreData.value = await useFetch('/api/query?col=core')
  }

  async function updateImageData () {
    imageData.value = await useFetch('/api/query?col=images')
  }

  return {
    coreData,
    imageData,
    updateCoreData,
    updateImageData
  }
})
