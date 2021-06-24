import Heading from '../utils/Heading'
import {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import PersonCard from '../utils/PersonCard'
import {
    fetchPopularPerson,
} from '../../service/people'

const Directors = () => {
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

    const [directors, setDirectors] = useState([])

    const fetchAllDirectorsFromAPI = async () => {
        let endOfList = false
        let items = []
        let currentPage = 1

        while (endOfList === false) {
            const result = await fetchPopularPerson(currentPage)

            if (items.length === 2000) {
                endOfList = true
            }
            items = [...items, ...result]
            currentPage += 1
        }

        console.log(items)
        setDirectors(items)
    }

    useEffect(() => {
        fetchAllDirectorsFromAPI()
    }, [])


    const director = directors.map((crew, index) => {
        if (crew.knownFor === 'Directing') {
            return (
                <PersonCard key={index} person={crew} knownFor='Directing' page='directors' />
            )
        }
    })


    return (
        <div className='container directors'>
            <Heading text={'Top Rated Directors'} />

            {director.length > 1 ?
                <div className='grid'>
                    {director}
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

export default Directors
