

const ResultCard = ({result}) => {
    const posterUrl = 'https://image.tmdb.org/t/p/w200/'

    return (
        <div className='resultCard'>
            {/* handle actor */}
            {result.known_for_department === 'Acting'  && result.profile_path !== null &&
                <a href={`/actor/${result.id}`}>
                    {/* {console.log(result.name)} */}
                    <div className='row'>
                        <img src={`${posterUrl}${result.profile_path}`} alt={result.name} width={'40px'} />
                        <p>{result.name}</p>
                    </div>
                </a>
            }

            {/* handle director */}   
            {result.known_for_department === 'Directing'  && result.profile_path !== null &&
                <a href={`/crew/${result.id}`}>
                    <div className='row'>
                        <img src={`${posterUrl}${result.profile_path}`} alt={result.name} width={'40px'} />
                        <p>{result.name}</p>
                    </div>
                </a>
            }

            {/* handle movie */}
            {result.media_type === 'movie' && result.poster_path !== null &&
                <a href={`/movie/${result.id}`}>
                    <div className='row'>
                        <img src={`${posterUrl}${result.poster_path}`} alt={result.name} width={'40px'} />
                        <p>{result.title}</p>
                    </div>
                </a>
            }

            {/* handle tv */}
            {result.media_type === 'tv' && result.poster_path !== null &&
                <a href={`/tv/${result.id}`}>
                    <div className='row'>
                        <img src={`${posterUrl}${result.poster_path}`} alt={result.name} width={'40px'} />
                        <p>{result.name}</p>
                    </div>
                </a>
            }

        </div>
    )
}

export default ResultCard
