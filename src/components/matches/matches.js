import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { getMatches } from '../../actions/getMatches';
import MatchDaySelector from './matchDaySelector/matchDaySelector';
import { format } from 'date-fns';
import MatchesTable from './matchesTable/MatchesTable';

const Matches = (props) => {
    const [matches, setMatches] = useState([]);
    const [selectedMatchday, setSelectedMatchday] = useState(0);
    const match = useRouteMatch();
    const allMatches = useSelector(state => {
        return state.footbalData[`matches${match.params.league}`]
    });
    const currentMatchday = useSelector(state => state.footbalData[`currentMatchday${match.params.league}`]);
    const dispatch = useDispatch();

    if (!allMatches) {
        dispatch(getMatches(match.params.league));
    }

    useEffect(() => {
        if (currentMatchday) {
            setSelectedMatchday(currentMatchday);
        }
    }, [setSelectedMatchday, currentMatchday])

    useEffect(() => {
        if (allMatches && selectedMatchday) {
            let sort = {};
            let m = allMatches[selectedMatchday - 1];

            m.forEach(match => {
                const key = format(new Date(match.utcDate), 'MM/dd/yyyy');

                if (sort[key]) {
                    sort[key].push(match);
                } else {
                    sort[key] = [match];
                }
            })

            setMatches(sort);
        }
    }, [allMatches, selectedMatchday, setMatches])

    const selectMatchday = matchday => {
        setSelectedMatchday(matchday);
    }

    return (
        <Fragment>
            <div className='pl-3 pt-4'>
                <MatchDaySelector count={allMatches?.length} current={currentMatchday} onChange={selectMatchday} />
            </div>
            <div className='pt-4'>
                {
                    matches &&
                    <MatchesTable matches={matches} />
                }
            </div>
        </Fragment>
    )
}

export default Matches;