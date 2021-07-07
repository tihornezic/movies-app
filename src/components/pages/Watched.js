import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import MediaCard from '../utils/MediaCard'
import Heading from '../utils/Heading'

const Watched = () => {
    const {currentUser, getWatchedlistMediaFromDatabase} = useAuth()
    const [watchedlist, setWatchedlist] = useState([])
    const history = useHistory()

    useEffect(() => {
        if (currentUser) {
            getWatchedlistMediaFromDatabase(currentUser, setWatchedlist)
        } else {
            setWatchedlist([])
            redirectToLogin()
        }

    }, [])

    const redirectToLogin = () => {
        history.push({
            pathname: '/login',
            state: {message: 'Login to be able to add your Movies and Tv Series to watchlist/watchedlist.'}
        })
    }

    return (
        <div className='container watchedlist'>
            <Heading text='My Watchedlist' />

            <div className='grid'>
                {watchedlist.map((media) => (
                    <MediaCard key={media.id} media={media} type={media.type} listType={'watchedlist'} />
                ))}
            </div>
        </div>
    )
}

export default Watched
