import { defineStore } from 'pinia'

export const useDatabase = defineStore('database', () => {
  const adminPassword:any = {}
  const coreData:any = {}
  const imageData:any = {}

  const updateCoreData = async (data:any) => {
    coreData.value = {}
    imageData.value = {}
    coreData.value = await data.core
    imageData.value = await data.images
    data.core.value ? setPassword(data.core.value) : setPassword(data.core)
  }

  const setPassword = (data:any) => {
    if (data.length > 100) { return }
    data.forEach((core:any) => {
      if (core.id === 'admin') {
        adminPassword.value = core.password
      }
    })
  }

  return {
    adminPassword,
    coreData,
    imageData,
    updateCoreData
  }
})
