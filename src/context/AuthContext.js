import {createContext, useContext, useState, useEffect} from 'react'
import {auth, db} from '../firebase'
import firebase from 'firebase/app'

export const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // auth functions
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    const updateEmail = (email) => {
        return currentUser.updateEmail(email)
    }

    const updatePassword = (password) => {
        return currentUser.updatePassword(password)
    }

    // 
    // database functions
    // watchlist functions
    const setWatchlistMovieToDatabase = (id, media, type) => {
        db
            .collection('users')
            .doc(currentUser?.uid)
            .collection('watchlist')
            .doc(JSON.stringify(id))
            .set({
                id: media.id,
                posterPath: media.posterPath,
                poster: media.poster,
                title: media.title,
                rating: media.rating,
                releaseDate: media.releaseDate,
                genres: media.genres,
                type: type,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
    }


    const setWatchlistTvToDatabase = (id, media, type) => {
        db
            .collection('users')
            .doc(currentUser?.uid)
            .collection('watchlist')
            .doc(JSON.stringify(id))
            .set({
                id: media.id,
                posterPath: media.posterPath,
                poster: media.poster,
                title: media.title,
                rating: media.rating,
                releaseDate: media.releaseDate,
                genres: media.genres,
                type: type,
                originCountry: media.originCountry,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
    }

    // gets media ids
    const getWatchlistMediaIdsFromDatabase = (currentUser, setWatchlistMedia) => {
        db.collection('users')
            .doc(currentUser?.uid)
            .collection('watchlist')
            .onSnapshot(snapshot => {
                setWatchlistMedia(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                    }))
                )
            })
    }

    // gets full media object
    const getWatchlistMediaFromDatabase = (currentUser, setWatchlist) => {
        db
            .collection('users')
            .doc(currentUser?.uid)
            .collection('watchlist')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => (
                setWatchlist(snapshot.docs.map(doc => ({
                    // id: doc.id,
                    id: doc.data().id,
                    posterPath: doc.data().posterPath,
                    poster: doc.data().poster,
                    title: doc.data().title,
                    rating: doc.data().rating,
                    releaseDate: doc.data().releaseDate,
                    genres: doc.data().genres,
                    type: doc.data().type,
                    originCountry: doc.data().originCountry
                })))
            ))
    }


    const removeFromWatchlist = (id) => {
        db
            .collection('users')
            .doc(currentUser?.uid)
            .collection('watchlist')
            .doc(JSON.stringify(id))
            .delete()
    }

    // 
    // watchedlist functions
    const setWatchedlistMovieToDatabase = (id, media, type) => {
        db
            .collection('users')
            .doc(currentUser?.uid)
            .collection('watchedlist')
            .doc(JSON.stringify(id))
            .set({
                id: media.id,
                posterPath: media.posterPath,
                poster: media.poster,
                title: media.title,
                rating: media.rating,
                releaseDate: media.releaseDate,
                genres: media.genres,
                type: type,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
    }

    const setWatchedlistTvToDatabase = (id, media, type) => {
        db
            .collection('users')
            .doc(currentUser?.uid)
            .collection('watchedlist')
            .doc(JSON.stringify(id))
            .set({
                id: media.id,
                posterPath: media.posterPath,
                poster: media.poster,
                title: media.title,
                rating: media.rating,
                releaseDate: media.releaseDate,
                genres: media.genres,
                type: type,
                originCountry: media.originCountry,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
    }

    // gets media ids
    const getWatchedlistMediaIdsFromDatabase = (currentUser, setWatchedlistMedia) => {
        db.collection('users')
            .doc(currentUser?.uid)
            .collection('watchedlist')
            .onSnapshot(snapshot => {
                setWatchedlistMedia(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                    }))
                )
            })
    }

    // gets full media object
    const getWatchedlistMediaFromDatabase = (currentUser, setWatchedlist) => {
        db
            .collection('users')
            .doc(currentUser?.uid)
            .collection('watchedlist')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => (
                setWatchedlist(snapshot.docs.map(doc => ({
                    // id: doc.id,
                    id: doc.data().id,
                    posterPath: doc.data().posterPath,
                    poster: doc.data().poster,
                    title: doc.data().title,
                    rating: doc.data().rating,
                    releaseDate: doc.data().releaseDate,
                    genres: doc.data().genres,
                    type: doc.data().type,
                    originCountry: doc.data().originCountry
                })))
            ))
    }

    const removeFromWatchedlist = (id) => {
        db
            .collection('users')
            .doc(currentUser?.uid)
            .collection('watchedlist')
            .doc(JSON.stringify(id))
            .delete()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            // console.log('User: ', user)
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    auth.onAuthStateChanged(user => {
        setCurrentUser(user)
    })

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,

        setWatchlistMovieToDatabase,
        setWatchlistTvToDatabase,
        getWatchlistMediaIdsFromDatabase,
        getWatchlistMediaFromDatabase,
        removeFromWatchlist,

        setWatchedlistMovieToDatabase,
        setWatchedlistTvToDatabase,
        getWatchedlistMediaIdsFromDatabase,
        getWatchedlistMediaFromDatabase,
        removeFromWatchedlist
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
