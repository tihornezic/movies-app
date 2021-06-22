import Search from '../utils/Search'
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';
import {Link} from 'react-router-dom'

const Header = () => {

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
                                <a href='/movies/discover'>Discover Movies</a>
                                <a href='/movies/now_playing'>Now Playing</a>
                                <a href='/movies/top_rated'>Top 100</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='menuItem'>
                            <p className='fakeLink'>TV Shows</p>
                            <div className='dropdown'>
                                <a href='/tvs/discover'>Discover TV Shows</a>
                                <a href='/tvs/popular'>Popular</a>
                                <a href='/tvs/top_rated'>Top 50</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='menuItem'>
                            <p className='fakeLink'>Cast & Crew</p>
                            <div className='dropdown castCrew'>
                                <a href='/actors'>Actors</a>
                                <a href='/directors'>Directors - Top 30</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to='/watchlist'>My Watchlist</Link>
                    </li>
                    <li>
                        <Link to='/watched'>My Watchedlist</Link>
                    </li>
                </ul>

                <div className='links'>
                    <li>
                        <Link to='/'>Account</Link>
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
