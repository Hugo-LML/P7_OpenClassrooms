import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = () => {
    const [signUpModal, setSignUpModal] = useState(true);
    const [signInModal, setSignInModal] = useState(false);
    
    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        }
        else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    }

    return (
        <div className="profil-body">
            <img src="./img/icon-above-font.svg" alt="logo-groupomania" />
            <div className='form-auth'>
                <ul>
                    <li onClick={handleModals} id="register">S'inscrire</li>
                    <li onClick={handleModals} id="login">Se connecter</li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;