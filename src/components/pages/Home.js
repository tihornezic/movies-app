import {useEffect} from 'react'
import NowPlayingMoviesCarousel from '../utils/NowPlayingMoviesCarousel'
import NowPlayingMovies from '../utils/NowPlayingMovies'
import TrendingPersons from '../utils/TrendingPersons'
import PopularTvShows from '../utils/PopularTvShows'

const Home = () => {
    useEffect(() => {
        document.body.classList.remove('overflow')
    }, [])

    return (
        <div className='container home'>
            <NowPlayingMoviesCarousel />
            <NowPlayingMovies page={'home'} />
            <TrendingPersons />
            <PopularTvShows page={'home'} />
        </div>
    )
}

export default Home
