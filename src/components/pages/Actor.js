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
    fetchPersonMovieCreditsCast,
    fetchPersonTvCreditsCast,
    fetchPersonExternalIds,
} from '../../service/people'

const Actor = () => {
    const [actor, setActor] = useState([])
    const [movieCreditsCast, setMovieCreditsCast] = useState([])
    const [tvCreditsCast, setTvCreditsCast] = useState([])
    const [externalIds, setExternalIds] = useState([])

    const [seeAllMovies, setSeeAllMovies] = useState(false)
    const [seeAllTvs, setSeeAllTvs] = useState(false)

    let {id} = useParams()

    const facebookUrl = 'https://facebook.com'
    const instagramUrl = 'https://instagram.com'
    const twitterUrl = 'https://twitter.com'

    useEffect(() => {
        const fetchApi = async () => {
            setActor(await fetchPersonDetail(id))
            setMovieCreditsCast(await fetchPersonMovieCreditsCast(id))
            setTvCreditsCast(await fetchPersonTvCreditsCast(id))
            setExternalIds(await fetchPersonExternalIds(id))
        }

        fetchApi()
    }, [])

    // console.log(actor)
    // console.log(movieCreditsCast)
    // console.log(tvCreditsCast)
    // console.log(externalIds)

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
    const tvCreditsCastSortedByPopularity = [...tvCreditsCast].sort(sortByPopularity)

    return (
        <div className='container actor'>
            <div className='mainRow'>
                <div className='imageAndSocials'>
                    <img src={actor.poster} alt={actor.name} />
                    <div className='links'>
                        {actor.homepage === '' || actor.homepage === null ?
                            <PublicIcon className='disabled' />
                            :
                            <a href={actor.homepage} target='_blank'>
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
                    <h1>{actor.name}</h1>
                    <div className='bioInfo'>
                        <CakeIcon />
                        <p>
                            {actor.deathday ?
                                <>
                                    {moment(actor.birthday).format("MMMM Do, YYYY")}
                                    &nbsp;in {actor.placeOfBirth}
                                    &nbsp;-&nbsp;
                                    {moment(actor.deathday).format("MMMM Do, YYYY")}
                                    &nbsp;at
                                    &nbsp;({moment(actor.deathday).diff(actor.birthday, 'years')} years old)
                                </>
                                :
                                <>
                                    {moment(actor.birthday).format("MMMM Do, YYYY")}
                                    &nbsp;({moment().diff(actor.birthday, 'years')} years old)
                                    in {actor.placeOfBirth}
                                </>
                            }
                        </p>
                    </div>
                    <div className='biography'>
                        {actor.biography}
                    </div>
                </div>
            </div>

            <div className='knownForRow'>
                <h3>Known For (Movies)</h3>
                <ExpandAndShrink seeAll={seeAllMovies} setSeeAll={setSeeAllMovies} />
            </div>

            <div className='grid'>
                {seeAllMovies ?
                    movieCreditsCastSortedByPopularity.slice(0, 18)?.map((movie, index) => (
                        <MediaCard key={index} media={movie} type={'movie'} page='actor' />
                    ))
                    :
                    movieCreditsCastSortedByPopularity.slice(0, 6)?.map((movie, index) => (
                        <MediaCard key={index} media={movie} type={'movie'} page='actor' />
                    ))
                }
            </div>



            <div className='knownForRow adjustedMargins'>
                <h3>Known For (Tv Series/Sitcoms)</h3>
                <ExpandAndShrink seeAll={seeAllTvs} setSeeAll={setSeeAllTvs} />
            </div>

            <div className='grid'>
                {seeAllTvs ?
                    tvCreditsCastSortedByPopularity.slice(0, 18)?.map((tv, index) => (
                        <MediaCard key={index} media={tv} type={'tv'} page='actor' />
                    ))
                    :
                    tvCreditsCastSortedByPopularity.slice(0, 6)?.map((tv, index) => (
                        <MediaCard key={index} media={tv} type={'tv'} page='actor' />
                    ))
                }
            </div>
        </div>
    )
}

export default Actor