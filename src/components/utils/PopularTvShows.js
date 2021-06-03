import Heading from '../utils/Heading'
import MediaCard from './MediaCard'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
    fetchPopularTv,
} from '../../service/index'

const PopularTvShows = () => {
    const [popularTvShows, setPopularTvShows] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            setPopularTvShows(await fetchPopularTv())
        }

        fetchApi()
    }, [])

    // popularTvShows.map((item) => {
    //     console.log(item)
    // })

    return (
        <div className='popularTvShows'>
            <Heading text={'Popular Tv Shows'} />
            <div className='grid'>
                {popularTvShows.slice(0, 18).map((tv) => (
                    <MediaCard key={tv.id} media={tv} type='tv' />
                ))}
            </div>
        </div>
    )
}

export default PopularTvShows
