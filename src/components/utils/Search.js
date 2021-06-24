import SearchIcon from '@material-ui/icons/Search';
import ResultCard from './ResultCard'
import {useState, useEffect} from 'react'
import {
    fetchMultiSearch,
} from '../../service/utils'

const Search = () => {
    const [active, setActive] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const onChange = (e) => {
        e.preventDefault()

        setQuery(e.target.value)

        const fetchApi = async () => {
            setResults(await fetchMultiSearch(e.target.value))
        }

        fetchApi()
    }

    // console.log(results)

    return (
        <div className='search'>
            <input type='text' placeholder='Search...' onFocus={() => setActive(true)} onBlur={() => setActive(false)}
                onChange={onChange} value={query} />
            <SearchIcon className={active ? 'active' : ''} />

            {results?.length > 0 && (
                <div className='results'>
                    {results.slice(0, 10).map(result => (
                        <ResultCard result={result} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Search
