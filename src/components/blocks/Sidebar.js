import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default" role="navigation">
                <div  className="navbar-header">
                    <button className="navbar-toggle"  data-toggle="collapse" type="button">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse movies-cat">
                    <div className="panel-heading">Movies Category</div>
                    <ul className="nav nav-stacked">
                        <NavLink className="list-group-item" to="/genre/28/Action">Actions</NavLink>
                    </ul>
                </div>

            </nav>
        );
    }
}

export default Sidebar;