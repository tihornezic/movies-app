import MovieCard from './MovieCard'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
    fetchNowPlaying,
} from '../service/index'

const TrendingMovies = () => {
    const [trendingMovies, setTrendingMovies] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            setTrendingMovies(await fetchNowPlaying())
        }

        fetchApi()
    }, [])

    return (
        <div className='trendingMovies'>
            {/* <h3>Trending Movies</h3> */}
            {/* <h3>New Released Movies</h3> */}
            {/* <h3>New Releases</h3> */}
            <h3>Playing In Theaters</h3>
            <div className='trendingMovies__grid'>
                {trendingMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default TrendingMovies
