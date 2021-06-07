import 'react-responsive-carousel/lib/styles/carousel.css';
import {Carousel} from 'react-responsive-carousel';
import {Link} from 'react-router-dom'
import {
    fetchNowPlayingMovies,
} from '../../service/movies'

import {useEffect, useState} from 'react'

const NowPlayingMoviesCarousel = () => {
    const [nowPlayingMovies,  setNowPlayingMovies] = useState([])
 
    useEffect(() => {
        const fetchApi = async () => {
            setNowPlayingMovies(await fetchNowPlayingMovies())
        }

        fetchApi()
    }, [])

    // console.log(nowPlayingMovies)

    // nowPlayingMovies.map((item) => (
    //     console.log(item)
    // ))


    const nowPlayingMoviesTen = nowPlayingMovies.slice(0, 10).map((movie, index) => {
        return (
            <a href={`/movie/${movie.id}`} key={movie.id}>
                <div>
                    <img src={movie.backdropPoster} alt={movie.title} />
                    <p className='title'>{movie.title}</p>
                </div>
            </a>
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
                    emulateTouch={true}
                    thumbWidth={120}
                    // renderArrowPrev={}
                >
                    {nowPlayingMoviesTen}
                </Carousel>
            )}
        </>
    )
}

export default NowPlayingMoviesCarousel
