import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyCWz30SLibco5AtgYq_znhu1gQVRf6QQJ8",
    authDomain: "movies-app-56a22.firebaseapp.com",
    projectId: "movies-app-56a22",
    storageBucket: "movies-app-56a22.appspot.com",
    messagingSenderId: "662867833617",
    appId: "1:662867833617:web:2b341da0dbad9b0adb92b0"
})

export const auth = app.auth()
export const db = app.firestore()

export default app