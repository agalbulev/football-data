import React from 'react';
import { connect } from 'react-redux'
import StandingRow from '../standing/standingRow/standingRow'
import StandingTable from '../standing/standingTable/standingTable';

const StandingAll = (props) => {
    if (!props.bestEuropa || !props.order) {
        return null;
    }

    const all = props.bestEuropa.map((team, index) => {
        const teamOrder = props.order.find(o => {
            return o.id === team.team.id
        }).orderChange;

        return <StandingRow key={ index } position={ index + 1 } club={ team } order={ teamOrder } />
    })

    return <StandingTable competitions={all}/>;
}

const mapStateToProps = (state) => {
    return {
        bestEuropa: state.footbalData.bestEuropa,
        order: state.footbalData.order
    }
}

export default connect(mapStateToProps)(StandingAll)