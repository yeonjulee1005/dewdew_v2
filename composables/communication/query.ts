/** Api Query List */
export const useQuery = () => {
  const orderQueries = <T extends string>(year:T, month:T, category:T, word:T) => {
    const normalSearch = !year && !month && !category && !word
    const searchByDate = !category && !word
    const searchByCategory = !year && !month
    const searchAll = year && month && category && word
    let query = ''
    if (normalSearch) {
      query = ''
    } else if (searchByDate) {
      query = '?year=' + year + '&month=' + month
    } else if (searchByCategory) {
      query = '?searchType=' + category + '&search=' + word
    } else if (searchAll) {
      query = '?year=' + year + '&month=' + month + '&searchType=' + category + '&search=' + word
    }
    return query
  }

  return {
    orderQueries
  }
}
