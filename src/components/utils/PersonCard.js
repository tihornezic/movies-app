import {Link} from 'react-router-dom'
import unknown from '../../img/unknown3.png'

const PersonCard = ({person, type, knownFor, page}) => {
    return (

        <div className='personCard'>
            <div className='image'>
                {knownFor === 'Directing' ?
                    <Link to={`/crew/${person.id}`}>
                        <div className='overlay'></div>
                    </Link>
                    :
                    <Link to={`/actor/${person.id}`}>
                        <div className='overlay'></div>
                    </Link>
                }

                {person.profilePath === null ?
                    <img src={unknown} alt='unknown' />
                    :
                    <img src={person.poster} alt={person.name} />
                }
            </div>
            {page === 'actors' || page === 'directors' ?
                <p className={page === 'actors' || page === 'directors' ? 'name bold' : 'name'}>{person.name}</p>
                :
                type === 'movie' || type === 'tv' ?
                    <>
                        <p className='name'>{person.name}</p>
                        <p className='character'>{person.character}</p>
                    </>
                    :
                    <>
                        <p className='name'>{person.name}</p>
                        <small>Category: {person.knownFor}</small>
                    </>

            }
        </div>
    )
}

export default PersonCard
