import { defineStore } from 'pinia'

export const useDatabase = defineStore('database', () => {
  const coreData:any = {}
  const imageData:any = {}

  const updateData = async (data:any) => {
    coreData.value = await data.core
    imageData.value = await data.images
  }

  return {
    coreData,
    imageData,
    updateData
  }
})
