import React from 'react';
import StandingHeader from '../standingHeader/standingHeader';

const StandingTable = (props) => {
    return (
        <div className='container'>
            <table className='table'>
                <StandingHeader />
                <tbody>
                    {props.competitions}
                </tbody>
            </table>
         </div>
    )
}

export default StandingTable;