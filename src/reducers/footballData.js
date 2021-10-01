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
        case 'SET_TEAM_ORDER':
            return Object.assign({}, state, {
                order: [
                    ...action.payload
                ]
            })
        case "SET_MATCHES":
            return {
                ...state,
                [`matches${action.matches.competition}`] : action.matches.matchDays
            }
        case 'SET_CURRENT_MATCHDAY':
            return {
                ...state,
                [`currentMatchday${action.current.competition}`] : action.current.number
            }
        default:
            return state;
    }
}

export default footballData;