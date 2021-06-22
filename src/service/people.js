import axios from 'axios'

const url = 'https://api.themoviedb.org/3'
const personUrl = `${url}/person`
const trendingPerson = `${url}/trending/person`
const popularPerson = `${url}/person/popular`

const backdropUrl = 'https://image.tmdb.org/t/p/original/'
const posterUrl = 'https://image.tmdb.org/t/p/w200'
const profileImage = 'https://image.tmdb.org/t/p/w300'

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
            poster: posterUrl + person.profile_path,
            profilePath: person.profile_path,
            popularity: person.popularity,
        }))

        return modifiedData

    } catch (e) { }
}

export const fetchPopularPerson = async (page) => {
    try {
        const {data} = await axios.get(`${popularPerson}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                page: page
            }
        })

        // console.log(data.results)

        const modifiedData = data.results.map((person) => ({
            id: person.id,
            name: person.name,
            knownFor: person.known_for_department,
            poster: posterUrl + person.profile_path,
            profilePath: person.profile_path,
            popularity: person.popularity,
        }))

        return modifiedData

    } catch (e) { }
}

export const fetchPopularPersonTotalResults = async () => {
    try {
        const {data} = await axios.get(`${popularPerson}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            }
        })

        const totalResults = data.total_results

        return totalResults

    } catch (e) { }
}

export const fetchPersonDetail = async (id) => {
    try {
        const {data} = await axios.get(`${personUrl}/${id}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US'
            }
        })

        // console.log(data)

        const modifiedData = {
            id: data.id,
            name: data.name,
            placeOfBirth: data.place_of_birth,
            birthday: data.birthday,
            biography: data.biography,
            deathday: data.deathday,
            poster: profileImage + data.profile_path,
            homepage: data.homepage,
            knownFor: data.known_for_department,
            profilePath: data.profile_path,
            gender: data.gender,
        }

        return modifiedData

    } catch (error) { }
}

export const fetchPersonMovieCreditsCast = async (id) => {
    try {
        const {data} = await axios.get(`${personUrl}/${id}/movie_credits`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US'
            }
        })

        const modifiedData = data.cast.map((media) => ({
            id: media.id,
            title: media.title,
            // name: media.name,
            poster: posterUrl + media.poster_path,
            genres: media.genre_ids,
            rating: media.vote_average,
            releaseDate: media.release_date,
            // mediaType: media.media_type,
            popularity: media.popularity,
            posterPath: media.poster_path,
            character: media.character,
            // originCountry: media.origin_country,
        }))

        return modifiedData

    } catch (error) { }
}

export const fetchPersonTvCreditsCast = async (id) => {
    try {
        const {data} = await axios.get(`${personUrl}/${id}/tv_credits`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US'
            }
        })

        const modifiedData = data.cast.map((media) => ({
            id: media.id,
            title: media.title,
            name: media.name,
            poster: posterUrl + media.poster_path,
            genres: media.genre_ids,
            rating: media.vote_average,
            releaseDate: media.first_air_date,
            // mediaType: media.media_type,
            popularity: media.popularity,
            posterPath: media.poster_path,
            character: media.character,
            originCountry: media.origin_country,
        }))

        return modifiedData

    } catch (error) { }
}

export const fetchPersonExternalIds = async (id) => {
    try {
        const {data} = await axios.get(`${personUrl}/${id}/external_ids`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US'
            }
        })

        // console.log(data)

        const modifiedData = {
            id: data.id,
            facebookId: data.facebook_id,
            instagramId: data.instagram_id,
            twitterId: data.twitter_id
        }

        return modifiedData

    } catch (error) { }
}

export const fetchPersonMovieCreditsCrew = async (id) => {
    try {
        const {data} = await axios.get(`${personUrl}/${id}/movie_credits`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US'
            }
        })

        const modifiedData = data.crew.map((media) => ({
            id: media.id,
            title: media.title,
            // name: media.name,
            releaseDate: media.release_date,
            poster: posterUrl + media.poster_path,
            genres: media.genre_ids,
            rating: media.vote_average,
            popularity: media.popularity,
            posterPath: media.poster_path,
            job: media.job
        }))

        return modifiedData

    } catch (error) { }
}

export const fetchPersonTvCreditsCrew = async (id) => {
    try {
        const {data} = await axios.get(`${personUrl}/${id}/tv_credits`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en_US'
            }
        })

        const modifiedData = data.crew.map((media) => ({
            id: media.id,
            title: media.title,
            name: media.name,
            poster: posterUrl + media.poster_path,
            genres: media.genre_ids,
            rating: media.vote_average,
            releaseDate: media.first_air_date,
            // mediaType: media.media_type,
            popularity: media.popularity,
            posterPath: media.poster_path,
            character: media.character,
            originCountry: media.origin_country,
            job: media.job
        }))

        return modifiedData

    } catch (error) { }
}