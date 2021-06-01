import axios from 'axios'
const url = 'https://api.themoviedb.org/3'
const movieUrl = `${url}/movie`;
const trendingPerson = `${url}/trending/person`
const popularPerson = `${url}/person/popular`



const genreUrl = `${url}/genre/movie/list`
const video = `https://api.themoviedb.org/3/movie/578701/videos`
const nowPlayingUrl = `${url}/movie/now_playing`
const youtubeUrl = "https://www.youtube.com/watch?v=";



export const fetchNowPlaying = async () => {
    try {
        const {data} = await axios.get(nowPlayingUrl, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                page: 1
            }
        })

        const backdropUrl = 'https://image.tmdb.org/t/p/original/'
        const posterUrl = 'https://image.tmdb.org/t/p/w200/'
        const modifiedData = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            backdropPoster: backdropUrl + movie.backdrop_path,
            poster: posterUrl + movie.poster_path,
            overview: movie.overview,
            popularity: movie.popularity,
            rating: movie.vote_average,
            // youtubeVideo: getVideoData(movie.id),
            releaseDate: movie.release_date,
            genres: movie.genre_ids,
            videoPath: `${movieUrl}/${movie.id}/videos`,
        }))

        console.log(modifiedData)
        return modifiedData

    } catch (e) { }
}


export const fetchTrendingPerson = async () => {
    try {
        const {data} = await axios.get(`${trendingPerson}/day`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            }
        })

        console.log(data.results)

        const imageUrl = 'https://image.tmdb.org/t/p/w200/'
        const modifiedData = data.results.map((person) => ({
            id: person.id,
            name: person.name,
            knownFor: person.known_for_department,
            profileImg: imageUrl + person.profile_path,
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

        const imageUrl = 'https://image.tmdb.org/t/p/w200/'
        const modifiedData = data.results.map((person) => ({
            id: person.id,
            name: person.name,
            knownFor: person.known_for_department,
            profileImg: imageUrl + person.profile_path,
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

export const fetchMovieDetail = async (id) => {
    try {
        const {data} = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US'
            }
        })

        return data

    } catch (error) { }
}