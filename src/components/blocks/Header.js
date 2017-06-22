import React, { Component } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <Sidebar as={Menu} animation='overlay' direction='top' visible={window.location.pathname !== '/'} inverted>
                <Menu.Item name='home'>
                    <Icon name='home'/>
                    <NavLink className="" activeClassName="active" exact to="/">
                        Movies Finder
                    </NavLink>
                </Menu.Item>
                <Menu.Item name='users' active={window.location.pathname === '/upcoming'}>
                    <Icon name='users'/>
                    <NavLink className="" activeClassName="active" exact to="/upcoming">
                        Upcoming Movies
                    </NavLink>
                </Menu.Item>
                <Menu.Item name='events' active={window.location.pathname === '/series'}>
                    <Icon name='calendar'/>
                    <NavLink className="" activeClassName="active" exact to="/series">
                        Popular Series
                    </NavLink>
                </Menu.Item>
            </Sidebar>
        )
    }
}

export default Header;