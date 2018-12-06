import React from 'react';
import StandingHeader from '../standingHeader/standingHeader';
import classes from './standingTable.module.scss';

const StandingTable = (props) => {
    return (
        <div className='container'>
            <table className={['table', classes.table].join(' ')}>
                <StandingHeader />
                <tbody>
                    {props.competitions}
                </tbody>
            </table>
         </div>
    )
}

export default StandingTable;