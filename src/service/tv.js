import axios from 'axios'

const url = 'https://api.themoviedb.org/3'
const tvUrl = `${url}/tv`
const popularTv = `${url}/tv/popular`

const backdropUrl = 'https://image.tmdb.org/t/p/original/'
const posterUrl = 'https://image.tmdb.org/t/p/w200/'

export const fetchPopularTv = async () => {
    try {
        const {data} = await axios.get(popularTv, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                page: 1
            }
        })

        // console.log(data.results)

        const modifiedData = data.results.map((tv) => ({
            id: tv.id,
            title: tv.name,
            backdropPoster: backdropUrl + tv.backdrop_path,
            poster: posterUrl + tv.poster_path,
            rating: tv.vote_average,
            overview: tv.overview,
            originCountry: tv.origin_country,
            releaseDate: tv.first_air_date,
            genres: tv.genre_ids,
        }))

        return modifiedData

    } catch (e) { }
}

export const fetchTvDetail = async (id) => {
    try {
        const {data} = await axios.get(`${tvUrl}/${id}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                page: 1
            }
        })

        // console.log(data)

        const modifiedData = {
            id: data.id,
            title: data.name,
            backdropPoster: backdropUrl + data.backdrop_path,
            poster: posterUrl + data.poster_path,
            episodeRunTime: data.episode_run_time,
            firstAirDate: data.first_air_date,
            lastAirDate: data.last_air_date,
            numberOfSeasons: data.number_of_seasons,
            numberOfEpisodes: data.number_of_episodes,
            originCountry: data.origin_country,
            overview: data.overview,
            status: data.status,
            rating: data.vote_average,
            genres: data.genres,
            homepage: data.homepage,
            createdBy: data.created_by,
        }

        // console.log(modifiedData)
        return modifiedData

    } catch (e) { }
}

export const fetchTvVideo = async (id) => {
    try {
        const {data} = await axios.get(`${tvUrl}/${id}/videos`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            }
        })

        // console.log(data.results[0])

        return data.results[0]

    } catch (e) {}
}


export const fetchTvCrew = async (id) => {
    try {
        const {data} = await axios.get(`${tvUrl}/${id}/credits`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            }
        })

        const modifiedData = data.crew.map((crew) => ({
            id: crew.id,
            name: crew.name,
            poster: posterUrl + crew.profile_path,
            department: crew.department,
            job: crew.job,
            creditId: crew.credit_id,
            profilePath: crew.profile_path,
        }))

        return modifiedData


    } catch (e) {}
}

export const fetchTvCast = async (id) => {
    try {
        const {data} = await axios.get(`${tvUrl}/${id}/credits`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            }
        })

        const modifiedData = data.cast.map((cast) => ({
            id: cast.id,
            name: cast.name,
            poster: posterUrl + cast.profile_path,
            character: cast.character,
            creditId: cast.credit_id,
            profilePath: cast.profile_path,
        }))

        return modifiedData


    } catch (e) {}
}


export const fetchSimilarMovies = async (id) => {
    try {
        const {data} = await axios.get(`${url}/tv/${id}//similar`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                page: 1
            }
        })

        const modifiedData = data.results.map((tv) => ({
            id: tv.id,
            title: tv.name,
            backdropPoster: backdropUrl + tv.backdrop_path,
            poster: posterUrl + tv.poster_path,
            overview: tv.overview,
            popularity: tv.popularity,
            rating: tv.vote_average,
            releaseDate: tv.first_air_date,
            genres: tv.genre_ids,
            originCountry: tv.origin_country,
        }))

        return modifiedData

    } catch (e) { }
}

export const fetchRecommendedTvs = async (id) => {
    try {
        const {data} = await axios.get(`${url}/tv/${id}/recommendations`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                page: 1
            }
        })

        const modifiedData = data.results.map((tv) => ({
            id: tv.id,
            title: tv.name,
            backdropPoster: backdropUrl + tv.backdrop_path,
            poster: posterUrl + tv.poster_path,
            overview: tv.overview,
            popularity: tv.popularity,
            rating: tv.vote_average,
            releaseDate: tv.first_air_date,
            genres: tv.genre_ids,
            originCountry: tv.origin_country,
        }))

        return modifiedData

    } catch (e) { }
}