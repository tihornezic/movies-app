import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import {Link} from 'react-router-dom'
import {
    fetchNowPlaying,
} from '../service/index'

import {useEffect, useState} from 'react'

const NowPlayingMoviesCarousel = () => {
    const [nowPlayingMovies,  setNowPlayingMovies] = useState([])
 
    useEffect(() => {
        const fetchApi = async () => {
            setNowPlayingMovies(await fetchNowPlaying())
        }

        fetchApi()
    }, [])

    // console.log(nowPlayingMovies)

    // nowPlayingMovies.map((item) => (
    //     console.log(item)
    // ))


    const nowPlayingMoviesTen = nowPlayingMovies.slice(0, 10).map((movie, index) => {
        return (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div>
                    <img src={movie.backdropPoster} alt={movie.title} />
                    <p className='title'>{movie.title}</p>
                </div>
            </Link>
        )
    })

    return (
        <>
            {nowPlayingMoviesTen.length > 0 && (
                <Carousel
                    infiniteLoop={true}
                    autoPlay={true}
                    interval='5000'
                    showArrows={true}
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                    stopOnHover={false}
                    swipeable={true}
                >
                    {nowPlayingMoviesTen}
                </Carousel>
            )}
        </>
    )
}

export default NowPlayingMoviesCarousel
