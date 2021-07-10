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
import unknown from '../../img/unknown3.png'
import Footer from '../layout/Footer'
import {
    fetchPersonDetail,
    fetchPersonMovieCreditsCrew,
    fetchPersonTvCreditsCrew,
    fetchPersonMovieCreditsCast,
    fetchPersonExternalIds,
} from '../../service/people'

const Crew = () => {
    const [crew, setCrew] = useState([])
    const [movieCreditsCrew, setMovieCreditsCrew] = useState([])
    const [tvCreditsCrew, setTvCreditsCrew] = useState([])
    const [movieCreditsCast, setMovieCreditsCast] = useState([])
    const [externalIds, setExternalIds] = useState([])

    const [seeAllMovies, setSeeAllMovies] = useState(false)
    const [seeAllTvs, setSeeAllTvs] = useState(false)
    const [seeAllAppearances, setSeeAllAppearances] = useState(false)

    let {id} = useParams()

    const facebookUrl = 'https://facebook.com'
    const instagramUrl = 'https://instagram.com'
    const twitterUrl = 'https://twitter.com'

    useEffect(() => {
        const fetchApi = async () => {
            setCrew(await fetchPersonDetail(id))
            setMovieCreditsCrew(await fetchPersonMovieCreditsCrew(id))
            setTvCreditsCrew(await fetchPersonTvCreditsCrew(id))
            setMovieCreditsCast(await fetchPersonMovieCreditsCast(id))
            setExternalIds(await fetchPersonExternalIds(id))
        }

        fetchApi()
        window.scrollTo(0, 0)
    }, [])

    // console.log(crew)
    // console.log(tvCreditsCrew)
    // console.log(tvCreditsCrew)

    const sortByPopularity = (a, b) => {
        if (a.popularity < b.popularity) {
            return 1
        }
        if (a.popularity > b.popularity) {
            return -1
        }
        return 0
    }

    let filterByDirectorMovie = ''
    let filterByDirectorTv = ''
    let movieCreditsCastSortedByPopularity = ''

    if (movieCreditsCrew) {
        filterByDirectorMovie = movieCreditsCrew.filter(crew => crew.job === 'Director')
    }

    const movieCreditsCrewSortedByPopularity = [...filterByDirectorMovie].sort(sortByPopularity)

    if (tvCreditsCrew) {
        tvCreditsCrew?.filter(crew => crew.job === 'Director')
    }

    const tvCreditsCrewSortedByPopularity = [...filterByDirectorTv].sort(sortByPopularity)

    if (movieCreditsCast) {
        movieCreditsCastSortedByPopularity = [...movieCreditsCast].sort(sortByPopularity)
    }


    return (

        <div className='footerWrapper'>
            <div className='container crew'>
                {crew === false ?
                    <p className='mediaNotFound'>Director not found!</p>
                    :
                    <>
                        <div className='mainRow'>
                            <div className='imageAndSocials'>
                                {crew.profilePath === '' || crew.profilePath === null ?
                                    <img src={unknown} alt={crew.name} />
                                    :
                                    <img src={crew.poster} alt={crew.name} />
                                }
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



                        <div className='knownForRow adjustedMargins'>
                            <h3>Known For Directing (Tv Series/Sitcoms)</h3>
                            <ExpandAndShrink seeAll={seeAllTvs} setSeeAll={setSeeAllTvs} />
                        </div>

                        <div className='grid'>
                            {seeAllTvs ?
                                tvCreditsCrewSortedByPopularity.slice(0, 18)?.map((tv, index) => (
                                    <MediaCard key={index} media={tv} type={'tv'} page='crew' />
                                ))
                                :
                                tvCreditsCrewSortedByPopularity.slice(0, 6)?.map((tv, index) => (
                                    <MediaCard key={index} media={tv} type={'tv'} page='crew' />
                                ))
                            }
                        </div>



                        <div className='knownForRow adjustedMargins'>
                            <h3>Appearances in Movies</h3>
                            <ExpandAndShrink seeAll={seeAllAppearances} setSeeAll={setSeeAllAppearances} />
                        </div>

                        <div className='grid'>
                            {seeAllAppearances ?
                                movieCreditsCastSortedByPopularity.slice(0, 18)?.map((tv, index) => (
                                    <MediaCard key={index} media={tv} type={'movie'} page='actor' />
                                ))
                                :
                                movieCreditsCastSortedByPopularity.slice(0, 6)?.map((tv, index) => (
                                    <MediaCard key={index} media={tv} type={'movie'} page='actor' />
                                ))
                            }
                        </div>
                    </>
                }
            </div>

            <Footer />
        </div>

    )
}

export default Crew
