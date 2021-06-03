import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {
    fetchMovieDetail
} from '../../service/index'

const Movie = () => {
    const [random, setRandom] = useState([])
    let {id} = useParams()

    useEffect(() => {
        const fetchApi = async () => {
            setRandom(await fetchMovieDetail(id))
        }

        fetchApi()
    }, [])

    console.log(random)

    return (
        <div className='container'>
            Movie: {id}
        </div>
    )
}

export default Movie
