import { defineStore } from 'pinia'

export const useDatabase = defineStore('database', () => {
  const coreData:any = {}
  const imageData:any = {}
  const blogData:any = []

  const updateCoreData = async (data:any) => {
    coreData.value = {}
    imageData.value = {}
    coreData.value = await data.core
    imageData.value = await data.images
  }

  const updateBlogData = async (data:any) => {
    blogData.value = []
    blogData.value = await data.data
  }

  return {
    coreData,
    imageData,
    blogData,
    updateCoreData,
    updateBlogData
  }
})
