import { queryByCollection } from '../lib/firestore'

export default defineEventHandler(async (event:any) => {
  try {
    const query = getQuery(event)
    let sort = ''
    query.col === 'blog' ? sort = 'blog' : sort = ''
    const res = await queryByCollection(query.col as string, sort)
    return res
  } catch (error:any) {
    return { result: [], error: error.message }
  }
})
