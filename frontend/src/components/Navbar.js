import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../features/user.slice';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';
import axios from 'axios';

const Navbar = () => {
    const uid = useContext(UidContext);

    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.getUserValue);

    useEffect(() => {
        if (uid) {
            axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {withCredentials: true})
            	.then((res) => {
            		dispatch(getUser(res.data));
            	})
            	.catch((err) => console.log(err));
        }
    }, [uid, dispatch]);

    return (
        <nav className='navbar'>
            <NavLink end to="/">
                <img src="./img/icon-left-font.svg" alt="logo" />
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