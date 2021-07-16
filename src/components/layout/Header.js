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

    const [navbarActive, setNavbarActive] = useState(false)
    const [profileMenu, setProfileMenu] = useState(false)
    const [profileMenuSmall, setProfileMenuSmall] = useState(false)
    const [openHamburger, setOpenHamburger] = useState(false)
    const [slideMenu, setSlideMenu] = useState(false)

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

    const handleHeaderActive = () => {
        if (window.scrollY > 0) {
            setNavbarActive(true)
        } else {
            setNavbarActive(false)
        }
    }

    window.addEventListener('scroll', handleHeaderActive)

    const handleChangeProfileMenu = () => {
        setProfileMenu(prev => !prev)
    }

    const handleChangeProfileMenuSmall = () => {
        setProfileMenuSmall(prev => !prev)
    }

    const toggleBodyOverflowHidden = () => {
        document.body.classList.toggle('overflow')
    }

    console.log(slideMenu)

    return (
        <nav className={navbarActive ? 'header active' : 'header'} >
            <div className='container headerContainer'>
                <div className='bigHeader'>
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
                                    <Link to='/movies/now-playing'>Now Playing</Link>
                                    <Link to='/movies/top-rated'>Top 100</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='menuItem'>
                                <p className='fakeLink'>TV Shows</p>
                                <div className='dropdown'>
                                    <Link to='/tvs/discover'>Discover TV Shows</Link>
                                    <Link to='/tvs/popular'>Popular</Link>
                                    <Link to='/tvs/top-rated'>Top 50</Link>
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

                                        <div className={navbarActive && profileMenu ? 'profileMenu active' : profileMenu ? 'profileMenu' : 'noDisplay'}>
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
                        <div className={navbarActive ? 'search active' : 'search'}>
                            <Search />
                        </div>
                    </div>
                </div>

                <div className='smallHeader'>
                    <div className='hamburger' onClick={() => {setOpenHamburger(prev => !prev); setSlideMenu(prev => !prev); toggleBodyOverflowHidden()}}>
                        <div className={openHamburger ? 'open' : 'close'}></div>
                        <div className={openHamburger ? 'open' : 'close'}></div>
                        <div className={openHamburger ? 'open' : 'close'}></div>
                    </div>

                    <Link to='/' className='brand'>
                        <MovieCreationOutlinedIcon className='icon' />
                        <h1>MoviesApp</h1>
                    </Link>

                    {currentUser ?
                        <div className='account'>
                            <div className='circle noSelect' onClick={() => setProfileMenuSmall(prev => !prev)} >
                                <span>
                                    {userInfo.firstName?.charAt(0)}
                                    {userInfo.lastName?.charAt(0)}
                                </span>
                            </div>

                            <div className={profileMenuSmall ? 'profileMenu' : 'noDisplay'}>
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
                                    <Link to='/profile' onClick={handleChangeProfileMenuSmall}>
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
                        :
                        <Link to='/login'>Account</Link>
                    }

                </div>

            </div>

            <div className={slideMenu ? 'slideMenu slideMenuOpen' : 'slideMenu'}>
                <div className={!navbarActive ? 'slideMenuHeaderContainer' : 'slideMenuHeaderContainer noDisplay'}>
                    <div className='slideMenuRow'>
                        <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/' className='brand'>
                            <MovieCreationOutlinedIcon className='icon' />
                            <h1>MoviesApp</h1>
                        </Link>
                    </div>

                    <div className='column'>
                        <div className={navbarActive ? 'search active' : 'search'}>
                            <Search setSlideMenu={setSlideMenu} setOpenHamburger={setOpenHamburger} />
                        </div>

                        <div className='linksContainer'>
                            <div className='row'>
                                <p>Movies</p>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/movies/discover'>Discover Movies</Link>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/movies/now-playing'>Now Playing</Link>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/movies/top-rated'>Top 100</Link>
                            </div>
                            <div className='row'>
                                <p>TV Shows</p>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/tvs/discover'>Discover TV Shows</Link>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/tvs/popular'>Popular</Link>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/tvs/top-rated'>Top 50</Link>
                            </div>
                            <div className='row'>
                                <p>Cast & Crew</p>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/actors'>Actors</Link>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/directors'>Directors</Link>
                            </div>
                            <div className='rowBig'>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/watchlist'>My Watchlist</Link>
                            </div>
                            <div className='rowBig'>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/watched'>My Watchedlist</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={navbarActive ? 'slideMenuHeaderContainerSmall' : 'slideMenuHeaderContainerSmall noDisplay'}>
                    <div className='slideMenuRow'>
                        <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/' className='brand'>
                            <MovieCreationOutlinedIcon className='icon' />
                            <h1>MoviesApp</h1>
                        </Link>
                    </div>

                    <div className='column'>
                        <div className={navbarActive ? 'search active' : 'search'}>
                            <Search setSlideMenu={setSlideMenu} setOpenHamburger={setOpenHamburger} />
                        </div>

                        <div className='linksContainer'>
                            <div className='row'>
                                <p>Movies</p>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/movies/discover'>Discover Movies</Link>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/movies/now-playing'>Now Playing</Link>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/movies/top-rated'>Top 100</Link>
                            </div>
                            <div className='row'>
                                <p>TV Shows</p>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/tvs/discover'>Discover TV Shows</Link>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/tvs/popular'>Popular</Link>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/tvs/top-rated'>Top 50</Link>
                            </div>
                            <div className='row'>
                                <p>Cast & Crew</p>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/actors'>Actors</Link>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/directors'>Directors</Link>
                            </div>
                            <div className='rowBig'>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/watchlist'>My Watchlist</Link>
                            </div>
                            <div className='rowBig'>
                                <Link onClick={() => {setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev)}} to='/watched'>My Watchedlist</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
