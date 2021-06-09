import {Link} from 'react-router-dom'
import unknown from '../../img/unknown3.png'
import moment from 'moment'
import ReactStars from "react-rating-stars-component";

const MediaCard = ({media, type, page}) => {

    return (
        <div className='mediaCard'>
            <div className='image'>
                {type === 'movie' ?
                    <a href={`/movie/${media.id}`}>
                        <div className='overlay'></div>
                    </a>
                    :
                    <a href={`/tv/${media.id}`}>
                        <div className='overlay'></div>
                    </a>
                }
                {media.posterPath == null ?
                    <img src={unknown} alt='unknown' />
                    :
                    <img src={media.poster} alt={media.title} />
                }
            </div>
            <div className='info'>
                <p className='title'>{media.title}{media.name}
                    {type === 'tv' ?
                        <span className='originCountry'> ({media.originCountry})</span>
                        : null
                    }
                    {page === 'actor' ?
                        <span className='character'> (as {media.character})</span>
                        : null
                    }
                </p>
                <div className='rating'>
                    <span>{media.rating} <span className='line'>|</span></span>
                    <ReactStars
                        size={18}
                        count={5}
                        value={media.rating / 1.8}
                        edit={false}
                        isHalf={true}
                        activeColor="#b460a8"
                        color="fff"
                    />
                </div>
                <div className='releaseDate'>
                    <small>{moment(media.releaseDate).format("MMM Do, YYYY")}</small>
                </div>

                {media.genres.map((item, index) => {
                    // yes I really hardcoded this after spending approximately 6-7 hours to figure out
                    // how to set the genres for a movie to corresponding genres from the api;
                    // if in the future I figure out how to automate this via fancy function or
                    // smart api fetch I will update this; don't hate me
                    if (type === 'movie') {
                        switch (item) {
                            case 28:
                                return <small key={item}>{(index ? ', ' : '') + 'Action'}</small>
                            case 12:
                                return <small key={item}>{(index ? ', ' : '') + 'Adventure'}</small>
                            case 16:
                                return <small key={item}>{(index ? ', ' : '') + 'Animation'}</small>
                            case 35:
                                return <small key={item}>{(index ? ', ' : '') + 'Comedy'}</small>
                            case 80:
                                return <small key={item}>{(index ? ', ' : '') + 'Crime'}</small>
                            case 99:
                                return <small key={item}>{(index ? ', ' : '') + 'Documentary'}</small>
                            case 18:
                                return <small key={item}>{(index ? ', ' : '') + 'Drama'}</small>
                            case 10751:
                                return <small key={item}>{(index ? ', ' : '') + 'Family'}</small>
                            case 14:
                                return <small key={item}>{(index ? ', ' : '') + 'Fantasy'}</small>
                            case 36:
                                return <small key={item}>{(index ? ', ' : '') + 'History'}</small>
                            case 27:
                                return <small key={item}>{(index ? ', ' : '') + 'Horror'}</small>
                            case 10402:
                                return <small key={item}>{(index ? ', ' : '') + 'Music'}</small>
                            case 9648:
                                return <small key={item}>{(index ? ', ' : '') + 'Mystery'}</small>
                            case 10749:
                                return <small key={item}>{(index ? ', ' : '') + 'Romance'}</small>
                            case 878:
                                return <small key={item}>{(index ? ', ' : '') + 'Science Fiction'}</small>
                            case 10770:
                                return <small key={item}>{(index ? ', ' : '') + 'Tv Movie'}</small>
                            case 53:
                                return <small key={item}>{(index ? ', ' : '') + 'Thriller'}</small>
                            case 10752:
                                return <small key={item}>{(index ? ', ' : '') + 'War'}</small>
                            case 37:
                                return <small key={item}>{(index ? ', ' : '') + 'Western'}</small>
                            default:
                                return <small key={item}></small>
                        }
                    } else {
                        switch (item) {
                            case 10759:
                                return <small key={item}>{(index ? ', ' : '') + 'Action & Adventure'}</small>
                            case 16:
                                return <small key={item}>{(index ? ', ' : '') + 'Animation'}</small>
                            case 35:
                                return <small key={item}>{(index ? ', ' : '') + 'Comedy'}</small>
                            case 80:
                                return <small key={item}>{(index ? ', ' : '') + 'Crime'}</small>
                            case 99:
                                return <small key={item}>{(index ? ', ' : '') + 'Documentary'}</small>
                            case 18:
                                return <small key={item}>{(index ? ', ' : '') + 'Drama'}</small>
                            case 10751:
                                return <small key={item}>{(index ? ', ' : '') + 'Family'}</small>
                            case 10762:
                                return <small key={item}>{(index ? ', ' : '') + 'Kids'}</small>
                            case 9648:
                                return <small key={item}>{(index ? ', ' : '') + 'Mystery'}</small>
                            case 10763:
                                return <small key={item}>{(index ? ', ' : '') + 'News'}</small>
                            case 10764:
                                return <small key={item}>{(index ? ', ' : '') + 'Reality'}</small>
                            case 10765:
                                return <small key={item}>{(index ? ', ' : '') + 'Sci-Fi & Fantasy'}</small>
                            case 10766:
                                return <small key={item}>{(index ? ', ' : '') + 'Soap'}</small>
                            case 10767:
                                return <small key={item}>{(index ? ', ' : '') + 'Talk'}</small>
                            case 10768:
                                return <small key={item}>{(index ? ', ' : '') + 'War & Politics'}</small>
                            case 37:
                                return <small key={item}>{(index ? ', ' : '') + 'Western'}</small>
                        }
                    }
                })}
            </div>
        </div>
    )
}

export default MediaCard
