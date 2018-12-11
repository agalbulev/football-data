import { orderBy, slice, isEqual } from 'lodash';

export const setBestEuropa = (competitions) => {
    return dispatch => {
        let all = [];
        let storedTeamOrder = JSON.parse(localStorage.getItem('storedTeamOrder'));
        let oldStoredTeamOrder = JSON.parse(localStorage.getItem('oldStoredTeamOrder'));

        Object.keys(competitions).forEach(com => {
            all = [...all, ...competitions[com].standings];
        })
    
        all = slice(orderBy(all, ['won', 'points', 'playedGames'], ['desc', 'desc', 'asc']), 0, 20);

        const storeOrder = all.map(team => {
            return team.team.id;
        })

        if (storedTeamOrder) {
            if (!isEqual(storeOrder, storedTeamOrder)) {
                localStorage.setItem('oldStoredTeamOrder', JSON.stringify(storedTeamOrder));
                localStorage.setItem('storedTeamOrder', JSON.stringify(storeOrder));
                oldStoredTeamOrder = storedTeamOrder;
                storedTeamOrder = storeOrder;
            }
        } else {
            localStorage.setItem('storedTeamOrder', JSON.stringify(storeOrder));
            localStorage.setItem('oldStoredTeamOrder', JSON.stringify(storeOrder));
            oldStoredTeamOrder = storeOrder;
            storedTeamOrder = storeOrder;
        }

        const orderChanges = storeOrder.map((sOrder, index) => {
            const oChange = oldStoredTeamOrder.indexOf(sOrder) !== -1 ? (index - oldStoredTeamOrder.indexOf(sOrder)) * -1 : 'new';

            return {
                id: sOrder,
                orderChange: oChange
            }
        })

        dispatch(setBestEuropaAction(all));
        dispatch(setTeamOrder(orderChanges))
    }
}

const setBestEuropaAction = competitions => ({
    type: "SET_BEST_EUROPA",
    payload: [
        ...competitions
    ]
})

const setTeamOrder = order => ({
    type: "SET_TEAM_ORDER",
    payload: [
        ...order
    ]
})