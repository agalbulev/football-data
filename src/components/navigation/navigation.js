import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';

class Navigation extends Component { 
    constructor (props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeLocation = (link) => {
        this.props.history.push(link);
    }

    render () {
        
        if (!this.props.competitions) {
            return null;
        }

        const competitions = Object.keys(this.props.competitions).map(com => {
            const competition = this.props.competitions[com].competition;
            return <DropdownItem
                key={competition.code} 
                active={ this.props.location.pathname === `/${competition.code}` || ( competition.code === 'PL' && this.props.location.pathname === '/' )  } 
                onClick={() => { this.changeLocation(`/${competition.code}`)} }
            >
            {competition.name}</DropdownItem>
        })

        return (
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <div className='container'>
                        <ul className='navbar-nav mr-auto'>
                            <li className='nav-item dropdown'>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle className='dropdown-toggle'>
                                        Competitions
                                    </DropdownToggle>
                                    <DropdownMenu className='dropdown-menu'>
                                        {competitions}
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        competitions: state.footbalData.competitions
    }
}

export default withRouter(connect(mapStateToProps)(Navigation));