import {
  collection,
  getDocs,
  // getDoc,
  addDoc,
  deleteDoc,
  doc,
  // query,
  // where,
  setDoc
  // collectionGroup,
  // Timestamp
} from 'firebase/firestore'
import { firestoreDb } from './firebase'

export const queryByCollection = async (col: string) => {
  const colRef = collection(firestoreDb, col)

  const snapshot = await getDocs(colRef)

  const docs = Array.from(snapshot.docs).map((doc) => {
    return {
      ...doc.data(),
      id: doc.id
    }
  })

  return docs
}

export const set = async (col:string, document:object) => {
  await setDoc(doc(collection(firestoreDb, col)), document, { merge: true })
}

export const add = async (col:string, document:object) => {
  const colRef = collection(firestoreDb, col)

  const docRef = await addDoc(colRef, document)

  return docRef
}

export const del = async (col:any, id:any) => {
  const docRef = doc(firestoreDb, col, id)
  return await deleteDoc(docRef)
}
