import MediaCard from './MediaCard'
import Heading from './Heading'
import {useState, useEffect} from 'react'
import CustomPagination from '../utils/CustomPagination'
import {Link} from 'react-router-dom'
import {
    fetchNowPlayingMovies,
    fetchNowPlayingMoviesPagesNumber,
} from '../../service/movies'

const NowPlayingMovies = ({page}) => {
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])

    // if page is 'nowPlayingMoviesPage'
    const [firstTwentyMovies, setFirstTwentyMovies] = useState([])
    const [secondTwentyMovies, setSecondTwentyMovies] = useState([])
    const [thirdTwentyMovies, setThirdTwentyMovies] = useState([])

    const [totalPagesNumber, setTotalPagesNumber] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchApi = async () => {
            setNowPlayingMovies(await fetchNowPlayingMovies())

            setFirstTwentyMovies(await fetchNowPlayingMovies(calculatePageFirst(currentPage)))
            setSecondTwentyMovies(await fetchNowPlayingMovies(calculatePageSecond(currentPage)))
            setThirdTwentyMovies(await fetchNowPlayingMovies(calculatePageThird(currentPage)))
            setTotalPagesNumber(await fetchNowPlayingMoviesPagesNumber())
        }

        fetchApi()
    }, [currentPage])

    const calculatePageFirst = (currentPage) => {
        return parseInt(currentPage) * 3 - 2
    }

    const calculatePageSecond = (currentPage) => {
        return parseInt(currentPage) * 3 - 1
    }

    const calculatePageThird = (currentPage) => {
        return parseInt(currentPage) * 3
    }

    // console.log(nowPlayingMovies)

    return (
        <div className='nowPlayingMovies'>

            {page === 'home' &&
                <>
                    <div className='headingRow'>
                        <Heading text={'Playing In Theaters'} />
                        <Link to='/movies/now-playing'>See All</Link>
                    </div>

                    <div className='grid'>
                        {nowPlayingMovies.slice(0, 18).map((movie) => (
                            <MediaCard key={movie.id} media={movie} type='movie' />
                        ))}
                    </div>
                </>
            }

            {page === 'nowPlayingMoviesPage' &&
                <>
                    <Heading text={'Now Playing Movies'} />

                    <div className='grid'>
                        {firstTwentyMovies.map((movie) => (
                            <MediaCard key={movie.id} media={movie} type='movie' />
                        ))}

                        {secondTwentyMovies.map((movie) => (
                            <MediaCard key={movie.id} media={movie} type='movie' />
                        ))}

                        {thirdTwentyMovies?.map((movie) => (
                            <MediaCard key={movie.id} media={movie} type='movie' />
                        ))}
                    </div>

                    {totalPagesNumber > 1 && (
                        <CustomPagination totalPagesNumber={totalPagesNumber} setCurrentPage={setCurrentPage} />
                    )}
                </>
            }


        </div>
    )
}

export default NowPlayingMovies
