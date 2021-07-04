import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import ReactStars from 'react-rating-stars-component';
import moment from 'moment'
import VideoPlayerModal from '../utils/VideoPlayerModal'
import MediaCard from '../utils/MediaCard'
import PersonCard from '../utils/PersonCard'
import ExpandAndShrink from '../utils/ExpandAndShrink'
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {
    fetchTvDetail,
    fetchTvVideo,
    fetchTvCrew,
    fetchTvCast,
    fetchRecommendedTvs,
    fetchSimilarTvs,
} from '../../service/tv'

const Tv = () => {
    const [tv, setTv] = useState([])
    const [youtubeVideo, setYoutubeVideo] = useState([])
    const [crews, setCrews] = useState([])
    const [casts, setCasts] = useState([])
    const [similarTvs, setSimilarTvs] = useState([])
    const [recommendedTvs, setRecommendedTvs] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [seeAll, setSeeAll] = useState(false)

    let {id} = useParams()

    useEffect(() => {
        const fetchApi = async () => {
            setTv(await fetchTvDetail(id))
            setYoutubeVideo(await fetchTvVideo(id))
            setCrews(await fetchTvCrew(id))
            setCasts(await fetchTvCast(id))
            setRecommendedTvs(await fetchRecommendedTvs(id))
            setSimilarTvs(await fetchSimilarTvs(id))
        }

        fetchApi()
        window.scrollTo(0, 0)
    }, [])

    // console.log(tv.createdBy)
    // console.log(youtubeVideo)
    // console.log(crews)


    const openModal = () => {
        setShowModal(prev => !prev)
    }

    const executiveProducer = crews?.map((crew, index) => {
        if (crew.job === 'Executive Producer') {
            return (
                <div key={index} className='crewRowItem'>
                    <Link to={`/crew/${crew.id}`} className='name'>{crew.name}</Link>
                    <p className='job'>{crew.job}</p>
                </div>
            )
        }
    })

    const creators = tv.createdBy?.map((creator, index) => {
        return (
            <div key={index} className='crewRowItem'>
                <Link to={`/crew/${creator.id}`} className='name'>{creator.name}</Link>
            </div>
        )
    })

    return (
        <div className='container tv'>
            {tv === false ?
                <p className='mediaNotFound'>Tv Show not found!</p>
                :
                <>
                    <VideoPlayerModal showModal={showModal} setShowModal={setShowModal} media={tv} youtubeVideo={youtubeVideo} />
                    <div className='videoContainer'>
                        <img src={tv.backdropPoster} alt={tv.title} />
                        <PlayCircleFilledOutlinedIcon className='playButton' onClick={openModal} />
                    </div>

                    <div className='main'>
                        <div className='headingRow'>
                            <h1 className='headingTitle'>{tv.title}</h1>
                            <p className='tvSeries'>
                                TV Series ({moment(tv.firstAirDate).format("YYYY")} -&nbsp;
                                    {tv.status === 'Returning Series' ? null : moment(tv.lastAirDate).format("YYYY")}
                                )
                            </p>
                            <div className='controlsRow'>
                                <span className='verticalLine'>|</span>
                                <a className='button adjustedMargins' href='/'>Add to Watchlist</a>
                                <a className='button' href='/'>Add to Watchedlist</a>
                            </div>
                        </div>

                        <div className='details'>
                            <div className='detailRow'>
                                <p className='rating'>{tv.rating}</p>
                                {tv.rating && (
                                    <ReactStars
                                        size={18}
                                        count={5}
                                        value={tv.rating / 1.8}
                                        edit={false}
                                        isHalf={true}
                                        activeColor="#b460a8"
                                        color="#b1acac"
                                    />
                                )}

                                <span className='verticalLine'>|</span>
                                {tv.genres?.map((genre, index) => (
                                    <p key={index}>{(index ? ', ' : '') + genre.name}</p>
                                ))}
                                <span className='verticalLine'>|</span>
                                <a href={tv.homepage} target='_blank' rel="noreferrer">{tv.homepage}</a>
                            </div>

                            <div className='detailRow'>
                                <p>
                                    <span className='whiteLabel'>Country Origin: </span>{tv.originCountry}
                                </p>
                                <span className='verticalLine'>|</span>
                                <p>
                                    <span className='whiteLabel'>Episode runtime: </span>{tv.episodeRunTime}'
                        </p>
                                <span className='verticalLine'>|</span>
                                <p>
                                    <span className='whiteLabel'>Seasons: </span><span className='boldSpan'>{tv.numberOfSeasons}</span>
                                </p>
                                <span className='verticalLine'>|</span>
                                <p>
                                    <span className='whiteLabel'>Episodes: </span><span className='boldSpan'>{tv.numberOfEpisodes}</span>
                                </p>
                                <span className='verticalLine'>|</span>
                                <p>
                                    <span className='whiteLabel'>Last Airdate: </span>{moment(tv.lastAirDate).format("MMM Do, YYYY")}
                                </p>
                            </div>

                            <div className='description'>
                                {tv.overview}
                            </div>
                        </div>

                        <div className='createdBy'>
                            {creators?.length === 1 ?
                                <h3>Creator</h3>
                                :
                                <h3>Creators</h3>
                            }
                            <div className='createdByRow'>
                                {creators}
                            </div>
                        </div>

                        <div className='crew'>
                            <h3>Crew</h3>
                            <div className='crewRow'>
                                {executiveProducer}
                            </div>
                        </div>

                        <div className='cast'>
                            <div className='headingRow'>
                                <h3>Cast</h3>
                                <ExpandAndShrink seeAll={seeAll} setSeeAll={setSeeAll} />
                            </div>

                            <div className='grid'>
                                {seeAll ?
                                    casts.slice(0, 18).map((cast, index) => (
                                        <PersonCard key={index} person={cast} type='tv' />
                                    ))
                                    :
                                    casts.slice(0, 6).map((cast, index) => (
                                        <PersonCard key={index} person={cast} type='tv' />
                                    ))}
                            </div>
                        </div>

                        <div className='recommendedTvs'>
                            <h3>Recommended Tv Series</h3>
                            <div className='grid'>
                                {recommendedTvs.slice(0, 6).map((tv) => (
                                    <MediaCard key={tv.id} media={tv} type='tv' />
                                ))}
                            </div>
                        </div>

                        <div className='similarTvs'>
                            <h3>Similar Tv Series</h3>
                            <div className='grid'>
                                {similarTvs.slice(0, 6).map((tv) => (
                                    <MediaCard key={tv.id} media={tv} type='tv' />
                                ))}
                            </div>
                        </div>

                    </div>
                </>
            }
        </div>
    )
}

export default Tv
