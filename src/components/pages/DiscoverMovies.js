import MediaCard from '../utils/MediaCard'
import Heading from '../utils/Heading'
import {useState, useEffect} from 'react'
import CustomPagination from '../utils/CustomPagination'
import GenresList from '../utils/GenresList'
import useGenre from '../../hooks/useGenre'
import {
    fetchDiscoverMovies,
    fetchDiscoverMoviesPagesNumber,
    fetchMovieGenres,
} from '../../service/movies'

const DiscoverMovies = () => {
    const [firstTwentyMovies, setFirstTwentyMovies] = useState([])
    const [secondTwentyMovies, setSecondTwentyMovies] = useState([])
    const [thirdTwentyMovies, setThirdTwentyMovies] = useState([])

    const [totalPagesNumber, setTotalPagesNumber] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const [allGenres, setAllGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const selectedGenresApi = useGenre(selectedGenres)

    // console.log('Current page:', currentPage)
    // console.log(totalPagesNumber)
    // console.log(selectedGenres)
    // console.log(selectedGenresApi)

    useEffect(() => {
        const fetchApi = async () => {
            setFirstTwentyMovies(await fetchDiscoverMovies(calculatePageFirst(currentPage), selectedGenresApi))
            setSecondTwentyMovies(await fetchDiscoverMovies(calculatePageSecond(currentPage), selectedGenresApi))
            setThirdTwentyMovies(await fetchDiscoverMovies(calculatePageThird(currentPage), selectedGenresApi))

            setTotalPagesNumber(await fetchDiscoverMoviesPagesNumber(selectedGenresApi))
        }

        fetchApi()
    }, [currentPage, selectedGenresApi])

    useEffect(() => {
        const fetchApi = async () => {
            setAllGenres(await fetchMovieGenres())
        }

        fetchApi()
    }, [])

    // since I am using grid with 6 elements in a row, and there are 20 movies per page from the API,
    // that means that I get 3 full rows with 6 movies (18), and then in 4th row remaining 2 movies, so total 20 movies per page;
    // because these 2 remaining movies look really ugly, I want the last row to be fully populated;
    // in order to achieve that, I know that I then must have 60 movies at a time in total because of my 6 elements grid 
    // (60 / 6 = 10 rows); 
    // so I created moviesPageFirst, moviesPageSecond and moviesPageThird variables so that each one carries
    // 20 movies and handles the required page number from the API respectively based on currentPage number

    // quick example:  
    // currentPage = 1 -> firstTwentyMovies: page 1 from API
    //                 -> secondTwentyMovies: page 2 from API
    //                 -> thirdTwentyMovies: page 3 from API

    // currentPage = 2 -> firstTwentyMovies: page 4 from API
    //                 -> secondTwentyMovies: page 5 from API
    //                 -> thirdTwentyMovies: page 6 from API

    // currentPage = 3 -> firstTwentyMovies: page 7 from API
    //                 -> secondTwentyMovies: page 8 from API
    //                 -> thirdTwentyMovies: page 9 from API
    // etc.


    const calculatePageFirst = (currentPage) => {
        // for the firstTwentyMovies I always want the below calculation;
        // in that manner, it willy always give back pages 1, 4, 7, 10, etc.
        // return parseInt(currentPage) + parseInt(currentPage) + parseInt(currentPage) - 2
        return parseInt(currentPage) * 3 - 2
    }

    const calculatePageSecond = (currentPage) => {
        // for the secondTwentyMovies I always want it to start at page number 2 from the API,
        // and then respectively continue the pattern; 2, 5, 8, 11, etc.
        // return parseInt(currentPage) + (parseInt(currentPage - 1) + parseInt(currentPage))
        return parseInt(currentPage) * 3 - 1
    }

    const calculatePageThird = (currentPage) => {
        // for the thirdTwentyMovies I always want it to start at page 3 from the API, and then then
        // simply multiply by 3, so it is always 3, 6, 9, 12, etc. 
        return parseInt(currentPage) * 3
    }


    return (
        <div className='container discoverMovies'>
            <Heading text={'Discover Movies'} />

            <GenresList
                allGenres={allGenres}
                setAllGenres={setAllGenres}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                setCurrentPage={setCurrentPage}
            />

            <div className='grid'>
                {firstTwentyMovies.map((movie) => (
                    <MediaCard key={movie.id} media={movie} type='movie' />
                ))}

                {secondTwentyMovies.map((movie) => (
                    <MediaCard key={movie.id} media={movie} type='movie' />
                ))}

                {/* optional chaining here because on the last page the thirdTwentyMovies will be 501 
                which doesn't exist */}
                {thirdTwentyMovies?.map((movie) => (
                    <MediaCard key={movie.id} media={movie} type='movie' />
                ))}
            </div>

            {totalPagesNumber > 1 && (
                <CustomPagination totalPagesNumber={totalPagesNumber} setCurrentPage={setCurrentPage} />
            )}

        </div>
    )
}

export default DiscoverMovies
