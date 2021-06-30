import {Link} from 'react-router-dom'

const Login = () => {
    async function handleSubmit(e) {
        
    }

    return (
        <div className='container loginSignup'>
            <div className='card'>
                <h3>Log In</h3>

                <form onSubmit={handleSubmit}>

                    <div className='inputGroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' />
                    </div>

                    <button type='submit' className='button loginButton'>Log In</button>

                    <div className='forgotPassword'>
                        <Link to='#'>Forgot password?</Link>
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
