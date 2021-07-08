import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import {useStateValue} from '../../context/StateProvider'
import MediaCard from '../utils/MediaCard'
import Heading from '../utils/Heading'

const Watchlist = () => {
    const {currentUser, getWatchlistMediaFromDatabase} = useAuth()
    const [{watchlistArray}, dispatch] = useStateValue()
    const [watchlist, setWatchlist] = useState([])
    const history = useHistory()

    useEffect(() => {
        if (currentUser) {
            getWatchlistMediaFromDatabase(currentUser, setWatchlist)

            if (watchlistArray) {
                dispatch({
                    type: 'ANNUL_WATCHLIST_ARRAY',
                })
            } 

        } else {
            setWatchlist([])
            redirectToLogin()
        }

    }, [])

    // console.log(watchlist)

    const redirectToLogin = () => {
        history.push({
            pathname: '/login',
            state: {message: 'Login to be able to add your Movies and Tv Series to watchlist/watchedlist.'}
        })
    }

    return (
        <div className='container watchlist'>
            <Heading text='My Watchlist' />

            <div className='grid'>
                {watchlist.map((media) => (
                    <MediaCard key={media.id} media={media} type={media.type} listType={'watchlist'} />
                ))}
            </div>
        </div>
    )
}

export default Watchlist
