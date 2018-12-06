const footballData = (state = { competitions: null }, action) => {
    switch (action.type) {
        case 'GET_DATA_SUCCESS':
            return Object.assign({}, state, {
                competitions: {
                    ...action.payload
                }
            })
        case 'SET_BEST_EUROPA':
            return Object.assign({}, state, {
                bestEuropa: [
                    ...action.payload
                ]
            })
        default:
            return state;
    }
}

export default footballData;