import NowPlayingMoviesCarousel from './NowPlayingMoviesCarousel'
import TrendingMovies from './TrendingMovies'
import TrendingPersons from './TrendingPersons'

const Home = () => {
    return (
        <div className='container home'>
            <NowPlayingMoviesCarousel />
            <TrendingMovies />
            <TrendingPersons />
        </div>
    )
}

export default Home
