import React from 'react';
import './HeaderAdmin.css';

const HeaderAdmin = () => {
    return (
        <header className="header-admin">
            <h1 style={{ fontWeight: 'bold', color: '#FF5F15', fontSize: '50px' }}>MOVO</h1>
                       <nav>
                       <img src="src\assets\images\Linkdln Profile.png" alt="Profile" className="profile-pic" />
                       <a href="/dashboard">dimuthu_lk</a>
                        </nav> 
        </header>
    );
};

export default HeaderAdmin;
