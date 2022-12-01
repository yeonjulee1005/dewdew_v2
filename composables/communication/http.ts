import {
  queryByCollection,
  add,
  update
// set,
// del
} from './lib/firestore'

export const useHttp = () => {
  const get = async (url:string) => {
    return await queryByCollection(url, 'blog').then((res) => {
      return res
    })
  }
  const post = async (url:string, params:any) => {
    return await add(url, params).then((res) => {
      return res
    })
  }
  const patch = async (url:string, params:any) => {
    return await update(url, params.id, params.root, params.method, params.data).then((res) => {
      return res
    })
  }
  return {
    get,
    post,
    patch
  }
}
