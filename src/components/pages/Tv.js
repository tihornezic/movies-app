import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactStars from 'react-rating-stars-component';
import moment from 'moment'
import VideoPlayerModal from '../utils/VideoPlayerModal'
import MediaCard from '../utils/MediaCard'
import unknown from '../../img/unknown3.png'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {
    fetchTvDetail,
    fetchTvVideo,
    fetchTvCrew,
    fetchTvCast,
    fetchRecommendedTvs,
    fetchSimilarMovies,
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
            setSimilarTvs(await fetchSimilarMovies(id))
        }

        fetchApi()
    }, [])

    console.log(tv.createdBy)
    // console.log(youtubeVideo)
    // console.log(crews)


    const openModal = () => {
        setShowModal(prev => !prev)
    }

    const executiveProducer = crews.map((crew, index) => {
        if (crew.job === 'Executive Producer') {
            return (
                <div key={index} className='crewRowItem'>
                    <a href='' className='name'>{crew.name}</a>
                    <p className='job'>{crew.job}</p>
                </div>
            )
        }
    })

    const creators = tv.createdBy?.map((creator, index) => {
        return (
            <div key={index} className='crewRowItem'>
                <a href='' className='name'>{creator.name}</a>
            </div>
        )
    })

    return (
        <div className='container tv'>
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
                    {seeAll ?
                        <div className='controlContent' onClick={() => setSeeAll(prev => !prev)}>
                            {/* <ExpandLessIcon /> */}
                            <ExpandMoreIcon className='shrink' />
                            <p>Shrink</p>
                        </div>
                        :
                        <div className='controlContent' onClick={() => setSeeAll(prev => !prev)}>
                            <ExpandMoreIcon className='expand' />
                            <p>Expand</p>
                        </div>
                    }
                </div>

                <div className='grid'>
                    {seeAll ?
                        casts.slice(0, 18).map((cast, index) => (
                            <div key={index} className='castItem'>
                                <div className='image'>
                                    <a href={`#`}>
                                        <div className='overlay'></div>
                                    </a>
                                    {cast.profilePath === null ?
                                        <img src={unknown} alt='unknown' />
                                        :
                                        <img src={cast.poster} alt={cast.name} />
                                    }
                                </div>
                                <p className='name'>{cast.name}</p>
                                <p className='character'>{cast.character}</p>
                            </div>
                        ))
                        :
                        casts.slice(0, 6).map((cast, index) => (
                            <div key={index} className='castItem'>
                                <div className='image'>
                                    <a href={`#`}>
                                        <div className='overlay'></div>
                                    </a>
                                    {cast.profilePath === null ?
                                        <img src={unknown} alt='unknown' />
                                        :
                                        <img src={cast.poster} alt={cast.name} />
                                    }
                                </div>
                                <p className='name'>{cast.name}</p>
                                <p className='character'>{cast.character}</p>
                            </div>
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
        </div >
    )
}

export default Tv
