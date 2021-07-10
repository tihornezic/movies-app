import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import {useStateValue} from '../../context/StateProvider'
import MediaCard from '../utils/MediaCard'
import Heading from '../utils/Heading'
import Footer from '../layout/Footer'

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
        <div className='footerWrapper'>
            <div className='container watchlist'>
                <Heading text='My Watchlist' />

                {watchlist.length === 0 ?
                    <div className='empty'>
                        <p>Your watchlist is empty!</p>
                        <p>Start searching for Movies and Tv Series and add them to your Watchlist!</p>
                    </div>
                    :
                    <div className='grid'>
                        {watchlist.map((media) => (
                            <MediaCard key={media.id} media={media} type={media.type} listType={'watchlist'} />
                        ))}
                    </div>
                }

            </div>

            <Footer />
        </div>


    )
}

export default Watchlist
