import {useRef, useState, useEffect} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import Alert from '@material-ui/lab/Alert'
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined'


const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const history = useHistory()
    const location = useLocation()

    const [message, setMessage] = useState('')

    useEffect(() => {
        // console.log(location.pathname)
        // console.log(location.state.message)
        setMessage(location.state?.message)
    }, [location])


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch(error) {
            // setError('Failed to log in.')
            setError(error.message)
        }

        setLoading(false)
    }

    return (
        <div className='container loginSignup'>
            <Link to='/' className='brand'>
                <MovieCreationOutlinedIcon className='icon' />
                <h1>MoviesApp</h1>
            </Link>

            {message ?
                <p className='message'>{message}</p>
                :
                null
            }

            <div className='card'>
                <h3>Log In</h3>

                {error &&
                    <Alert variant='filled' severity='error' style={{margin: '25px 0', maxWidth: '346px', fontWeight: 600}} >
                        {error}
                    </Alert>
                }
                <form onSubmit={handleSubmit}>
                    <div className='inputGroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' ref={emailRef} required />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' ref={passwordRef} required />
                    </div>

                    <button disabled={loading} type='submit' className='button formButton'>Log In</button>

                    <div className='forgotPasswordLink'>
                        <Link to='/forgot-password'>Forgot password?</Link>
                    </div>
                </form>
            </div>

            <div className='needAnAccount'>
                <p>Need an account? <Link to='/signup'>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login
