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
    fetchMovieDetail,
    fetchMovieVideo,
    fetchMovieCrew,
    fetchMovieCast,
    fetchSimilarMovies,
    fetchRecommendedMovies,
} from '../../service/movies'

const Movie = () => {
    const [movie, setMovie] = useState([])
    const [youtubeVideo, setYoutubeVideo] = useState([])
    const [crews, setCrews] = useState([])
    const [casts, setCasts] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [recommendedMovies, setRecommendedMovies] = useState([])


    const [showModal, setShowModal] = useState(false)
    const [seeAll, setSeeAll] = useState(false)

    let {id} = useParams()

    useEffect(() => {
        const fetchApi = async () => {
            setMovie(await fetchMovieDetail(id))
            setYoutubeVideo(await fetchMovieVideo(id))
            setCrews(await fetchMovieCrew(id))
            setCasts(await fetchMovieCast(id))
            setSimilarMovies(await fetchSimilarMovies(id))
            setRecommendedMovies(await fetchRecommendedMovies(id))
        }

        fetchApi()
    }, [])

    // console.log(movie)
    // console.log(youtubeVideo)
    // console.log(crews)
    // console.log(similarMovies)
    // console.log(recommendedMovies)

    const openModal = () => {
        setShowModal(prev => !prev)
    }

    const director = crews?.map((crew, index) => {
        if (crew.job === 'Director') {
            return (
                <div key={index} className='crewRowItem'>
                    <a href={`/crew/${crew.id}`} className='name'>{crew.name}</a>
                    <p className='job'>{crew.job}</p>
                </div>
            )
        }
    })

    const screenplays = crews?.map((crew, index) => {
        if (crew.job === 'Screenplay') {
            return (
                <div key={index} className='crewRowItem'>
                    <a href={`/crew/${crew.id}`} className='name'>{crew.name}</a>
                    <p className='job'>{crew.job}</p>
                </div>
            )
        }
    })



    return (

        <div className='container movie'>
            {movie === false ?
                <p className='mediaNotFound'>Movie not found!</p>
                :
                <>
                    <VideoPlayerModal showModal={showModal} setShowModal={setShowModal} media={movie} youtubeVideo={youtubeVideo} />
                    <div className='videoContainer'>
                        <img src={movie.backdropPoster} alt={movie.title} />
                        <PlayCircleFilledOutlinedIcon className='playButton' onClick={openModal} />
                    </div>

                    <div className='main'>
                        <div className='headingRow'>
                            <h1 className='headingTitle'>{movie.title}</h1>
                            <span className='verticalLine'>|</span>
                            <a className='button adjustedMargins' href='/'>Add to Watchlist</a>
                            <a className='button' href='/'>Add to Watchedlist</a>
                        </div>

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
                                <p>
                                    <span className='verticalLine'>|</span>{moment(movie.releaseDate).format("MMM Do, YYYY")}
                                </p>
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
                                <ExpandAndShrink seeAll={seeAll} setSeeAll={setSeeAll} />
                            </div>

                            <div className='grid'>
                                {seeAll ?
                                    casts.slice(0, 18).map((cast, index) => (
                                        <PersonCard key={index} person={cast} type='movie' />
                                    ))
                                    :
                                    casts.slice(0, 6).map((cast, index) => (
                                        <PersonCard key={index} person={cast} type='movie' />
                                    ))}
                            </div>
                        </div>

                        <div className='recommendedMovies'>
                            <h3>Recommended Movies</h3>
                            <div className='grid'>
                                {recommendedMovies.slice(0, 6).map((movie) => (
                                    <MediaCard key={movie.id} media={movie} type='movie' />
                                ))}
                            </div>
                        </div>

                        <div className='similarMovies'>
                            <h3>Similar Movies</h3>
                            <div className='grid'>
                                {similarMovies.slice(0, 6).map((movie) => (
                                    <MediaCard key={movie.id} media={movie} type='movie' />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Movie
