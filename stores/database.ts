import { defineStore } from 'pinia'

export const useDatabase = defineStore('database', () => {
  const adminPassword:any = {}
  const coreData:any = {}
  const imageData:any = {}

  const updateCoreData = async (data:any) => {
    console.log('1', data)
    coreData.value = {}
    imageData.value = {}
    coreData.value = await data.core
    imageData.value = await data.images
    setPassword(data.core.value)
  }

  const setPassword = (data:any) => {
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
