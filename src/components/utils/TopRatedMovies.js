import MovieCard from './MediaCard'
import Heading from '../utils/Heading'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
    fetchTopRatedMovies,
} from '../../service/index'


const TopRatedMovies = () => {
    const [topRatedMovies, setTopRatedMovies] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            setTopRatedMovies(await fetchTopRatedMovies())
        }

        fetchApi()
    }, [])

    // topRatedMovies.map((item) => {
    //     console.log(item)
    // })

    return (
        <div className='topRatedMovies'>
            {/* <h3 className='heading'>Top Rated Movies</h3> */}
            <Heading text={'Top Rated Movies'} />
            <div className='grid'>
                {topRatedMovies.slice(0, 18).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default TopRatedMovies
