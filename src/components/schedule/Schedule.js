import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getMatches } from '../../actions/getMatches';
import { format } from 'date-fns';
import MatchesTable from '../matches/matchesTable/MatchesTable';

const Schedule = () => {
    const match = useRouteMatch();
    const league = match.params.league;
    const team = parseInt(match.params.team);
    const dispatch = useDispatch();
    const [schedule, setSchedule] = useState();

    const allMatches = useSelector(state => {
        return state.footbalData[`matches${league}`]
    });

    if (!allMatches) {
        dispatch(getMatches(match.params.league));
    }

    useEffect(() => {
        const teamMatches = [];
        if (allMatches && allMatches.length !== 0) {
            allMatches.forEach(round => {
                round.forEach(match => {
                    if (match.homeTeam.id === team || match.awayTeam.id === team) {
                        teamMatches.push(match);
                    }
                })
            })

            const matchesByDate = {};

            if (teamMatches.length !== 0) {
                teamMatches.forEach(match => {
                    const key = format(new Date(match.utcDate), 'MM/dd/yyyy');
    
                    matchesByDate[key] = [match];
                })
            }
    
            setSchedule(matchesByDate);
        }
    }, [setSchedule, allMatches, team])

    return (
        <div>
            {
                schedule &&
                <MatchesTable matches={schedule} focus={true} />
            }
        </div>
    )
}

export default Schedule;
