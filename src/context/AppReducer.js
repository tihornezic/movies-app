export const initialState = {
    watchlistArray: [],
    watchedlistArray: []
}

const reducer = (state, action) => {
    // console.log(action)

    switch (action.type) {
        // watchlist
        case 'ADD_MEDIA_TO_WATCHLIST_ARRAY':
            return {
                ...state,
                watchlistArray: [...state.watchlistArray, action.payload]
            }

        case 'ANNUL_WATCHLIST_ARRAY':
            return {
                ...state,
                watchlistArray: []
            }

        case 'REMOVE_WATCHLIST_MEDIA':

            let newWatchlistArray = [...state.watchlistArray]

            const index = state.watchlistArray.findIndex((watchlistItem) => watchlistItem.id === action.payload.id)

            // item exists in watchlistArray
            if (index >= 0) {
                newWatchlistArray.splice(index, 1)
            } else {
                console.warn(
                    `Can't remove watchlist item id: ${action.payload.id} as its not in the watchlistArray`
                )
            }

            return {...state, watchlistArray: newWatchlistArray}


        // 
        // watchedlist
        case 'ADD_MEDIA_TO_WATCHEDLIST_ARRAY':
            return {
                ...state,
                watchedlistArray: [...state.watchedlistArray, action.payload]
            }

        case 'ANNUL_WATCHEDLIST_ARRAY':
            return {
                ...state,
                watchedlistArray: []
            }

        case 'REMOVE_WATCHEDLIST_MEDIA':

            let newWatchedlistArray = [...state.watchedlistArray]

            const index_ = state.watchedlistArray.findIndex((watchedlistItem) => watchedlistItem.id === action.payload.id)

            // item exists in watchedlistArray
            if (index_ >= 0) {
                newWatchedlistArray.splice(index_, 1)
            } else {
                console.warn(
                    `Can't remove watchedlist item id: ${action.payload.id} as its not in the watchlistArray`
                )
            }

            return {...state, watchedlistArray: newWatchedlistArray}

        default:
            return state
    }
}

export default reducer