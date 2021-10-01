import React, { Component, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import classes from './navigation.module.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      active: ''
    };
  }

  toggle = () => {
    this.setState(prevState => {
      return {
        dropdownOpen: !prevState.dropdownOpen,
      }
    });
  };

  changeLocation = (link, active) => {
    this.setState({active});

    this.props.history.push(link);
  };

  render() {
    if (!this.props.competitions) {
      return null;
    }

    const competitions = Object.keys(this.props.competitions).map(com => {
      const competition = this.props.competitions[com].competition;
      return (
        <DropdownItem
          key={competition.code}
          active={this.props.location.pathname.indexOf(competition.code) !== -1}
          onClick={() => {
            this.changeLocation(`/league/${competition.code}`, competition.code);
          }}
        >
          {competition.name}
        </DropdownItem>
      );
    });

    return (
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
                <DropdownToggle className="dropdown-toggle">
                  {this.state.active === '' ? 'Пръвенства': this.props.competitions[this.state.active].competition.name}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu">
                  <DropdownItem
                    onClick={() => {
                      this.changeLocation(`/`, '');
                    }}
                    active={this.props.location.pathname === "/"}
                  >
                    Best of Europe
                  </DropdownItem>
                  {competitions}
                </DropdownMenu>
              </Dropdown>
            </li>
            {
              this.state.active !== '' &&
              <Fragment>
                <li>
                  <div className={classes.matchesLink}>
                    <Link to={`/league/${this.state.active}`}>Класиране</Link>
                  </div>
                </li>
                <li>
                  <div className={classes.matchesLink}>
                    <Link to={`/matches/${this.state.active}`}>Резултати</Link>
                  </div>
                </li>
              </Fragment>
            }
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    competitions: state.footbalData.competitions
  };
};

export default withRouter(connect(mapStateToProps)(Navigation));
