// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA4GEeSYFtpXhmp4AuJ59yyUcHI1hBG7vI',
  authDomain: 'dewdew-4c122.firebaseapp.com',
  projectId: 'dewdew-4c122',
  storageBucket: 'dewdew-4c122.appspot.com',
  messagingSenderId: '949410241608',
  appId: '1:949410241608:web:d543a87c2e1db3b27ccc7d',
  measurementId: 'G-46S77LEC56'
}

// Initialize Firebase
export const firestoreDb = getFirestore(initializeApp(firebaseConfig))
