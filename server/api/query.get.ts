import { queryByCollection } from '../lib/firestore'

export default defineEventHandler(async (event:any) => {
  try {
    const query = getQuery(event)
    const res = await queryByCollection(query.col as string)
    return res
  } catch (error:any) {
    return { result: [], error: error.message }
  }
})
