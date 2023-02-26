import { useHttp } from '~/composables/communication/http'

export const useApi = () => {
  const getSsrCoreData = async (coreUrl:string, imageUrl:string) => {
    const [{ data: core }, { data: images }] = await Promise.all([
      useFetch(`/api/query?col=${coreUrl}`),
      useFetch(`/api/query?col=${imageUrl}`)
    ])
    return { core, images }
  }
  const getClientCoreData = async (coreUrl:string, imageUrl:string) => {
    const returnData = {
      core: await useHttp().get(coreUrl, ''),
      images: await useHttp().get(imageUrl, '')
    }
    return returnData
  }
  const postSetData = async (url:string, id:string, params:any) => {
    const { data } = await useFetch(`/api/set?col=${url}`, {
      method: 'POST',
      body: { id, params }
    })
    return { data }
  }
  const getSingleData = (url:string, sort:string) => {
    return useHttp().get(url, sort)
  }
  const postAddData = (url:string, params:any) => {
    return useHttp().post(url, params)
  }
  const postUpdateData = (url:string, params:any) => {
    return useHttp().patch(url, params)
  }
  return {
    getSsrCoreData,
    getClientCoreData,
    postSetData,
    getSingleData,
    postAddData,
    postUpdateData
  }
}
