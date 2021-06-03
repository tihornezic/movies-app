import MovieCard from '../utils/MovieCard'
import Heading from '../utils/Heading'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
    fetchNowPlayingMovies,
} from '../../service/index'

const NowPlayingMovies = () => {
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            setNowPlayingMovies(await fetchNowPlayingMovies())
        }

        fetchApi()
    }, [])

    return (
        <div className='nowPlayingMovies'>
            {/* <h3>Trending Movies</h3> */}
            {/* <h3>New Released Movies</h3> */}
            {/* <h3>New Releases</h3> */}
            {/* <h3 className='heading'>Playing In Theaters</h3> */}
            <Heading text={'Playing In Theaters'} />
            <div className='grid'>
                {nowPlayingMovies.slice(0, 18).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default NowPlayingMovies
