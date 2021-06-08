import axios from 'axios'

const url = 'https://api.themoviedb.org/3'
const movieUrl = `${url}/movie`;
const nowPlayingMovies = `${url}/movie/now_playing`
const topRatedMovies = `${url}/movie/top_rated`
const trendingPerson = `${url}/trending/person`
const popularPerson = `${url}/person/popular`
const popularTv = `${url}/tv/popular`


const backdropUrl = 'https://image.tmdb.org/t/p/original/'
const posterUrl = 'https://image.tmdb.org/t/p/w200/'


const genreUrl = `${url}/genre/movie/list`
const video = `https://api.themoviedb.org/3/movie/578701/videos`
const youtubeUrl = "https://www.youtube.com/watch?v=";


export const fetchTrendingPerson = async () => {
    try {
        const {data} = await axios.get(`${trendingPerson}/day`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            }
        })

        console.log(data.results)

        const modifiedData = data.results.map((person) => ({
            id: person.id,
            name: person.name,
            knownFor: person.known_for_department,
            profileImg: posterUrl + person.profile_path,
            profilePath: person.profile_path,
            popularity: person.popularity,
        }))

        return modifiedData

    } catch (e) { }
}

export const fetchPopularPerson = async () => {
    try {
        const {data} = await axios.get(`${popularPerson}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            }
        })

        console.log(data.results)

        const modifiedData = data.results.map((person) => ({
            id: person.id,
            name: person.name,
            knownFor: person.known_for_department,
            profileImg: posterUrl + person.profile_path,
            popularity: person.popularity,
        }))

        return modifiedData

    } catch (e) { }
}

export const fetchAllGenres = async () => {
    try {
        const {data} = await axios.get(genreUrl, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                page: 1
            }
        })

        console.log(data.genres)

        // const modifiedData = data.genres.map((item) => ({
        //     [item['id']]: item['name']
        // }))

        return data.genres

    } catch {

    }

}