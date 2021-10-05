import React, { Fragment } from 'react';
import { parse, format } from 'date-fns';
import { bg } from 'date-fns/locale';
import cx from 'classnames';
import classes from './matchesTable.module.scss';

const MatchesTable = ({ matches }) => {
    return (
        <table className='w-100 table'>
            <tbody>
                {
                    Object.keys(matches).map((key, index) => {
                        return (
                            <Fragment key={index}>
                                <tr>
                                    <td colSpan='3' className={classes.date}>{format(parse(key, 'MM/dd/yyyy', new Date()), 'EEEE dd.MM.yyyy', { locale: bg })}</td>
                                </tr>
                                {
                                    matches[key].map((match, index) => (
                                        <tr key={index}>
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
    )
}

export default MatchesTable
