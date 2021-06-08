import axios from 'axios'

const url = 'https://api.themoviedb.org/3'
const personUrl = `${url}/person`
const trendingPerson = `${url}/trending/person`
const popularPerson = `${url}/person/popular`

const backdropUrl = 'https://image.tmdb.org/t/p/original/'
const posterUrl = 'https://image.tmdb.org/t/p/w200/'


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

// not used
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
            poster: posterUrl + person.profile_path,
            popularity: person.popularity,
        }))

        return modifiedData

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
            biography: data.biography,
            deathday: data.deathday,
            poster: posterUrl + data.profile_path,
            homepage: data.homepage
        }

        return modifiedData

    } catch (error) { }
}