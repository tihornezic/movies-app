import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactStars from 'react-rating-stars-component';
import moment from 'moment'
import VideoPlayerModal from '../utils/VideoPlayerModal'
import {Animated} from 'react-animated-css'
import unknown from '../../img/unknown3.png'
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {
    fetchMovieDetail,
    fetchMovieVideo,
    fetchMovieCrew,
    fetchMovieCast,
} from '../../service/movies'

const Movie = () => {
    const [movie, setMovie] = useState([])
    const [youtubeVideo, setYoutubeVideo] = useState([])
    const [crews, setCrews] = useState([])
    const [casts, setCasts] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [seeAll, setSeeAll] = useState(false)

    let {id} = useParams()

    useEffect(() => {
        const fetchApi = async () => {
            setMovie(await fetchMovieDetail(id))
            setYoutubeVideo(await fetchMovieVideo(id))
            setCrews(await fetchMovieCrew(id))
            setCasts(await fetchMovieCast(id))
        }

        fetchApi()
    }, [])

    // console.log(movie)
    // console.log(youtubeVideo)
    // console.log(crews)

    const openModal = () => {
        setShowModal(prev => !prev)
    }

    const director = crews.map((crew, index) => {
        if (crew.job === 'Director') {
            return (
                <div key={index} className='crewRowItem'>
                    <a href='' className='name'>{crew.name}</a>
                    <p className='job'>{crew.job}</p>
                </div>
            )
        }
    })

    const screenplays = crews.map((crew, index) => {
        if (crew.job === 'Screenplay') {
            return (
                <div key={index} className='crewRowItem'>
                    <a href='' className='name'>{crew.name}</a>
                    <p className='job'>{crew.job}</p>
                </div>
            )
        }
    })

    

    return (
        <div className='container movie'>
            <VideoPlayerModal showModal={showModal} setShowModal={setShowModal} movie={movie} youtubeVideo={youtubeVideo} />
            <div className='videoContainer'>
                <img src={movie.backdropPoster} alt={movie.title} />
                <PlayCircleFilledOutlinedIcon className='playButton' onClick={openModal} />
            </div>

            <div className='main'>
                <h1 className='headingTitle'>{movie.title}</h1>

                <div className='details'>
                    <div className='detailRow'>
                        <p className='rating'>{movie.rating}</p>
                        {movie.rating && (
                            <ReactStars
                                size={18}
                                count={5}
                                value={movie.rating / 1.8}
                                edit={false}
                                isHalf={true}
                                activeColor="#b460a8"
                                color="#b1acac"
                            />
                        )}
                        <p><span className='verticalLine'>|</span>{moment(movie.releaseDate).format("MMM Do, YYYY")}</p>
                        <span className='verticalLine'>|</span>
                        {movie.genres?.map((genre, index) => (
                            <p key={index}>{(index ? ', ' : '') + genre.name}</p>
                        ))}
                        <span className='verticalLine'>|</span>
                        <p>{movie.runtime}'</p>
                        <span className='verticalLine'>|</span>
                        <a href={movie.homepage} target='_blank' rel="noreferrer">{movie.homepage}</a>
                    </div>
                    <div className='description'>
                        {movie.overview}
                    </div>
                </div>

                <div className='crew'>
                    <h3>Crew</h3>
                    <div className='crewRow'>
                        {director}
                        {screenplays}
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
            </div>
        </div >
    )
}

export default Movie
