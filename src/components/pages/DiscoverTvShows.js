import MediaCard from '../utils/MediaCard'
import Heading from '../utils/Heading'
import {useState, useEffect} from 'react'
import CustomPagination from '../utils/CustomPagination'
import GenresList from '../utils/GenresList'
import useGenre from '../../hooks/useGenre'
import {
    fetchDiscoverTv,
    fetchDiscoverTvPagesNumber,
    fetchTvGenres,
} from '../../service/tv'

const DiscoverTvShows = () => {
    const [firstTwentyTvShows, setFirstTwentyTvShows] = useState([])
    const [secondTwentyTvShows, setSecondTwentyTvShows] = useState([])
    const [thirdTwentyTvShows, setThirdTwentyTvShows] = useState([])

    const [totalPagesNumber, setTotalPagesNumber] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const [allGenres, setAllGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const selectedGenresApi = useGenre(selectedGenres)

    useEffect(() => {
        const fetchApi = async () => {
            setFirstTwentyTvShows(await fetchDiscoverTv(calculatePageFirst(currentPage), selectedGenresApi))
            setSecondTwentyTvShows(await fetchDiscoverTv(calculatePageSecond(currentPage), selectedGenresApi))
            setThirdTwentyTvShows(await fetchDiscoverTv(calculatePageThird(currentPage), selectedGenresApi))

            setTotalPagesNumber(await fetchDiscoverTvPagesNumber(selectedGenresApi))
        }

        fetchApi()
    }, [currentPage, selectedGenresApi])

    const calculatePageFirst = (currentPage) => {
        return parseInt(currentPage) * 3 - 2
    }

    const calculatePageSecond = (currentPage) => {
        return parseInt(currentPage) * 3 - 1
    }

    const calculatePageThird = (currentPage) => {
        return parseInt(currentPage) * 3
    }

    useEffect(() => {
        const fetchApi = async () => {
            setAllGenres(await fetchTvGenres())
        }

        fetchApi()
    }, [])

    return (
        <div className='container discoverTvShows'>
            <Heading text={'Discover Tv Shows'} />

            <GenresList
                allGenres={allGenres}
                setAllGenres={setAllGenres}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                setCurrentPage={setCurrentPage}
            />

            <div className='grid'>
                {firstTwentyTvShows.map((movie) => (
                    <MediaCard key={movie.id} media={movie} type='tv' />
                ))}

                {secondTwentyTvShows.map((movie) => (
                    <MediaCard key={movie.id} media={movie} type='tv' />
                ))}

            
                {thirdTwentyTvShows?.map((movie) => (
                    <MediaCard key={movie.id} media={movie} type='tv' />
                ))}
            </div>

            {totalPagesNumber > 1 && (
                <CustomPagination totalPagesNumber={totalPagesNumber} setCurrentPage={setCurrentPage} />
            )}
        </div>
    )
}

export default DiscoverTvShows
