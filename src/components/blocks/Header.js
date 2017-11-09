import React, { Component } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

import logo from '../../logo.svg';

class Header extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">
                        <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                            Movies Finder Application
                    </a>
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
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header;