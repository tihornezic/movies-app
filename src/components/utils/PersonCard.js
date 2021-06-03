import {Link} from 'react-router-dom'

const PersonCard = ({person}) => {
    return (
        <div className='personCard'>
            <div className='personCard__image'>
                <Link to='#'>
                    <div className='personCard_overlay'></div>
                </Link>
                <img src={person.profileImg} alt={person.name} />
            </div>
        </div>
    )
}

export default PersonCard
