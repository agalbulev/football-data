import React, { Component } from 'react';
import { connect } from 'react-redux';
import StandingRow from './standingRow/standingRow'

class Standing extends Component {

    render () {
        let league = this.props.match.params.league || 'PL';

        if (!this.props.competitions || !this.props.competitions[league]) {
            return null;
        }

        const competitions = this.props.competitions[league].standings.map((position, index) => {
            return (
                <StandingRow key={index} club={position} />
            )
        })

        return (
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th></th>
                            <th scope='col'>M</th>
                            <th scope='col'>П</th>
                            <th scope='col'>Р</th>
                            <th scope='col'>З</th>
                            <th scope='col'>Г</th>
                            <th scope='col'>Точки</th>
                        </tr>
                    </thead>
                    <tbody>
                        {competitions}
                    </tbody>
                </table>
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