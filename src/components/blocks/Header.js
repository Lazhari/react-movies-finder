import React, { Component } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

import logo from '../../logo.svg';

class Header extends Component {

    render() {
        return (
            <Sidebar as={Menu} animation='overlay' direction='top' inverted visible={true}>
                <Menu.Item>
                    <img src={logo} />
                </Menu.Item>

                <Menu.Item name='home' active={window.location.pathname === '/'}>
                    <Icon name='home'/>
                    <NavLink className="" activeClassName="active" exact to="/">
                        Popular Movies
                    </NavLink>
                </Menu.Item>
                <Menu.Item name='upcoming' active={window.location.pathname === '/upcoming'}>
                    <Icon name='ticket'/>
                    <NavLink className="" activeClassName="active" exact to="/upcoming">
                        Upcoming Movies
                    </NavLink>
                </Menu.Item>
                <Menu.Item name='Series' active={window.location.pathname === '/series'}>
                    <Icon name='trophy'/>
                    <NavLink className="" activeClassName="active" exact to="/series">
                        Popular Series
                    </NavLink>
                </Menu.Item>
            </Sidebar>
        )
    }
}

export default Header;