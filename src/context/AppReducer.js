export const initialState = {
    nowPlaying: []
}

const reducer = (state, action) => {
    console.log(action)

    switch (action.type) {
        case 'SET_NOW_PLAYING':
            return {
                ...state,
                nowPlaying: [...state.nowPlaying, action.payload]
            }
        default:
            return state
    }
}

export default reducer