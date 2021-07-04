import {useRef, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import Alert from '@material-ui/lab/Alert'
import {auth, db} from '../../firebase'
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';

const Signup = () => {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()
    const {signup, currentUser} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            
            const createUser = await signup(emailRef.current.value, passwordRef.current.value)

            const result = await createUser

            const database = db.collection('users').doc(result.user.uid)

            await database.set({
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                username: usernameRef.current.value,
                email: emailRef.current.value
            })

            history.push('/')
        } catch {
            setError('Failed to create an Account.')
        }

        setLoading(false)
    }

    return (
        <div className='container loginSignup'>
            <Link to='/' className='brand'>
                <MovieCreationOutlinedIcon className='icon' />
                <h1>MoviesApp</h1>
            </Link>

            <div className='card'>
                <h3>Sign Up</h3>

                {error &&
                    <Alert variant='filled' severity='error' style={{margin: '25px 0'}} >
                        {error}
                    </Alert>
                }
                <form onSubmit={handleSubmit}>
                    <div className='inputGroup'>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='text' ref={firstNameRef} required />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input type='text' ref={lastNameRef} required />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' ref={usernameRef} required />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' ref={emailRef} required />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' ref={passwordRef} required />
                    </div>

                    <button disabled={loading} type='submit' className='button loginButton'>Sign Up</button>

                    <div className='forgotPassword'>
                        <Link to='#'>Forgot password?</Link>
                    </div>
                </form>
            </div>

            <div className='needAnAccount'>
                <p>Already have an account? <Link to='/login'>Log in</Link></p>
            </div>
        </div>
    )
}

export default Signup
