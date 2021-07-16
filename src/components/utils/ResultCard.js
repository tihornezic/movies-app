import {Link} from 'react-router-dom'

const ResultCard = ({result, setQuery, setResults, setSlideMenu, setOpenHamburger}) => {
    const posterUrl = 'https://image.tmdb.org/t/p/w200/'

    const removeBodyOverflowHidden = () => {
        document.body.classList.remove('overflow');
    }

    return (
        <div className='resultCard'>
            {/* handle actor */}
            {result.known_for_department === 'Acting' && result.profile_path !== null &&
                <>
                    {setSlideMenu && setOpenHamburger ?
                        <Link onClick={() => {
                            setResults(''); setQuery(''); setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev);
                            removeBodyOverflowHidden();
                        }} to={`/actor/${result.id}`}>
                            <div className='row'>
                                <img src={`${posterUrl}${result.profile_path}`} alt={result.name} width={'40px'} />
                                <p>{result.name}</p>
                            </div>
                        </Link>
                        :
                        <Link onClick={() => {
                            setResults(''); setQuery(''); removeBodyOverflowHidden();
                        }} to={`/actor/${result.id}`}>
                            <div className='row'>
                                <img src={`${posterUrl}${result.profile_path}`} alt={result.name} width={'40px'} />
                                <p>{result.name}</p>
                            </div>
                        </Link>
                    }
                </>
            }

            {/* handle director */}
            {result.known_for_department === 'Directing' && result.profile_path !== null &&
                <>
                    {setSlideMenu && setOpenHamburger ?
                        <Link onClick={() => {
                            setResults(''); setQuery(''); setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev);
                            removeBodyOverflowHidden();
                        }} to={`/crew/${result.id}`}>
                            <div className='row'>
                                <img src={`${posterUrl}${result.profile_path}`} alt={result.name} width={'40px'} />
                                <p>{result.name}</p>
                            </div>
                        </Link>
                        :
                        <Link onClick={() => {
                            setResults(''); setQuery(''); removeBodyOverflowHidden();
                        }} to={`/crew/${result.id}`}>
                            <div className='row'>
                                <img src={`${posterUrl}${result.profile_path}`} alt={result.name} width={'40px'} />
                                <p>{result.name}</p>
                            </div>
                        </Link>
                    }
                </>
            }

            {/* handle movie */}
            {result.media_type === 'movie' && result.poster_path !== null &&
                <>
                    {setSlideMenu && setOpenHamburger ?
                        <Link onClick={() => {
                            setResults(''); setQuery(''); setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev);
                            removeBodyOverflowHidden();
                        }} to={`/movie/${result.id}`}>
                            <div className='row'>
                                <img src={`${posterUrl}${result.poster_path}`} alt={result.name} width={'40px'} />
                                <p>{result.title}</p>
                            </div>
                        </Link>
                        :
                        <Link onClick={() => {
                            setResults(''); setQuery(''); removeBodyOverflowHidden();
                        }} to={`/movie/${result.id}`}>
                            <div className='row'>
                                <img src={`${posterUrl}${result.poster_path}`} alt={result.name} width={'40px'} />
                                <p>{result.title}</p>
                            </div>
                        </Link>
                    }
                </>
            }

            {/* handle tv */}
            {result.media_type === 'tv' && result.poster_path !== null &&
                <>
                    {setSlideMenu && setOpenHamburger ?
                        <Link onClick={() => {
                            setResults(''); setQuery(''); setSlideMenu(prev => !prev); setOpenHamburger(prev => !prev);
                            removeBodyOverflowHidden()
                        }} to={`/tv/${result.id}`}>
                            <div className='row'>
                                <img src={`${posterUrl}${result.poster_path}`} alt={result.name} width={'40px'} />
                                <p>{result.name}</p>
                            </div>
                        </Link>
                        :
                        <Link onClick={() => {
                            setResults(''); setQuery(''); removeBodyOverflowHidden();
                        }} to={`/tv/${result.id}`}>
                            <div className='row'>
                                <img src={`${posterUrl}${result.poster_path}`} alt={result.name} width={'40px'} />
                                <p>{result.name}</p>
                            </div>
                        </Link>
                    }
                </>
            }

        </div>
    )
}

export default ResultCard
