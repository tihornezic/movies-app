import MediaCard from '../utils/MediaCard'
import Heading from '../utils/Heading'
import {useState, useEffect} from 'react'
import Pagination from "@material-ui/lab/Pagination";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {
    fetchDiscoverMovies,
    fetchDiscoverMoviesPagesNumber,
} from '../../service/movies'

const NowPlayingMovies = () => {
    const [firstTwentyMovies, setFirstTwentyMovies] = useState([])
    const [secondTwentyMovies, setSecondTwentyMovies] = useState([])
    const [thirdTwentyMovies, setThirdTwentyMovies] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPagesNumber, setTotalPagesNumber] = useState()

    useEffect(() => {
        const fetchApi = async () => {
            setFirstTwentyMovies(await fetchDiscoverMovies(calculatePageFirst(currentPage)))
            setSecondTwentyMovies(await fetchDiscoverMovies(calculatePageSecond(currentPage)))
            setThirdTwentyMovies(await fetchDiscoverMovies(calculatePageThird(currentPage)))

            setTotalPagesNumber(await fetchDiscoverMoviesPagesNumber(currentPage))
        }

        fetchApi()
    }, [currentPage])


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

    // console.log('Current page:', currentPage)

    const changePage = (event, value) => {
        setCurrentPage(value)
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const theme = createMuiTheme({
        typography: {
            fontFamily: 'Quicksand, sans-serif',
        },
        palette: {
            primary: {
                light: '#fff',
                main: '#9e4991',
                dark: '#b460a8',
                contrastText: '#fff',
                'MuiPaginationItem-currentPage:hover': {
                    backgroundColor: '#fff',
                },
            },
            text: {
                primary: '#e2e8f0',
            },
        },
    });

    return (
        <div className='container discoverMovies'>
            <Heading text={'Discover Movies'} />

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

            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '60px'}}>
                <ThemeProvider theme={theme}>
                    <Pagination
                        onChange={changePage}
                        // because I used 3 variables with each holding 20 movies, 
                        // there are 3 times less total pages number;
                        // so totalPagesNumber / 3 and rounded up
                        count={Math.round(totalPagesNumber / 3)}
                        color='primary'
                        siblingCount={3} 
                    />
                </ThemeProvider>
            </div>
        </div>
    )
}

export default NowPlayingMovies
