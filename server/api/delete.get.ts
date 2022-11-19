import { del } from '../lib/firestore'

export default defineEventHandler(async (event:any) => {
  try {
    const { col, id } = getQuery(event)

    await del(col, id)

    return { result: id }
  } catch (error:any) {
    return { error: error.message }
  }
})
