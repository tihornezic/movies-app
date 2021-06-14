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
                        <div className='movies'>
                            {/* <Link to='/watchlist'>Movies</Link> */}
                            <p className='fakeLink'>Movies</p>
                            <div className='categoriesList'>
                                <a href='/movies/now-playing'>Now playing</a>
                                <a href=''>Popular</a>
                                <a href=''>Top Rated</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to='/watchlist'>TV Shows</Link>
                    </li>
                    <li>
                        <Link to='/watchlist'>Cast & Crew</Link>
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
