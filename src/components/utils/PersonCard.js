import unknown from '../../img/unknown3.png'

const PersonCard = ({person, type, knownFor}) => {
    return (

        <div className='personCard'>
            <div className='image'>
                {knownFor === 'Directing' ?
                    <a href={`/crew/${person.id}`}>
                        <div className='overlay'></div>
                    </a>
                    :
                    <a href={`/actor/${person.id}`}>
                        <div className='overlay'></div>
                    </a>
                }

                {person.profilePath === null ?
                    <img src={unknown} alt='unknown' />
                    :
                    <img src={person.poster} alt={person.name} />
                }
            </div>
            {type === 'movie' || type === 'tv' ?
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
