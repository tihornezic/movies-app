import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import CakeIcon from '@material-ui/icons/Cake';
import moment from 'moment'
import MediaCard from '../utils/MediaCard'
import ExpandAndShrink from '../utils/ExpandAndShrink'
import {
    fetchPersonDetail,
    fetchPersonMovieCreditsCast,
} from '../../service/people'

const Actor = () => {
    const [actor, setActor] = useState([])
    const [movieCreditsCast, setMovieCreditsCast] = useState([])

    const [seeAll, setSeeAll] = useState(false)

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


    const movieCreditsCastSortedByPopularity = [...movieCreditsCast].sort(sortByPopularity)


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
                <ExpandAndShrink seeAll={seeAll} setSeeAll={setSeeAll} />
            </div>

            <div className='grid'>
                {seeAll ?
                    movieCreditsCastSortedByPopularity.slice(0, 18)?.map((movie, index) => (
                        <MediaCard key={index} media={movie} type={'movie'} page='actor' />
                    ))
                    :
                    movieCreditsCastSortedByPopularity.slice(0, 6)?.map((movie, index) => (
                        <MediaCard key={index} media={movie} type={'movie'} page='actor' />
                    ))
                }
            </div>
        </div>
    )
}

export default Actor
