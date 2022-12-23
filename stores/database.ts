import { defineStore } from 'pinia'
import nameLists from '~/data/commentName'

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
    if (typeof data === 'string') { return }
    data.forEach((core:any) => {
      if (core.id === 'admin') {
        adminPassword.value = core.password
      }
    })
  }

  const generateCommentName = () => {
    const frontName = nameLists.commentNames.frontName
    const backName = nameLists.commentNames.backName

    const randomFront = frontName[Math.floor(Math.random() * frontName.length)]
    const randomBack = backName[Math.floor(Math.random() * backName.length)]

    return randomFront.concat(' ', randomBack)
  }

  return {
    adminPassword,
    coreData,
    imageData,
    updateCoreData,
    generateCommentName
  }
})
