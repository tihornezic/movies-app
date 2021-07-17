import Heading from '../utils/Heading'
import MediaCard from './MediaCard'
import {useState, useEffect} from 'react'
import CustomPagination from '../utils/CustomPagination'
import {Link} from 'react-router-dom'
import {
    fetchPopularTv,
    fetchPopularTvPagesNumber
} from '../../service/tv'

const PopularTvShows = ({page}) => {
    const [popularTvShows, setPopularTvShows] = useState([])

    const [firstTwentyTvShows, setFirstTwentyTvShows] = useState([])
    const [secondTwentyTvShows, setSecondTwentyTvShows] = useState([])
    const [thirdTwentyTvShows, setThirdTwentyTvShows] = useState([])

    const [totalPagesNumber, setTotalPagesNumber] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchApi = async () => {
            setPopularTvShows(await fetchPopularTv())

            setFirstTwentyTvShows(await fetchPopularTv(calculatePageFirst(currentPage)))
            setSecondTwentyTvShows(await fetchPopularTv(calculatePageSecond(currentPage)))
            setThirdTwentyTvShows(await fetchPopularTv(calculatePageThird(currentPage)))
            setTotalPagesNumber(await fetchPopularTvPagesNumber())
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

    return (
        <div className='popularTvShows'>
            {/* <Heading text={'Popular Tv Shows'} />
            <div className='grid'>
                {popularTvShows.slice(0, 18).map((tv) => (
                    <MediaCard key={tv.id} media={tv} type='tv' />
                ))}
            </div> */}

            {page === 'home' &&
                <>
                    <div className='headingRow'>
                        <Heading text={'Popular Tv Shows'} />
                        <Link to='/tvs/popular'>See All</Link>
                    </div>

                    <div className='grid'>
                        {popularTvShows.slice(0, 18).map((movie) => (
                            <MediaCard key={movie.id} media={movie} type='tv' />
                        ))}
                    </div>
                </>
            }

            {page === 'popularTvShowsPage' &&
                <>
                    <Heading text={'Popular Tv Shows'} />

                    <div className='grid'>
                        {firstTwentyTvShows.map((tv) => (
                            <MediaCard key={tv.id} media={tv} type='tv' />
                        ))}

                        {secondTwentyTvShows.map((tv) => (
                            <MediaCard key={tv.id} media={tv} type='tv' />
                        ))}

                        {thirdTwentyTvShows?.map((tv) => (
                            <MediaCard key={tv.id} media={tv} type='tv' />
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

export default PopularTvShows
