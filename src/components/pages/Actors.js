import Heading from '../utils/Heading'
import {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@material-ui/core/CircularProgress'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import PersonCard from '../utils/PersonCard'
import {
    fetchPopularPerson,
} from '../../service/people'

const Actors = () => {
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

    const [firstTwentyActors, setFirstTwentyActors] = useState([])
    const [secondTwentyActors, setSecondTwentyActors] = useState([])
    const [thirdTwentyActors, setThirdTwentyActors] = useState([])
    const [actors, setActors] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)


    useEffect(() => {
        setTimeout(() => {
            const fetchApi = async () => {
                // setActors(await fetchPopularPerson(currentPage))
                // setActors(prevActors => {
                //     return [...actors, ...prevActors]
                // })

                if (actors.length >= 500) {
                    setHasMore(false)
                }

                setFirstTwentyActors(await fetchPopularPerson(currentPage))
                setSecondTwentyActors(await fetchPopularPerson(currentPage + 1))
                setThirdTwentyActors(await fetchPopularPerson(currentPage + 2))
            }
            fetchApi()
        }, 500);

    }, [currentPage]) // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        setTimeout(() => {
            setActors(prevActors => {
                return [...prevActors, ...firstTwentyActors, ...secondTwentyActors, ...thirdTwentyActors]
            })
        }, 500)

    }, [thirdTwentyActors]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className='container actors'>
            <Heading text={'Actors'} />

            <InfiniteScroll
                style={{overflow: 'none', textAlign: 'center'}}
                dataLength={actors.length}
                next={() => setCurrentPage(prevCurrentPage => prevCurrentPage + 3)}
                hasMore={hasMore}
                loader={
                    <ThemeProvider theme={theme}>
                        <CircularProgress thickness={4.0} style={{marginTop: '50px'}} size={30} />
                    </ThemeProvider>
                }
            >
                <div className='grid'>
                    {actors.map((crew, index) => (
                        <PersonCard key={index} person={crew} knownFor='Acting' page='actors' />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default Actors
