import notFound from '../../img/notFound.svg'

const FourOhFour = () => {
    return (
        <div className='container fourOhFour'>
            <img src={notFound} alt='Not found'  />
            <a className='button' style={{margin: '50px 0', padding: '10px 50px'}} href='/'>Home</a>
        </div>
    )
}

export default FourOhFour
