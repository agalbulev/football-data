const footballData = (state = { competitions: null }, action) => {
    switch (action.type) {
        case 'GET_DATA_SUCCESS':
            return Object.assign({}, state, {
                competitions: {
                    ...action.payload
                }
            })
        default:
            return state;
    }
}

export default footballData;