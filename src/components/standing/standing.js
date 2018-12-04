import React, { Component } from 'react';
import { connect } from 'react-redux';

class Standing extends Component {

    render () {
        let league = this.props.match.params.league || 'PL';

        if (!this.props.competitions || !this.props.competitions[league]) {
            return null;
        }

        const competitions = this.props.competitions[league].standings.map((position, index) => {
            return (
                <div key={index}>{position.team.name}</div>
            )
        })

        return (
            <div className='container'>
                {competitions}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        competitions: state.footbalData.competitions
    }
}

export default connect(mapStateToProps)(Standing);