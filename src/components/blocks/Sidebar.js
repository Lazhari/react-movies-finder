import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ genres, loading, genreId }) => {
    const genreLinks = () => {
        return genres.map(genre => {
            return (
                <NavLink className="list-group-item" key={genre.id}
                         to={`/genres/${genre.id}/${genre.name}`}>{genre.name}</NavLink>
            )
        });
    };
    return (
        <nav className="navbar navbar-default">
            <div className="navbar-header">
                <button className="navbar-toggle" data-toggle="collapse" type="button">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse movies-cat">
                <div className="panel-heading">Movies Category</div>
                <ul className="nav nav-stacked" style={{paddingBottom: 10}}>
                    {genreLinks()}
                </ul>
            </div>

        </nav>
    )
};
export default Sidebar;