import PersonCard from './PersonCard'
import {useState, useEffect} from 'react'
import {
    fetchTrendingPerson
} from '../service/index'

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

    return (
        <div className='trendingPersons'>
            <h3>Trending Actors & Directors</h3>
            <div className='trendingPersons__grid'>
                {trendingPersons.map((person) => (
                    <PersonCard key={person.id} person={person} />
                ))}
            </div>
        </div>
    )
}

export default TrendingPersons
