import React from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({genres, loading, genreId}) => {
    const genreLinks = () => {
        return genres.map(genre => {
            return (
                <NavLink className="list-group-item" key={genre.id}
                         to={`/genres/${genre.id}/${genre.name}`}>
                    {genre.name}
                </NavLink>
            )
        });
    };
    return (
        <div className="list-group">
            { genreLinks() }
        </div>
    )
};
export default Sidebar;