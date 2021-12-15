import React, { Component } from 'react';
import { connect } from 'react-redux';
import StandingTable from './standingTable/standingTable';
import StandingRow from './standingRow/standingRow';

class Standing extends Component {

    render () {
        let league = this.props.match.params.league || 'PL';

        if (!this.props.competitions || !this.props.competitions[league]) {
            return null;
        }

        const competitions = this.props.competitions[league].standings.map((position, index) => {
            return (
                <StandingRow key={index} club={position} league={league} />
            )
        })

        return (
            <>
                <StandingTable competitions={competitions}/>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        competitions: state.footbalData.competitions
    }
}

export default connect(mapStateToProps)(Standing);