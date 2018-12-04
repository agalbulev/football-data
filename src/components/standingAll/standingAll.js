import React from 'react';
import { connect } from 'react-redux'
import StandingRow from '../standing/standingRow/standingRow'
import StandingTable from '../standing/standingTable/standingTable';
import { orderBy, slice } from 'lodash';

const StandingAll = (props) => {
    if (!props.competitions) {
        return null;
    }
    let all = [];

    Object.keys(props.competitions).forEach(com => {
        all = [...all, ...props.competitions[com].standings];
    })

    all = slice(orderBy(all, ['won', 'points', 'playedGames'], ['desc', 'desc', 'desc']), 0, 20);

    all = all.map((team, index) => {
        return <StandingRow key={ index } position={ index + 1 } club={ team } />
    })

    return <StandingTable competitions={all}/>;
}

const mapStateToProps = (state) => {
    return {
        competitions: state.footbalData.competitions
    }
}

export default connect(mapStateToProps)(StandingAll)