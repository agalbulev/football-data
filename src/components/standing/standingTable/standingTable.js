import React from 'react';
import StandingHeader from '../standingHeader/standingHeader';
import classes from './standingTable.module.scss';

const StandingTable = (props) => {
    return (
        <table className={['table', classes.table].join(' ')}>
            <StandingHeader />
            <tbody>
                {props.competitions}
            </tbody>
        </table>
    )
}

export default StandingTable;