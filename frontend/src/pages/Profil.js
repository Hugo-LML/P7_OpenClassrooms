import React, { useContext } from 'react';
import Log from '../components/Log/Log';
import { UidContext } from '../components/AppContext';

const Profil = () => {
    const uid = useContext(UidContext);

    return (
        <div>
            {uid === '' ? <Log signIn={false} signUp={true} /> : <h1>User already connected</h1>}
        </div>
    );
};

export default Profil;