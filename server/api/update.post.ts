import { update } from '../lib/firestore'

export default defineEventHandler(async (event:any) => {
  try {
    const query = getQuery(event)
    const body = await readBody(event)
    if (!query.col) { return }

    const docRef = await update(query.col as string, body.id as string, body.root as string, body.method as string, body.data)
    return { result: docRef }
  } catch (error:any) {
    return { error: error.message }
  }
})
