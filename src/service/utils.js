import axios from 'axios'

const url = 'https://api.themoviedb.org/3'

export const fetchMultiSearch = async (query) => {
    try {
        const {data} = await axios.get(`${url}/search/multi`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                query: query
            }
        })

        // console.log(data.results)
        return data.results


    } catch (e) { }
}

// `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`