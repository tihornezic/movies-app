import {useRef, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import Alert from '@material-ui/lab/Alert'
import {auth, db} from '../../firebase'

const Profile = () => {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()

    const {currentUser, updatePassword, updateEmail} = useAuth()
    const [userInfo, setUserInfo] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [loading, setLoading] = useState(false)
    const history = useHistory()


    useEffect(() => {
        if (currentUser) {
            const getUserInfo = async () => {
                const data = await db.collection('users').doc(currentUser.uid).collection('userInfo').doc(currentUser.uid).get()
                setUserInfo(data.data())
            }

            getUserInfo()
        } else {
            setUserInfo([])
            redirectToLogin()
        }

        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [])

    const redirectToLogin = () => {
        history.push({
            pathname: '/login',
            state: {message: 'Login to be able to add your Movies and Tv Series to watchlist/watchedlist.'}
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const promises = []
        const database = db.collection('users').doc(currentUser.uid).collection('userInfo').doc(currentUser.uid)
        setLoading(true)
        setError('')

        // update email
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        // update first name
        if (firstNameRef.current.value !== userInfo.firstName) {
            promises.push(
                database.set({
                    firstName: firstNameRef.current.value,
                    // keep the rest the same
                    lastName: userInfo.lastName,
                    username: userInfo.username,
                    email: userInfo.email
                })
            )
        }

        // update last name
        if (lastNameRef.current.value !== userInfo.lastName) {
            promises.push(
                database.set({
                    // keep same
                    firstName: userInfo.firstName,
                    lastName: lastNameRef.current.value,
                    // keep same
                    username: userInfo.username,
                    // keep same
                    email: userInfo.email
                })
            )
        }

        // update username
        if (usernameRef.current.value !== userInfo.username) {
            promises.push(
                database.set({
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    username: usernameRef.current.value,
                    email: userInfo.email
                })
            )
        }

        // update password
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        // 
        // multiple updates; really bad practice, will leave it like that for now
        // update first name & last name
        if (firstNameRef.current.value !== userInfo.firstName &&
            lastNameRef.current.value !== userInfo.lastName) {
            promises.push(
                database.set({
                    firstName: firstNameRef.current.value,
                    lastName: lastNameRef.current.value,
                    username: userInfo.username,
                    email: userInfo.email
                })
            )
        }

        // update first name, last name & username
        if (firstNameRef.current.value !== userInfo.firstName &&
            lastNameRef.current.value !== userInfo.lastName &&
            usernameRef.current.value !== userInfo.username) {
            promises.push(
                database.set({
                    firstName: firstNameRef.current.value,
                    lastName: lastNameRef.current.value,
                    username: usernameRef.current.value,
                    email: userInfo.email
                })
            )
        }

        Promise.all(promises).then(() => {
            // history.push('/')
            setSuccess('Profile successfully updated.')
        }).catch(() => {
            setError('Failed to update account.')
        }).finally(() => {
            setLoading(false)
        })
    }


    return (
        <div className='container profile'>
            <div className='card'>
                <h3>Profile</h3>

                {error &&
                    <Alert variant='filled' severity='error' style={{margin: '25px 0', fontWeight: 600}} >
                        {error}
                    </Alert>
                }

                {success &&
                    <Alert variant='filled' severity='success' style={{margin: '25px 0', fontWeight: 600}} >
                        {success}
                    </Alert>
                }

                <form onSubmit={handleSubmit}>
                    <div className='inputGroup'>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='text' ref={firstNameRef} defaultValue={userInfo?.firstName} />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input type='text' ref={lastNameRef} defaultValue={userInfo?.lastName} />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' ref={usernameRef} defaultValue={userInfo?.username} />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' ref={emailRef} defaultValue={currentUser?.email} />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' ref={passwordRef} placeholder='Leave blank to keep the same' />
                    </div>

                    <button disabled={loading} type='submit' className='button formButton'>Update</button>

                </form>
            </div>
        </div>
    )
}

export default Profile
