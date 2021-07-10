import {useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import Alert from '@material-ui/lab/Alert'
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined'

const ForgotPassword = () => {
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setSuccess('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setSuccess('Check your inbox for further instructions.')
        } catch (error) {
            setError(error.message)
        }

        setLoading(false)
    }

    return (

        <div className='container forgotPassword'>
            <Link to='/' className='brand'>
                <MovieCreationOutlinedIcon className='icon' />
                <h1>MoviesApp</h1>
            </Link>

            <div className='card'>
                <h3>Reset Password</h3>

                {error &&
                    <Alert variant='filled' severity='error' style={{marginTop: '25px 0', fontWeight: 600}} >
                        {error}
                    </Alert>
                }

                {success &&
                    <Alert variant='filled' severity='success' style={{marginTop: '25px 0', fontWeight: 600}} >
                        {success}
                    </Alert>
                }

                <form onSubmit={handleSubmit}>
                    <div className='inputGroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' ref={emailRef} />
                    </div>

                    <button disabled={loading} type='submit' className='button formButton'>Reset Password</button>

                </form>
            </div>

            <div className='needAnAccount'>
                <Link to='/login'>Log in</Link>
            </div>
        </div>
    )
}

export default ForgotPassword
