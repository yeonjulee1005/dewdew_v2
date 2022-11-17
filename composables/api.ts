import { useHttp, useQuery } from '~/composables'

export const useApi = () => {
  const adminLogin = (params:any) => {
    return useHttp().fetchAuthPost('auth/login', params)
  }
  const getAdminInformation = () => {
    return useHttp().get('channel/user')
  }
  const updateAdminInformation = (params:any) => {
    return useHttp().patch('channel/user', params)
  }
  const getOrderList = <T extends number, D extends string>(page:T, count:T, year:D, month:D, category:D, word:D) => {
    return useHttp().fetchGet('sales/salesDetail/' + page + '/' + count + useQuery().orderQueries(year, month, category, word))
  }
  const getOrderExcelList = <T extends string>(year:T, month:T, category:T, word:T) => {
    return useHttp().fetchGet('sales/salesDetail/excel' + useQuery().orderQueries(year, month, category, word))
  }
  const getStatementList = (year:string) => {
    return useHttp().fetchGet('sales/' + year)
  }
  const patchStatementStatus = (salesId:string|undefined, status:string) => {
    return useHttp().patch('sales/' + salesId + '/status/' + status, null)
  }
  const getTotalCode = () => {
    return useHttp().get('code')
  }
  const getSpecificCode = (codeName:string) => {
    return useHttp().get('code/' + codeName)
  }
  const getStatsDailyList = () => {
    return useHttp().get('main/sales')
  }
  const getStatsSalesList = <T extends string>(year:T, month:T) => {
    return useHttp().get('sales/stats/daily/' + year + '/' + month)
  }
  return {
    adminLogin,
    getAdminInformation,
    updateAdminInformation,
    getOrderList,
    getOrderExcelList,
    getStatementList,
    patchStatementStatus,
    getTotalCode,
    getSpecificCode,
    getStatsDailyList,
    getStatsSalesList
  }
}
