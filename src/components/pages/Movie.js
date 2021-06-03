import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import VideoPlayerModal from '../utils/VideoPlayerModal'
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {
    fetchMovieDetail,
    fetchMovieVideo
} from '../../service/movies'

const Movie = () => {
    const [movie, setMovie] = useState([])
    const [youtubeVideo, setYoutubeVideo] = useState([])

    const [showModal, setShowModal] = useState(false)

    let {id} = useParams()

    useEffect(() => {
        const fetchApi = async () => {
            setMovie(await fetchMovieDetail(id))
            setYoutubeVideo(await fetchMovieVideo(id))
        }

        fetchApi()
    }, [])

    // console.log(movie)
    console.log(youtubeVideo)

    const openModal = () => {
        setShowModal(prev => !prev)
    }

    return (
        <div className='container movie'>
            {/* Movie: {id} */}
            <VideoPlayerModal showModal={showModal} setShowModal={setShowModal} movie={movie} youtubeVideo={youtubeVideo} />
            <div className='videoContainer'>
                <img src={movie.backdropPoster} alt={movie.title} />
                <PlayCircleFilledOutlinedIcon className='playButton' onClick={openModal} />
                {/* <p className='title'>{movie.title}</p> */}
            </div>
            <div className='main'>
                <h1 className='headingTitle'>{movie.title}</h1>
            </div>
        </div>
    )
}

export default Movie
