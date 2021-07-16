import MediaCard from '../utils/MediaCard'
import Heading from '../utils/Heading'
import {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {
    fetchDiscoverTopRatedTvs,
} from '../../service/tv'

const TopRatedTvShows = () => {
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

    const [tvShows, setTvShows] = useState([])

    const fetchAllTvShowsFromAPI = async () => {
        let endOfList = false
        let items = []
        let currentPage = 1

        while (endOfList === false) {
            const result = await fetchDiscoverTopRatedTvs(currentPage)

            endOfList = !result.length
            items = [...items, ...result]
            currentPage += 1
        }
        
        setTvShows(items)
    }

    useEffect(() => {
        fetchAllTvShowsFromAPI()
        document.body.classList.remove('overflow')
    }, [])

    return (
        <div className='container topRatedTvShows'>
            <Heading text={'Top Rated Tv Shows'} />

            {tvShows.length > 1 ?
                <div className='grid'>
                    {tvShows.slice(0, 50).map((tv, index) => (
                        <MediaCard key={tv.id} media={tv} type='tv' topRated={true} index={index} />
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

export default TopRatedTvShows
