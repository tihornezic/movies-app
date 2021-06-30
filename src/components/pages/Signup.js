import {Link} from 'react-router-dom'

const Signup = () => {
    async function handleSubmit(e) {
        
    }

    return (
        <div className='container loginSignup'>
            <div className='card'>
                <h3>Sign Up</h3>

                <form onSubmit={handleSubmit}>

                    <div className='inputGroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type='password' />
                    </div>

                    <button type='submit' className='button loginButton'>Sign Up</button>

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
