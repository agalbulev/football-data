import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { getMatches } from '../../actions/getMatches';

const Matches = (props) => {
    const match = useRouteMatch();
    const matches = useSelector(state => {
        return state.footbalData[`matches${match.params.league}`]
    });
    const dispatch = useDispatch();

    if (!matches) {
        dispatch(getMatches(match.params.league));
    }

    return (
        <div className='container'>
            <div>Work!!</div>
        </div>
    )
}

export default Matches;