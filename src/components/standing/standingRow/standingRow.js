import React from 'react';
import classes from './standingRow.module.scss'

const StandingRow = (props) => {
    const teamLogo = props.club.team.crestUrl ? <img className={classes.TeamLogo} src= {props.club.team.crestUrl }  alt={ props.club.team.name } /> : null;

    return (
        <tr>
            <th scope='row'>{ props.club.position }</th>
            <td>
                { teamLogo }
                { props.club.team.name }
            </td>
            <td>{ props.club.playedGames }</td>
            <td>{ props.club.won }</td>
            <td>{ props.club.draw }</td>
            <td>{ props.club.lost }</td>
            <td>{ props.club.goalsFor }:{ props.club.goalsAgainst }({ props.club.goalDifference })</td>
            <td>{ props.club.points }</td>
        </tr>
    )
}

export default StandingRow;