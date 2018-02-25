import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar'

import logo from '../../logo.svg';

class Header extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md fixed-top mv-header">
                    <LoadingBar style={{ backgroundColor: 'white', height: '5px', top: 0, position: 'absolute' }} />
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} className="d-inline-block align-middle mv-logo" alt="" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/">
                                    Popular Movies
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/upcoming">
                                    Upcoming Movies
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/series">
                                    Popular Series
                                </NavLink>
                            </li>
                        </ul>
                        <form className="form-inline my-4 my-lg-0 mv-search">
                            <input className="form-control mr-sm-4" type="search" placeholder="Search" aria-label="Search" style={{ display: 'none' }} />
                            <a href="#">
                                <i className="fa fa-search"></i>
                            </a>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header;