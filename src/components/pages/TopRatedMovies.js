import MediaCard from '../utils/MediaCard'
import Heading from '../utils/Heading'
import {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {
    fetchDiscoverTopRatedMovies,
} from '../../service/movies'

const TopRatedMovies = () => {
    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#fff',
                main: '#9e4991',
                dark: '#b460a8',
                contrastText: '#fff',
            },
        }
    })


    const [movies, setMovies] = useState([])

    const fetchAllMoviesFromAPI = async () => {
        let endOfList = false
        let items = []
        let currentPage = 1

        while (endOfList === false) {
            const result = await fetchDiscoverTopRatedMovies(currentPage)

            endOfList = !result.length
            items = [...items, ...result]
            currentPage += 1
        }
        
        setMovies(items)
    }

    useEffect(() => {
        fetchAllMoviesFromAPI()
    }, [])

    return (
        <div className='container topRatedMovies'>
            <Heading text={'Top Rated Movies'} />

            {movies.length > 1 ?
                <div className='grid'>
                    {movies.slice(0, 100).map((movie, index) => (
                        <MediaCard key={movie.id} media={movie} type='movie' topRated={true} index={index} />
                    ))}
                </div>
                :
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ThemeProvider theme={theme}>
                        <CircularProgress thickness={4.5} size={30} />
                    </ThemeProvider>
                </div>
            }
        </div>
    )
}

export default TopRatedMovies
