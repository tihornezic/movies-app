import NowPlayingMoviesCarousel from '../utils/NowPlayingMoviesCarousel'
import NowPlayingMovies from '../utils/NowPlayingMovies'
import TrendingPersons from '../utils/TrendingPersons'
import TopRatedMovies from '../utils/TopRatedMovies'
import PopularTvShows from '../utils/PopularTvShows'

const Home = () => {
    return (
        <div className='container home'>
            <NowPlayingMoviesCarousel />
            <NowPlayingMovies page={'home'} />
            <TrendingPersons />
            <PopularTvShows />
        </div>
    )
}

export default Home
