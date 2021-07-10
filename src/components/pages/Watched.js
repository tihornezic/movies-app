import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import {useStateValue} from '../../context/StateProvider'
import MediaCard from '../utils/MediaCard'
import Heading from '../utils/Heading'
import Footer from '../layout/Footer'

const Watched = () => {
    const {currentUser, getWatchedlistMediaFromDatabase} = useAuth()
    const [{watchedlistArray}, dispatch] = useStateValue()
    const [watchedlist, setWatchedlist] = useState([])
    const history = useHistory()

    useEffect(() => {
        if (currentUser) {
            getWatchedlistMediaFromDatabase(currentUser, setWatchedlist)

            if (watchedlistArray) {
                dispatch({
                    type: 'ANNUL_WATCHEDLIST_ARRAY',
                })
            }

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
        <div className='footerWrapper'>
            <div className='container watchedlist'>
                <Heading text='My Watchedlist' />

                {watchedlist.length === 0 ?
                    <div className='empty'>
                        <p>Your watchedlist is empty!</p>
                        <p>Start searching for Movies and Tv Series to add them to your Watchedlist!</p>
                    </div>
                    :
                    <div className='grid'>
                        {watchedlist.map((media) => (
                            <MediaCard key={media.id} media={media} type={media.type} listType={'watchedlist'} />
                        ))}
                    </div>
                }
            </div>

            <Footer />
        </div>
    )
}

export default Watched
