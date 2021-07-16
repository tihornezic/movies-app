import {useEffect} from 'react'
import NowPlayingMovies from '../utils/NowPlayingMovies'

const NowPlayingMoviesPage = () => {

    useEffect(() => {
        document.body.classList.remove('overflow')
    }, [])

    return (
        <div className='container nowPlayingMoviesPage'>
            <NowPlayingMovies page={'nowPlayingMoviesPage'} />

        </div>
    )
}

export default NowPlayingMoviesPage
