import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import CakeIcon from '@material-ui/icons/Cake';
import moment from 'moment'
import MediaCard from '../utils/MediaCard'
import {
    fetchPersonDetail,
    fetchPersonMovieCreditsCast,
} from '../../service/people'

const Actor = () => {
    const [actor, setActor] = useState([])
    const [movieCreditsCast, setMovieCreditsCast] = useState([])


    let {id} = useParams()

    useEffect(() => {
        const fetchApi = async () => {
            setActor(await fetchPersonDetail(id))
            setMovieCreditsCast(await fetchPersonMovieCreditsCast(id))
        }

        fetchApi()
    }, [])

    // console.log(movieCreditsCast)

    const sortByPopularity = (a, b) => {
        if (a.popularity < b.popularity) {
            return 1
        }
        if (a.popularity > b.popularity) {
            return -1
        }
        return 0
    }

    // console.log(combinedCreditsCast.sort(sortByPopularity))

    const movieCreditsCastSortedByPopularity = [...movieCreditsCast].sort(sortByPopularity)
    // console.log(movieCreditsCastSortedByPopularity)


    return (
        <div className='container actor'>
            <div className='mainRow'>
                <img src={actor.poster} alt={actor.name} />

                <div className='info'>
                    <h1>{actor.name}</h1>
                    <div className='bioInfo'>
                        <CakeIcon />
                        <p>
                            {moment(actor.birthday).format("MMMM Do, YYYY")}
                            &nbsp;({moment().diff(actor.birthday, 'years')} years old)
                            in {actor.placeOfBirth}
                        </p>
                    </div>
                    <div className='biography'>
                        {actor.biography}
                    </div>
                </div>
            </div>

            <div className='knownForRow'>
                <h3>Known For (Movies)</h3>
                <div className='grid'>
                    {movieCreditsCastSortedByPopularity.slice(0, 12)?.map((movie, index) => (
                        <MediaCard key={index} media={movie} type={'movie'} page='actor' />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Actor
