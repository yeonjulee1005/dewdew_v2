export const useApi = () => {
  const getCoreData = async (coreUrl:string, imageUrl:string) => {
    const [{ data: core }, { data: images }] = await Promise.all([
      useFetch(`/api/query?col=${coreUrl}`),
      useFetch(`/api/query?col=${imageUrl}`)
    ])
    return { core, images }
  }
  const getSingleData = async (url:string) => {
    return await $fetch(`/api/query?col=${url}`)
    // return { data }
  }
  const postAddData = async (url:string, params:any) => {
    const { data } = await useFetch(`/api/add?col=${url}`, {
      method: 'POST',
      body: { article: params }
    })
    return { data }
  }
  const postUpdateData = async (url:string, params:any) => {
    const { data } = await useFetch(`/api/update?col=${url}`, {
      method: 'POST',
      body: params
    })
    return { data }
  }
  const postSetData = async (url:string, id:string, params:any) => {
    const { data } = await useFetch(`/api/set?col=${url}`, {
      method: 'POST',
      body: { id, params }
    })
    return { data }
  }
  return {
    getCoreData,
    getSingleData,
    postAddData,
    postUpdateData,
    postSetData
  }
}
