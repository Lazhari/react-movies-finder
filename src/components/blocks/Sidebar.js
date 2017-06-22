import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Sidebar = ({ genres, loading, genreId }) => {
    const genreLinks = () => {
        return genres.map(genre => {
            return (
                <Menu.Item name='home'>
                <NavLink className="list-group-item" key={genre.id}
                         to={`/genres/${genre.id}/${genre.name}`}>{genre.name}</NavLink>
                </Menu.Item>
            )
        });
    };
    return (
        <Menu pointing vertical>
            { genreLinks() }
        </Menu>
    )
};
export default Sidebar;