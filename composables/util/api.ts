import { useHttp } from '~/composables'

export const useApi = () => {
  const getCoreData = async (coreUrl:string, imageUrl:string) => {
    const [{ data: core }, { data: images }] = await Promise.all([
      useFetch(`/api/query?col=${coreUrl}`),
      useFetch(`/api/query?col=${imageUrl}`)
    ])
    return { core, images }
  }
  const postSetData = async (url:string, id:string, params:any) => {
    const { data } = await useFetch(`/api/set?col=${url}`, {
      method: 'POST',
      body: { id, params }
    })
    return { data }
  }
  const getSingleData = (url:string) => {
    return useHttp().get(url)
  }
  const postAddData = (url:string, params:any) => {
    return useHttp().post(url, params)
  }
  const postUpdateData = (url:string, params:any) => {
    return useHttp().patch(url, params)
  }
  return {
    getCoreData,
    postSetData,
    getSingleData,
    postAddData,
    postUpdateData
  }
}
