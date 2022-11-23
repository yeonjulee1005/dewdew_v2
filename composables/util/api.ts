export const useApi = () => {
  const getAsyncData = async (coreUrl:string, imageUrl:string) => {
    const [{ data: core }, { data: images }] = await Promise.all([
      useFetch(`/api/query?col=${coreUrl}`),
      useFetch(`/api/query?col=${imageUrl}`)
    ])
    return {
      core,
      images
    }
  }
  return {
    getAsyncData
  }
}
