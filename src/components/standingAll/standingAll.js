import React from 'react';
import { connect } from 'react-redux'
import StandingRow from '../standing/standingRow/standingRow'
import StandingTable from '../standing/standingTable/standingTable';

const StandingAll = (props) => {
    if (!props.bestEuropa) {
        return null;
    }

    const all = props.bestEuropa.map((team, index) => {
        return <StandingRow key={ index } position={ index + 1 } club={ team } />
    })

    return <StandingTable competitions={all}/>;
}

const mapStateToProps = (state) => {
    return {
        bestEuropa: state.footbalData.bestEuropa
    }
}

export default connect(mapStateToProps)(StandingAll)