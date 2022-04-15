import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';

const index = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/profil' exact element={<Profil />} />
                    <Route path='*' element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
};

export default index;