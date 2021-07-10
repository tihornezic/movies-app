import Search from '../utils/Search'
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined'
import {Link, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useAuth} from '../../context/AuthContext'
import {useStateValue} from '../../context/StateProvider'
import {db} from '../../firebase'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import {ClickAwayListener} from '@material-ui/core'

const Header = () => {
    const [error, setError] = useState('')
    const {currentUser, logout} = useAuth()
    const [{watchlistArray, watchedlistArray}, dispatch] = useStateValue()
    const [userInfo, setUserInfo] = useState([])
    const history = useHistory()

    const [profileMenu, setProfileMenu] = useState(false)

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out.')
        }
    }

    useEffect(() => {
        if (currentUser) {
            const getUserInfo = async () => {
                const data = await db.collection('users').doc(currentUser.uid).collection('userInfo').doc(currentUser.uid).get()
                setUserInfo(data.data())
            }

            getUserInfo()
        } else {
            setUserInfo([])
        }
    }, [])


    const handleChangeProfileMenu = () => {
        setProfileMenu(prev => !prev)
    }


    return (
        <nav className='header'>
            <div className='container headerContainer'>
                <Link to='/' className='brand'>
                    <MovieCreationOutlinedIcon className='icon' />
                    <h1>MoviesApp</h1>
                </Link>

                <ul className='links'>
                    <li>
                        <div className='menuItem'>
                            <p className='fakeLink'>Movies</p>
                            <div className='dropdown'>
                                <Link to='/movies/discover'>Discover Movies</Link>
                                <Link to='/movies/now_playing'>Now Playing</Link>
                                <Link to='/movies/top_rated'>Top 100</Link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='menuItem'>
                            <p className='fakeLink'>TV Shows</p>
                            <div className='dropdown'>
                                <Link to='/tvs/discover'>Discover TV Shows</Link>
                                <Link to='/tvs/popular'>Popular</Link>
                                <Link to='/tvs/top_rated'>Top 50</Link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='menuItem'>
                            <p className='fakeLink'>Cast & Crew</p>
                            <div className='dropdown castCrew'>
                                <Link to='/actors'>Actors</Link>
                                <Link to='/directors'>Directors - Top 30</Link>
                            </div>
                        </div>
                    </li>
                    <li className='watchlist'>
                        <Link to='/watchlist'>My Watchlist</Link>
                        {watchlistArray.length >= 1 &&
                            <div className='count'>
                                <span className='value'>{watchlistArray.length}</span>
                            </div>
                        }
                    </li>
                    <li className='watchedlist'>
                        <Link to='/watched'>My Watchedlist</Link>
                        {watchedlistArray.length >= 1 &&
                            <div className='count'>
                                <span className='value'>{watchedlistArray.length}</span>
                            </div>
                        }
                    </li>
                </ul>

                <div className='links'>
                    <li>
                        {currentUser ?
                            <ClickAwayListener onClickAway={() => setProfileMenu(false)}>
                                <div className='account'>
                                    <div className='circle noSelect' onClick={() => setProfileMenu(prev => !prev)} >
                                        <span>
                                            {userInfo.firstName?.charAt(0)}
                                            {userInfo.lastName?.charAt(0)}
                                        </span>
                                    </div>

                                    <div className={profileMenu ? 'profileMenu' : 'noDisplay'}>
                                        <span className='spike'></span>
                                        <div className='infoRow'>
                                            <div className='circle noSelect'>
                                                <span>
                                                    {userInfo.firstName?.charAt(0)}
                                                    {userInfo.lastName?.charAt(0)}
                                                </span>
                                            </div>
                                            <div className='info'>
                                                <p>
                                                    {userInfo.firstName}
                                                &nbsp;
                                                {userInfo.lastName}
                                                </p>
                                                <p className='smallFont'>
                                                    {currentUser.email}
                                                </p>
                                                <p className='smallFont'>
                                                    {userInfo.username}
                                                </p>

                                            </div>
                                        </div>
                                        <div className='options'>
                                            <Link to='/profile' onClick={handleChangeProfileMenu}>
                                                <div className='option'>
                                                    <PersonRoundedIcon />
                                                    <p>Profile</p>
                                                </div>
                                            </Link>
                                            <div onClick={handleLogout} className='option'>
                                                <ExitToAppRoundedIcon />
                                                <p>Log out</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ClickAwayListener>
                            :
                            <Link to='/login'>Account</Link>
                        }
                    </li>
                    <div className='search'>
                        <Search />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
