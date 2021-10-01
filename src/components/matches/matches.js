import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { getMatches } from '../../actions/getMatches';
import MatchDaySelector from './matchDaySelector/matchDaySelector';
import classes from './matches.module.scss';
import cx from 'classnames';
import { parse, format } from 'date-fns';
import { bg } from 'date-fns/locale';

const Matches = (props) => {
    const [matches, setMatches] = useState([]);
    const [selectedMatchday, setSelectedMatchday] = useState(0);
    const match = useRouteMatch();
    const allMatches = useSelector(state => {
        return state.footbalData[`matches${match.params.league}`]
    });
    const currentMatchday = useSelector(state => state.footbalData[`currentMatchday${match.params.league}`])
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
                    <table className='w-100 table'>
                        <tbody>
                            {
                                Object.keys(matches).map((key, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <tr>
                                                <td colspan='3' className={classes.date}>{format(parse(key, 'MM/dd/yyyy', new Date()), 'EEEE dd.MM.yyyy', { locale: bg })}</td>
                                            </tr>
                                            {
                                                matches[key].map(match => (
                                                    <tr>
                                                        <td className={cx(classes.team, { [classes.bold]: match.score.winner === 'HOME_TEAM' })}>{match.homeTeam.name}</td>
                                                        <td className={`${classes.result} text-center`}>
                                                            {
                                                                match.status !== 'SCHEDULED' ?
                                                                    <Fragment>
                                                                        <span>{match.score.fullTime.homeTeam}:{match.score.fullTime.awayTeam}</span>
                                                                        <span className={classes.halfTime}>({match.score.halfTime.homeTeam}:{match.score.halfTime.awayTeam})</span>
                                                                    </Fragment> :
                                                                    <span>{format(new Date(match.utcDate), 'H:mm')} ч.</span>
                                                            }

                                                        </td>
                                                        <td className={cx(classes.team, 'text-right', { [classes.bold]: match.score.winner === 'AWAY_TEAM' })}>{match.awayTeam.name}</td>
                                                    </tr>
                                                ))
                                            }
                                        </Fragment>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </Fragment>
    )
}

export default Matches;