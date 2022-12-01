import {
  collection,
  query,
  orderBy,
  getDocs,
  // getDoc,
  addDoc,
  deleteDoc,
  doc,
  // where,
  setDoc,
  updateDoc,
  // collectionGroup,
  // Timestamp,
  serverTimestamp,
  increment
} from 'firebase/firestore'
import { firestoreDb } from './firebase'

export const queryByCollection = async (col: string, sort:string) => {
  let queryText = null
  sort ? queryText = query(collection(firestoreDb, col), orderBy('createdAt', 'desc')) : queryText = collection(firestoreDb, col)

  const snapshot = await getDocs(queryText)

  const docs = Array.from(snapshot.docs).map((doc) => {
    return {
      ...doc.data(),
      id: doc.id
    }
  })

  return docs
}

export const set = async (col:string, id:string, document:object) => {
  await setDoc(doc(firestoreDb, col, id), document, { merge: true })
}

export const add = async (col:string, document:object) => {
  const addData = {
    ...document,
    createdAt: serverTimestamp()
  }
  const colRef = collection(firestoreDb, col)

  const docRef = await addDoc(colRef, addData)
  return docRef
}

export const update = async (col:string, id:string, root:string, method:string, document:object) => {
  let addData = {}
  switch (method) {
    case 'increment' :
      addData = incrementValue(root, document)
      break
  }
  // const addData = {
  //   ...document,
  //   createdAt: serverTimestamp()
  // }
  const colRef = doc(firestoreDb, col, id)

  const docRef = await updateDoc(colRef, addData)
  return docRef
}

export const del = async (col:any, id:any) => {
  const docRef = doc(firestoreDb, col, id)
  return await deleteDoc(docRef)
}

function incrementValue (root:string, data:any) {
  return { [root]: increment(data) }
}
