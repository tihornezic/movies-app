import Heading from '../utils//Heading'
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/scss/alice-carousel.scss"
import unknown from '../../img/unknown3.png'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {
    fetchTrendingPerson,
    fetchPopularPerson
} from '../../service/index'

const TrendingPersons = () => {
    const [trendingPersons, setTrendingPersons] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            setTrendingPersons(await fetchTrendingPerson())
        }

        fetchApi()
    }, [])

    // trendingPersons.map((item) => {
    //     console.log(item)
    // })

    const responsive = {
        0: {items: 1},
        568: {items: 2},
        1024: {items: 6},
    };

    const trendingPersonsAlice = trendingPersons.sort(() => 0.5 - Math.random()).map((person) => (
        <div className='personCardAlice'>
            <div className='image'>
                {person.profilePath === null ?
                    <img src={unknown} alt='unknown' /> :
                    <img src={person.profileImg} alt={person.name} />
                }
                <Link to='#'>
                    <div className='overlay'></div>
                </Link>
            </div>
            <p>{person.name}</p>
            <small>Category: {person.knownFor}</small>
        </div>
    ))

    return (
        <div className='trendingPersons'>
            {/* <h3 className='heading'>Trending Actors & Directors</h3> */}
            <Heading text={'Trending Actors & Directors'} />
            <AliceCarousel
                mouseTracking
                responsive={responsive}
                items={trendingPersonsAlice}
                animationType='fadeout'
                touchMoveDefaultEvents={false}
                disableButtonsControls={true}
            />
        </div>
    )
}

export default TrendingPersons
