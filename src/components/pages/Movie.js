import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import ReactStars from 'react-rating-stars-component';
import moment from 'moment'
import VideoPlayerModal from '../utils/VideoPlayerModal'
import MediaCard from '../utils/MediaCard'
import PersonCard from '../utils/PersonCard'
import ExpandAndShrink from '../utils/ExpandAndShrink'
import {useState, useEffect} from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import {toast, toastify} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
    // adjustedMovie is here to get only id's from the movie variable because only id's
    // are needed and stored with the setWatchlistMovieToDatabase function
    const [adjustedMovie, setAdjustedMovie] = useState([])
    const [youtubeVideo, setYoutubeVideo] = useState([])
    const [crews, setCrews] = useState([])
    const [casts, setCasts] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [recommendedMovies, setRecommendedMovies] = useState([])


    const [showModal, setShowModal] = useState(false)
    const [seeAll, setSeeAll] = useState(false)

    let {id} = useParams()

    const {currentUser, setWatchlistMovieToDatabase, getWatchlistMediaIdsFromDatabase, removeFromWatchlist} = useAuth()
    const [watchlistMedia, setWatchlistMedia] = useState([])
    const history = useHistory()

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
        window.scrollTo(0, 0)
    }, [])

    // get all media ids in the watchlist to check whether movie/tv is already there when adding  
    useEffect(() => {
        getWatchlistMediaIdsFromDatabase(currentUser, setWatchlistMedia)
    }, [])

    useEffect(() => {
        setAdjustedMovie({
            id: movie.id,
            posterPath: movie.posterPath,
            poster: movie.poster,
            title: movie.title,
            rating: movie.rating,
            releaseDate: movie.releaseDate,
            // the reason for adjustedMovie variable
            genres: movie.genres?.map((genre) => (
                genre.id
            ))
        })
    }, [movie])

    const handleAddToWatchlist = (id) => {
        let watchlistMediaArray = watchlistMedia.map((movie) => {
            return movie.id
        })

        // check if media (movie or tv) is already added in the watchlist
        if (watchlistMediaArray.indexOf(JSON.stringify(id)) !== -1) {
            notifyError()
        } else {
            setWatchlistMovieToDatabase(id, adjustedMovie, 'movie')
            notifyAdded()
        }
    }

    // const handleRemoveFromWatchlist = (id) => {
    //     removeFromWatchlist(id)
    //     notifyRemoved()
    // }

    const notifyAdded = () => {
        toast(`${movie.title} added to the Watchlist!`, {
            position: toast.POSITION.BOTTOM_RIGHT, autoClose: 6000
        })
    }

    const notifyError = () => {
        toast.error(`${movie.title} is already on the Watchlist!`, {
            position: toast.POSITION.BOTTOM_RIGHT, autoClose: 6000
        })
    }

    const notifyRemoved = () => {
        toast.error(`${movie.title} removed from the Watchlist!`, {
            position: toast.POSITION.BOTTOM_RIGHT, autoClose: 6000
        })
    }

    // console.log(adjustedMovie)
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
                    <Link to={`/crew/${crew.id}`} className='name'>{crew.name}</Link>
                    <p className='job'>{crew.job}</p>
                </div>
            )
        }
    })

    const screenplays = crews?.map((crew, index) => {
        if (crew.job === 'Screenplay') {
            return (
                <div key={index} className='crewRowItem'>
                    <Link to={`/crew/${crew.id}`} className='name'>{crew.name}</Link>
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
                            <button className='button adjustedMargins' onClick={() => handleAddToWatchlist(movie.id)}>Add to Watchlist</button>
                            <button className='button'>Add to Watchedlist</button>
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
