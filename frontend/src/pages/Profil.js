import React, { useContext } from 'react';
import Log from '../components/Log/Log';
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from '../features/user.slice';

const Profil = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {withCredentials: true})
        .then(res => {
            dispatch(getUser(res.data));
        }) 
        .catch(err => console.log(err));

    return (
        <div>
            {uid === '' ? <Log signIn={false} signUp={true} /> : <UpdateProfil />}
        </div>
    );
};

export default Profil;