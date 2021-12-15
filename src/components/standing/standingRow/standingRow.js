import React from "react";
import classes from "./standingRow.module.scss";
import { useHistory } from 'react-router-dom';

const StandingRow = props => {
  const history = useHistory();

  const teamLogo = props.club.team.crestUrl ? (
    <img
      className={classes.TeamLogo}
      src={props.club.team.crestUrl}
      onError={event => {
        event.target.style.display = "none";
      }
    }
      alt={props.club.team.name}
    />
  ) : null;
  const teamName = props.position
    ? `${props.club.position}. ${props.club.team.name}`
    : props.club.team.name;
  let order = null;

  const goToSchedule = id => {
    history.push(`/schedule/${props.league}/${id}`)
  }

  if (props.order) {
    let orderClasses = [classes.TeamOrder];
    if (!isNaN(props.order)) {
      if (props.order > 0) {
        orderClasses.push(classes.TeamOrderGrean);
      } else {
        orderClasses.push(classes.TeamOrderRed);
      }

      order = <span className={orderClasses.join(" ")}>( {props.order} )</span>;
    } else {
      order = <span className={orderClasses}>{props.order}</span>;
    }
  }

  return (
    <tr>
      <th scope="row" className={classes.TeamNowrap}>
        {props.position || props.club.position} {order}
      </th>
      <td className={classes.TeamNameCell}>
        <div className={classes.logoAndName}>
          {teamLogo} 
          <span className={classes.nameOverflow} onClick={() => goToSchedule(props.club.team.id)}>{teamName}</span>
        </div>
      </td>
      <td>{props.club.playedGames}</td>
      <td>{props.club.won}</td>
      <td>{props.club.draw}</td>
      <td>{props.club.lost}</td>
      <td>
        {props.club.goalsFor}:{props.club.goalsAgainst}(
        {props.club.goalDifference})
      </td>
      <td>{props.club.points}</td>
    </tr>
  );
};

export default StandingRow;
