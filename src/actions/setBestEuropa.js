import { orderBy, slice } from 'lodash';

export const setBestEuropa = (competitions) => {
    return dispatch => {
        let all = [];

        Object.keys(competitions).forEach(com => {
            all = [...all, ...competitions[com].standings];
        })
    
        all = slice(orderBy(all, ['won', 'points', 'playedGames'], ['desc', 'desc', 'asc']), 0, 20);

        dispatch(setBestEuropaAction(all));
    }
}

const setBestEuropaAction = competitions => ({
    type: "SET_BEST_EUROPA",
    payload: [
        ...competitions
    ]
})