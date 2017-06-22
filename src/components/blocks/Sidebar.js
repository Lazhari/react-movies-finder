import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Sidebar = ({ genres, loading, genreId }) => {
    const genreLinks = () => {
        return genres.map(genre => {
            return (
                <Menu.Item name={genre.name} key={genre.id} active={genre.id === genreId}>
                    <NavLink className="list-group-item"
                             to={`/genres/${genre.id}/${genre.name}`}>{genre.name}
                    </NavLink>
                </Menu.Item>
            )
        });
    };
    return (
        <Menu pointing vertical fluid size='small'>
            { genreLinks() }
        </Menu>
    )
};
export default Sidebar;