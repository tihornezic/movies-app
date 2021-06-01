import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';
import MovieCreationSharpIcon from '@material-ui/icons/MovieCreationSharp';
import TheatersIcon from '@material-ui/icons/Theaters';
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <nav className='header'>
            <div className='container header__container'>
                <Link to='/' className='header__brand'>
                    <MovieCreationOutlinedIcon className='header__icon' />
                    <h1>MoviesApp</h1>
                </Link>
                <ul className='header__links'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/watchlist'>Movies</Link>
                    </li>
                    <li>
                        <Link to='/watchlist'>TV Shows</Link>
                    </li>
                    <li>
                        <Link to='/watchlist'>Actors</Link>
                    </li>
                    <li>
                        <Link to='/watchlist'>My Watchlist</Link>
                    </li>
                    <li>
                        <Link to='/watched'>My Watchedlist</Link>
                    </li>
                    <li>
                        <Link to='/'>Account</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
