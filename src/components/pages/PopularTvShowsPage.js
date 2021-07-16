import {useEffect} from 'react'
import PopularTvShows from '../utils/PopularTvShows'

const PopularTvShowsPage = () => {

    useEffect(() => {
        document.body.classList.remove('overflow')
    }, [])

    return (
        <div className='container popularTvShowsPage'>
            <PopularTvShows page={'popularTvShowsPage'} />

        </div>
    )
}

export default PopularTvShowsPage
