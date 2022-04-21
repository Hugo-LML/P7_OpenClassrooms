import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';

const Navbar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state => state.user.value));

    return (
        <nav className='navbar'>
            <NavLink end to="/">
                <img src="./img/icon-left-font-monochrome-black.svg" alt="logo" />
            </NavLink>
            {uid && userData !== null ? (
                <>
                    <NavLink end to="/profil">
                        <p>Hello {userData[0].pseudo} !</p>
                    </NavLink>
                    <Logout />
                </>
            ) : (
                <NavLink end to="/profil">
                    <p>Go to login</p>
                </NavLink>
            )}
        </nav>
    );
};

export default Navbar;