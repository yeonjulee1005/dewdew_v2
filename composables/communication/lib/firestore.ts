import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove
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
    case 'addArray' :
      addData = addArray(root, document)
      break
    case 'removeArray' :
      addData = removeArray(root, document)
      break
  }

  const colRef = doc(firestoreDb, col, id)

  const docRef = await updateDoc(colRef, addData)
  return docRef
}

export const del = async (col:any, id:any) => {
  const docRef = doc(firestoreDb, col, id)
  return await deleteDoc(docRef)
}

function addArray (root:string, data:any) {
  const arrayData = {
    ...data,
    createdAt: Timestamp.now()
  }
  return { [root]: arrayUnion(arrayData) }
}

function removeArray (root:string, data:any) {
  return { [root]: arrayRemove(data) }
}

function incrementValue (root:string, data:any) {
  return { [root]: increment(data) }
}
