import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SignInModal from './signInModal';
import SignUpModal from './signUpModal';

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [signInOpen, setSignInOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);

    const handleSignInOpen = () => setSignInOpen(true);
    const handleSignInClose = () => setSignInOpen(false);
    const handleSignUpOpen = () => setSignUpOpen(true);
    const handleSignUpClose = () => setSignUpOpen(false);

    const handleLogin = () => {
        setLoggedIn(true);
        setSignInOpen(false);
    };

    return (
        <header className='w-full flex flex-col sm:flex-row items-center justify-between px-6 sm:px-16 py-4 bg-black'>
            <div className='flex items-center mb-4 sm:mb-0'>
                <img src={logo} alt='logo' className='h-10 w-10 mr-2' />
                <span className='text-xl font-bold text-white'>Valor Insight</span>
            </div>
            <nav className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-16'>
                <ul className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-6 text-white'>
                    <li>Home</li>
                    <li>Match Analysis</li>
                    <li>Fixtures</li>
                    <li>Prediction</li>
                </ul>
                {loggedIn ? (
                    <Avatar alt="User Avatar" src={logo} />
                ) : (
                    <Button variant="contained" color="primary" onClick={handleSignInOpen}>
                        Sign In
                    </Button>
                )}
            </nav>

            {/* Sign In Modal */}
            <SignInModal open={signInOpen} handleClose={handleSignInClose} handleLogin={handleLogin} />

            {/* Sign Up Modal */}
            <SignUpModal open={signUpOpen} handleClose={handleSignUpClose} />
        </header>
    );
};

export default Header;
