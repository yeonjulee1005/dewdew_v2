import { defineStore } from 'pinia'

export const useDatabase = defineStore('database', () => {
  const coreData = ref()
  const imageData = ref()

  const updateCoreData = async () => {
    coreData.value = await useFetch('/api/query?col=core')
  }
  const updateImageData = async () => {
    imageData.value = await useFetch('/api/query?col=images')
  }

  return {
    coreData,
    imageData,
    updateCoreData,
    updateImageData
  }
})
