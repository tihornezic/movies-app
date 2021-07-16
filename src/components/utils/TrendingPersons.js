import Heading from '../utils//Heading'
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/scss/alice-carousel.scss"
import unknown from '../../img/unknown3.png'
import PersonCard from '../utils/PersonCard'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {
    fetchTrendingPerson,
    fetchPopularPerson
} from '../../service/people'

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
        0: {items: 2},
        615: {items: 3},
        1015: {items: 4},
        1140: {items: 5},
        // 1140: {items: 4},
        1333: {items: 6},
        // 1920: {items: 6}
    };

    const trendingPersonsAlice = trendingPersons.sort(() => 0.5 - Math.random()).map((person, index) => (
        <div className='personCardAlice'>
            <PersonCard key={index} person={person} type='trending' knownFor={person.knownFor} />
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
                disableButtonsControls={false}
            />
        </div>
    )
}

export default TrendingPersons
