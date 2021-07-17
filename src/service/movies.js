import axios from 'axios'

const url = 'https://api.themoviedb.org/3'
const movieUrl = `${url}/movie`;
const nowPlayingMovies = `${url}/movie/now_playing`
const topRatedMovies = `${url}/movie/top_rated`
const discoverMovies = `${url}/discover/movie`

const backdropUrl = 'https://image.tmdb.org/t/p/original/'
const posterUrl = 'https://image.tmdb.org/t/p/w200/'


export const fetchNowPlayingMovies = async (page) => {
    try {
        const {data} = await axios.get(nowPlayingMovies, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                // page: 1
                page: page
            }
        })

        const modifiedData = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            backdropPoster: backdropUrl + movie.backdrop_path,
            poster: posterUrl + movie.poster_path,
            posterPath: movie.poster_path,
            overview: movie.overview,
            popularity: movie.popularity,
            rating: movie.vote_average,
            releaseDate: movie.release_date,
            genres: movie.genre_ids,
        }))

        return modifiedData

    } catch (e) { }
}

export const fetchNowPlayingMoviesPagesNumber = async (genres) => {
    try {
        const {data} = await axios.get(nowPlayingMovies, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                sort_by: 'popularity.desc',
                with_genres: genres,
            }
        })

        const pagesNumber = data.total_pages

        return pagesNumber

    } catch (e) { }
}

export const fetchMovieDetail = async (id) => {
    try {
        const {data} = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US'
            }
        })

        // console.log(data)

        const modifiedData = {
            id: data.id,
            title: data.title,
            tagline: data.tagline,
            backdropPoster: backdropUrl + data.backdrop_path,
            poster: posterUrl + data.poster_path,
            posterPath: data.poster_path,
            overview: data.overview,
            rating: data.vote_average,
            releaseDate: data.release_date,
            genres: data.genres,
            homepage: data.homepage,
            runtime: data.runtime,
        }

        return modifiedData

    } catch (error) { 
        return false
    }
}

export const fetchMovieVideo = async (id) => {
    try {
        const {data} = await axios.get(`${movieUrl}/${id}/videos`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            }
        })

        // console.log(data.results[0])

        return data.results[0]

    } catch (e) { }
}

// not used 
export const fetchTopRatedMovies = async () => {
    try {
        const {data} = await axios.get(topRatedMovies, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                page: 1
            }
        })

        const modifiedData = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            backdropPoster: backdropUrl + movie.backdrop_path,
            poster: posterUrl + movie.poster_path,
            posterPath: movie.poster_path,
            overview: movie.overview,
            popularity: movie.popularity,
            rating: movie.vote_average,
            releaseDate: movie.release_date,
            genres: movie.genre_ids,
            videoPath: `${movieUrl}/${movie.id}/videos`,
        }))

        return modifiedData

    } catch (e) { }
}

export const fetchMovieCrew = async (id) => {
    try {
        const {data} = await axios.get(`${movieUrl}/${id}/credits`, {
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


    } catch (e) { }
}

export const fetchMovieCast = async (id) => {
    try {
        const {data} = await axios.get(`${movieUrl}/${id}/credits`, {
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


    } catch (e) { }
}

export const fetchSimilarMovies = async (id) => {
    try {
        const {data} = await axios.get(`${url}/movie/${id}/similar`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                page: 1
            }
        })

        const modifiedData = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            backdropPoster: backdropUrl + movie.backdrop_path,
            poster: posterUrl + movie.poster_path,
            posterPath: movie.poster_path,
            overview: movie.overview,
            popularity: movie.popularity,
            rating: movie.vote_average,
            releaseDate: movie.release_date,
            genres: movie.genre_ids,
        }))

        return modifiedData

    } catch (e) { }
}

export const fetchRecommendedMovies = async (id) => {
    try {
        const {data} = await axios.get(`${url}/movie/${id}/recommendations`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                page: 1
            }
        })

        const modifiedData = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            backdropPoster: backdropUrl + movie.backdrop_path,
            poster: posterUrl + movie.poster_path,
            posterPath: movie.poster_path,
            overview: movie.overview,
            popularity: movie.popularity,
            rating: movie.vote_average,
            releaseDate: movie.release_date,
            genres: movie.genre_ids,
        }))

        return modifiedData

    } catch (e) { }
}

export const fetchDiscoverMovies = async (page, genres) => {
    try {
        const {data} = await axios.get(discoverMovies, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                sort_by: 'popularity.desc',
                with_genres: genres,
                page: page
            }
        })

        const modifiedData = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            backdropPoster: backdropUrl + movie.backdrop_path,
            poster: posterUrl + movie.poster_path,
            posterPath: movie.poster_path,
            overview: movie.overview,
            popularity: movie.popularity,
            rating: movie.vote_average,
            releaseDate: movie.release_date,
            genres: movie.genre_ids,
        }))

        // console.log(modifiedData)

        return modifiedData

    } catch (e) { }
}

export const fetchDiscoverMoviesPagesNumber = async (genres) => {
    try {
        const {data} = await axios.get(discoverMovies, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                sort_by: 'popularity.desc',
                with_genres: genres,
            }
        })

        const pagesNumber = data.total_pages

        return pagesNumber

    } catch (e) { }
}

export const fetchDiscoverTopRatedMovies = async (page) => {
    try {
        const {data} = await axios.get(`${discoverMovies}?vote_count.gte=7000`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                // line below won't work, so I used template literals in the .get() above
                // vote_count.gte: 7000, 
                sort_by: 'vote_average.desc',
                with_original_language: 'en',
                page: page
            }
        })

        // console.log(data.total_pages)
        // console.log(data.total_results)

        const modifiedData = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            backdropPoster: backdropUrl + movie.backdrop_path,
            poster: posterUrl + movie.poster_path,
            posterPath: movie.poster_path,
            overview: movie.overview,
            popularity: movie.popularity,
            rating: movie.vote_average,
            releaseDate: movie.release_date,
            genres: movie.genre_ids,
        }))

        return modifiedData

    } catch (e) { }
}

export const fetchDiscoverTopRatedMoviesPagesNumber = async () => {
    try {
        const {data} = await axios.get(`${discoverMovies}?vote_count.gte=7000`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
                sort_by: 'vote_average.desc',
                with_original_language: 'en',
                // page: page
            }
        })

        const pagesNumber = data.total_pages

        return pagesNumber

    } catch (e) { }
}

export const fetchMovieGenres = async () => {
    try {
        const {data} = await axios.get(`${url}/genre/movie/list`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US',
            }
        })

        // console.log(data.genres)

        return data.genres

    } catch (e) { }
}