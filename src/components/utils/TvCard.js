import {Link} from 'react-router-dom'
import moment from 'moment'
import ReactStars from "react-rating-stars-component";

const TvCard = ({tv}) => {
    return (
        <div className='tvCard'>
            <div className='image'>
                <Link to={`/tv/${tv.id}`}>
                    <div className='overlay'></div>
                </Link>
                <img src={tv.poster} alt={tv.title} />
            </div>
        </div>
    )
}

export default TvCard
