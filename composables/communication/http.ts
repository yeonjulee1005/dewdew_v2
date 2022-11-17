/** Http Fetch Interfaces */
import { useFetch } from 'nuxt/app'

/** Return Url */
function getApiUrl () {
  return useRuntimeConfig().public.API_BASE_URL + '/esim/v1/'
}

export const useHttp = () => {
  const get = async (url:string) => {
    const { data, pending, error, refresh } = await useFetch(url, {
      method: 'GET',
      baseURL: getApiUrl(),
      credentials: 'include',
      initialCache: false,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${useCookie('partnerAccessToken').value}`
      }
    })
    const resData = data.value
    const resPending = pending.value
    const resError = error.value
    return { resData, resPending, resError, refresh }
  }

  const fetchGet = async (url:string) => {
    return await $fetch(url, {
      method: 'GET',
      baseURL: getApiUrl(),
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${useCookie('partnerAccessToken').value}`
      }
    })
  }

  const authPost = async (url:string, params:any) => {
    const { data, pending, refresh, error } = await useFetch(url, {
      method: 'POST',
      baseURL: getApiUrl(),
      credentials: 'include',
      initialCache: false,
      headers: { 'content-type': 'application/json' },
      body: params
    })
    const resData = data.value
    const resPending = pending.value
    const resError = error.value
    return { resData, resPending, resError, refresh }
  }

  const fetchAuthPost = async (url:string, params:any) => {
    return await $fetch(url, {
      method: 'POST',
      baseURL: getApiUrl(),
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      body: params
    })
  }

  const formPost = async (url:string, params:any) => {
    const { data, pending, error, refresh } = await useFetch(url, {
      method: 'POST',
      baseURL: getApiUrl(),
      credentials: 'include',
      redirect: 'follow',
      initialCache: false,
      headers: {
        authorization: `Bearer ${useCookie('partnerAccessToken').value}`
      },
      body: params
    })
    const resData = data.value
    const resPending = pending.value
    const resError = error.value
    return { resData, resPending, resError, refresh }
  }

  const post = async (url:string, params:any) => {
    const { data, pending, error, refresh } = await useFetch(url, {
      method: 'POST',
      baseURL: getApiUrl(),
      credentials: 'include',
      initialCache: false,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${useCookie('partnerAccessToken').value}`
      },
      body: params
    })
    const resData = data.value
    const resPending = pending.value
    const resError = error.value
    return { resData, resPending, resError, refresh }
  }

  // const formPatch = async (url:string, params:any) => {
  //   const { data, pending, error, refresh } = await useFetch(url, {
  //     method: 'PATCH',
  //     baseURL: getApiUrl(),
  //     credentials: 'include',
  //     redirect: 'follow',
  //     initialCache: false,
  //     headers: {
  //       authorization: `Bearer ${useCookie('partnerAccessToken').value}`
  //     },
  //     body: params
  //   })
  //   const resData = data.value
  //   const resPending = pending.value
  //   const resError = error.value
  //   return { resData, resPending, resError, refresh }
  // }

  const patch = async (url:string, params:any) => {
    const { data, pending, error, refresh } = await useFetch(url, {
      method: 'PATCH',
      baseURL: getApiUrl(),
      credentials: 'include',
      initialCache: false,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${useCookie('partnerAccessToken').value}`
      },
      body: params
    })
    const resData = data.value
    const resPending = pending.value
    const resError = error.value
    return { resData, resPending, resError, refresh }
  }

  // const put = async(url:string, params:any) => {
  //   const { data, pending, error, refresh } = await useFetch(url, {
  //     method: 'PUT',
  //     baseURL: getApiUrl(),
  //     credentials: 'include',
  //     initialCache: false,
  //     headers: {
  //       'content-type': 'application/json',
  //       authorization: `Bearer ${useCookie('partnerAccessToken').value}`
  //     },
  //     body: params
  //   })
  //   return { data, pending, error, refresh }
  // }

  const del = async (url:string, params:any) => {
    const { data, pending, error, refresh } = await useFetch(url, {
      method: 'DELETE',
      baseURL: getApiUrl(),
      credentials: 'include',
      initialCache: false,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${useCookie('partnerAccessToken').value}`
      },
      body: params
    })
    const resData = data.value
    const resPending = pending.value
    const resError = error.value
    return { resData, resPending, resError, refresh }
  }
  return {
    get,
    fetchGet,
    authPost,
    fetchAuthPost,
    formPost,
    post,
    patch,
    del
  }
}
