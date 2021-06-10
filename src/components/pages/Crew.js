import PublicIcon from '@material-ui/icons/Public';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import CakeIcon from '@material-ui/icons/Cake';
import moment from 'moment'
import MediaCard from '../utils/MediaCard'
import ExpandAndShrink from '../utils/ExpandAndShrink'
import {
    fetchPersonDetail,
    fetchPersonMovieCreditsCrew,
    fetchPersonExternalIds,
} from '../../service/people'

const Crew = () => {
    const [crew, setCrew] = useState([])
    const [movieCreditsCrew, setMovieCreditsCrew] = useState([])
    const [externalIds, setExternalIds] = useState([])

    const [seeAllMovies, setSeeAllMovies] = useState(false)

    let {id} = useParams()

    const facebookUrl = 'https://facebook.com'
    const instagramUrl = 'https://instagram.com'
    const twitterUrl = 'https://twitter.com'

    useEffect(() => {
        const fetchApi = async () => {
            setCrew(await fetchPersonDetail(id))
            setMovieCreditsCrew(await fetchPersonMovieCreditsCrew(id))
            setExternalIds(await fetchPersonExternalIds(id))
        }

        fetchApi()
    }, [])

    // console.log(crew)

    const sortByPopularity = (a, b) => {
        if (a.popularity < b.popularity) {
            return 1
        }
        if (a.popularity > b.popularity) {
            return -1
        }
        return 0
    }

    
    const filterByDirector = movieCreditsCrew.filter(crew => crew.job === 'Director')
    const movieCreditsCrewSortedByPopularity = [...filterByDirector].sort(sortByPopularity)

    // console.log(movieCreditsCrewSortedByPopularity)


    return (
        <div className='container crew'>
            <div className='mainRow'>
                <div className='imageAndSocials'>
                    <img src={crew.poster} alt={crew.name} />
                    <div className='links'>
                        {crew.homepage === '' || crew.homepage === null ?
                            <PublicIcon className='disabled' />
                            :
                            <a href={crew.homepage} target='_blank'>
                                <PublicIcon />
                            </a>
                        }
                        {externalIds.facebookId === '' || externalIds.facebookId === null ?
                            <FacebookIcon className='disabled' />
                            :
                            <a href={`${facebookUrl}/${externalIds.facebookId}`} target='_blank'>
                                <FacebookIcon />
                            </a>
                        }
                        {externalIds.instagramId === '' || externalIds.instagramId === null ?
                            <InstagramIcon className='disabled' />
                            :
                            <a href={`${instagramUrl}/${externalIds.instagramId}`} target='_blank'>
                                <InstagramIcon />
                            </a>
                        }
                        {externalIds.twitterId === '' || externalIds.twitterId === null ?
                            <TwitterIcon className='disabled' />
                            :
                            <a href={`${twitterUrl}/${externalIds.twitterId}`} target='_blank'>
                                <TwitterIcon />
                            </a>
                        }
                    </div>
                </div>

                <div className='info'>
                    <h1>{crew.name}</h1>
                    <div className='bioInfo'>
                        <CakeIcon />
                        <p>
                            {crew.deathday ?
                                <>
                                    {moment(crew.birthday).format("MMMM Do, YYYY")}
                                    &nbsp;in {crew.placeOfBirth}
                                    &nbsp;-&nbsp;
                                    {moment(crew.deathday).format("MMMM Do, YYYY")}
                                    &nbsp;at
                                    &nbsp;({moment(crew.deathday).diff(crew.birthday, 'years')} years old)
                                </>
                                :
                                <>
                                    {moment(crew.birthday).format("MMMM Do, YYYY")}
                                    &nbsp;({moment().diff(crew.birthday, 'years')} years old)
                                    in {crew.placeOfBirth}
                                </>
                            }
                        </p>
                    </div>
                    <div className='biography'>
                        {crew.biography}
                    </div>
                </div>
            </div>

            <div className='knownForRow'>
                <h3>Known For Directing (Movies)</h3>
                <ExpandAndShrink seeAll={seeAllMovies} setSeeAll={setSeeAllMovies} />
            </div>

            <div className='grid'>
                {seeAllMovies ?
                    movieCreditsCrewSortedByPopularity.slice(0, 18)?.map((movie, index) => (
                        <MediaCard key={index} media={movie} type={'movie'} page='crew' />
                    ))
                    :
                    movieCreditsCrewSortedByPopularity.slice(0, 6)?.map((movie, index) => (
                        <MediaCard key={index} media={movie} type={'movie'} page='crew' />
                    ))
                }
            </div>

        </div>
    )
}

export default Crew
