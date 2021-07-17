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
import {useStateValue} from '../../context/StateProvider'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../layout/Footer'
import {
    fetchMovieDetail,
    fetchMovieVideo,
    fetchMovieCrew,
    fetchMovieCast,
    fetchSimilarMovies,
    fetchRecommendedMovies,
} from '../../service/movies'

toast.configure()

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

    const {currentUser, setWatchlistMovieToDatabase, getWatchlistMediaIdsFromDatabase,
        removeFromWatchlist, setWatchedlistMovieToDatabase, getWatchedlistMediaIdsFromDatabase, removeFromWatchedlist}
        = useAuth()

    const [{ }, dispatch] = useStateValue() // eslint-disable-line no-empty-pattern

    const [watchlistMedia, setWatchlistMedia] = useState([])
    const [watchedlistMedia, setWatchedlistMedia] = useState([])

    const [isOnWatchlist, setIsOnWatchlist] = useState(false)
    const [isOnWatchedlist, setIsOnWatchedlist] = useState(false)

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
        document.body.classList.remove('overflow')
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // 
    // get all media ids in the watchlist to check whether movie/tv is already there when adding  
    useEffect(() => {
        if (currentUser) {
            getWatchlistMediaIdsFromDatabase(currentUser, setWatchlistMedia)
            getWatchedlistMediaIdsFromDatabase(currentUser, setWatchedlistMedia)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

    // watchlist
    const handleAddToWatchlist = (id) => {
        let watchlistMediaArray = watchlistMedia.map((movie) => {
            return movie.id
        })

        let watchedlistMediaArray = watchedlistMedia.map((movie) => {
            return movie.id
        })

        // check if media (movie or tv) is already added in the watchlist
        if (watchlistMediaArray.indexOf(JSON.stringify(id)) !== -1) {
            notifyError()
            // check if media (movie or tv) is already added in the watchedlist;
            // if true, move from watchedlist to watchlist!
        } else if (watchedlistMediaArray.indexOf(JSON.stringify(id)) !== -1) {
            removeFromWatchedlist(id)
            setWatchlistMovieToDatabase(id, adjustedMovie, 'movie')
            notifyMoved('watchlist')

            dispatch({
                type: 'REMOVE_WATCHEDLIST_MEDIA',
                payload: {
                    id: id
                }
            })

            dispatch({
                type: 'ADD_MEDIA_TO_WATCHLIST_ARRAY',
                payload: {
                    id: id,
                    title: movie.title
                }
            })
        }
        else {
            setWatchlistMovieToDatabase(id, adjustedMovie, 'movie')
            setIsOnWatchlist(true)
            notifyAdded('watchlist')

            dispatch({
                type: 'ADD_MEDIA_TO_WATCHLIST_ARRAY',
                payload: {
                    id: id,
                    title: movie.title
                }
            })
        }
    }

    const handleRemoveFromWatchlist = (id) => {
        removeFromWatchlist(id)
        notifyRemoved('watchlist')

        dispatch({
            type: 'REMOVE_WATCHLIST_MEDIA',
            payload: {
                id: id
            }
        })
    }

    // watchedlist
    const handleAddToWatchedlist = (id) => {
        let watchedlistMediaArray = watchedlistMedia.map((movie) => {
            return movie.id
        })

        let watchlistMediaArray = watchlistMedia.map((movie) => {
            return movie.id
        })

        // check if media (movie or tv) is already added in the watchedlist
        if (watchedlistMediaArray.indexOf(JSON.stringify(id)) !== -1) {
            notifyError('watchedlist')

            // check if media (movie or tv) is already added in the watchlist;
            // if true, move from watchlist to watchedlist!
        } else if (watchlistMediaArray.indexOf(JSON.stringify(id)) !== -1) {
            removeFromWatchlist(id)
            setWatchedlistMovieToDatabase(id, adjustedMovie, 'movie')
            notifyMoved('watchedlist')

            dispatch({
                type: 'REMOVE_WATCHLIST_MEDIA',
                payload: {
                    id: id
                }
            })

            dispatch({
                type: 'ADD_MEDIA_TO_WATCHEDLIST_ARRAY',
                payload: {
                    id: id,
                    title: movie.title
                }
            })

        } else {
            setWatchedlistMovieToDatabase(id, adjustedMovie, 'movie')
            setIsOnWatchedlist(true)
            notifyAdded('watchedlist')

            dispatch({
                type: 'ADD_MEDIA_TO_WATCHEDLIST_ARRAY',
                payload: {
                    id: id,
                    title: movie.title
                }
            })
        }
    }

    const handleRemoveFromWatchedlist = (id) => {
        removeFromWatchedlist(id)
        notifyRemoved('watchedlist')

        dispatch({
            type: 'REMOVE_WATCHEDLIST_MEDIA',
            payload: {
                id: id
            }
        })
    }


    // to check to see if a movie is already on the watchlist
    useEffect(() => {
        // watchlist
        let watchlistMediaArray = watchlistMedia.map((movie) => {
            return movie.id
        })

        if (watchlistMediaArray.indexOf(JSON.stringify(movie.id)) !== -1) {
            setIsOnWatchlist(true)
        } else {
            setIsOnWatchlist(false)
        }

        // watchedlist
        let watchedlistMediaArray = watchedlistMedia.map((movie) => {
            return movie.id
        })

        if (watchedlistMediaArray.indexOf(JSON.stringify(movie.id)) !== -1) {
            setIsOnWatchedlist(true)
        } else {
            setIsOnWatchedlist(false)
        }
    }, [watchlistMedia, movie.id, watchedlistMedia]) 


    // redirect
    const redirectToLogin = () => {
        history.push({
            pathname: '/login',
            state: {message: 'Login to be able to add your Movies and Tv Series to watchlist/watchedlist.'}
        })
    }


    // toastify notifications
    const notifyAdded = (listType) => {
        if (listType === 'watchlist') {
            toast(`${movie.title} has been added to the Watchlist!`, {
                position: toast.POSITION.BOTTOM_RIGHT, autoClose: 6000
            })
        } else {
            toast(`${movie.title} has been added to the Watchedlist!`, {
                position: toast.POSITION.BOTTOM_RIGHT, autoClose: 6000
            })
        }
    }

    const notifyMoved = (listType) => {
        if (listType === 'watchlist') {
            toast(`${movie.title} has been moved from Watchedlist to the Watchlist!`, {
                position: toast.POSITION.BOTTOM_RIGHT, autoClose: 6000
            })
        } else {
            toast(`${movie.title} has been moved from Watchlist to the Watchedlist!`, {
                position: toast.POSITION.BOTTOM_RIGHT, autoClose: 6000
            })
        }
    }

    const notifyError = (listType) => {
        if (listType === 'watchlist') {
            toast.error(`${movie.title} is already on the Watchlist!`, {
                position: toast.POSITION.BOTTOM_RIGHT, autoClose: 6000
            })
        } else {
            toast.error(`${movie.title} is already on the Watchedlist!`, {
                position: toast.POSITION.BOTTOM_RIGHT, autoClose: 6000
            })
        }
    }

    const notifyRemoved = (listType) => {
        if (listType === 'watchlist') {
            toast.error(`${movie.title} has been removed from the Watchlist!`, {
                position: toast.POSITION.BOTTOM_RIGHT, autoClose: 6000
            })
        } else {
            toast.error(`${movie.title} has been removed from the Watchedlist!`, {
                position: toast.POSITION.BOTTOM_RIGHT, autoClose: 6000
            })
        }
    }

    // console.log(isOnWatchlist)
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

        return false
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

        return false
    })


    return (

        <div className='footerWrapper'>
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
                                <h1 className={movie.title?.length > 46 ? 'smallHeadingTitle' : 'headingTitle'}>{movie.title}</h1>
                                <span className='verticalLine'>|</span>
                                <button
                                    className={isOnWatchlist ? 'button adjustedMargins secondaryButton' : 'button adjustedMargins'}
                                    onClick={() => {
                                        if (currentUser) {
                                            if (isOnWatchlist) {
                                                handleRemoveFromWatchlist(movie.id)
                                            } else {
                                                handleAddToWatchlist(movie.id)
                                            }
                                        } else {
                                            redirectToLogin()
                                        }
                                    }}
                                >
                                    {isOnWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                                </button>

                                <button
                                    className={isOnWatchedlist ? 'button adjustedMargins secondaryButton' : 'button adjustedMargins'}
                                    onClick={() => {
                                        if (currentUser) {
                                            if (isOnWatchedlist) {
                                                handleRemoveFromWatchedlist(movie.id)
                                            } else {
                                                handleAddToWatchedlist(movie.id)
                                            }
                                        } else {
                                            redirectToLogin()
                                        }
                                    }}
                                >
                                    {isOnWatchedlist ? 'Remove from Watchedlist' : 'Add to Watchedlist'}
                                </button>

                            </div>

                            <div className='headingColumn'>
                                <h1 className={movie.title?.length > 46 ? 'smallHeadingTitle' : 'headingTitle'}>{movie.title}</h1>

                                <button
                                    style={{display: 'block', marginBottom: '10px', width: '100%'}}
                                    className={isOnWatchlist ? 'button adjustedMargins secondaryButton' : 'button adjustedMargins'}
                                    onClick={() => {
                                        if (currentUser) {
                                            if (isOnWatchlist) {
                                                handleRemoveFromWatchlist(movie.id)
                                            } else {
                                                handleAddToWatchlist(movie.id)
                                            }
                                        } else {
                                            redirectToLogin()
                                        }
                                    }}
                                >
                                    {isOnWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                                </button>

                                <button
                                    style={{width: '100%'}}
                                    className={isOnWatchedlist ? 'button adjustedMargins secondaryButton' : 'button adjustedMargins'}
                                    onClick={() => {
                                        if (currentUser) {
                                            if (isOnWatchedlist) {
                                                handleRemoveFromWatchedlist(movie.id)
                                            } else {
                                                handleAddToWatchedlist(movie.id)
                                            }
                                        } else {
                                            redirectToLogin()
                                        }
                                    }}
                                >
                                    {isOnWatchedlist ? 'Remove from Watchedlist' : 'Add to Watchedlist'}
                                </button>
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

                                    <a href={movie.homepage} className='homepage' target='_blank' rel="noreferrer">Movie Homepage</a>
                                </div>

                                <div className='detailColumn'>
                                    <div style={{display: 'flex'}}>
                                        <p style={{marginRight: '5px'}} className='rating'>{movie.rating}</p>
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
                                    </div>
                                    <p>
                                        {moment(movie.releaseDate).format("MMM Do, YYYY")}
                                    </p>
                                    {movie.genres?.map((genre, index) => (
                                        <p key={index}>{genre.name}</p>
                                    ))}
                                    <p>{movie.runtime}'</p>

                                    <a href={movie.homepage} className='homepage' target='_blank' rel="noreferrer">Movie Homepage</a>
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

            <Footer />
        </div>

    )
}

export default Movie
