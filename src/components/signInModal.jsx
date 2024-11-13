import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignInModal = ({ open, handleClose, handleLogin }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                className='bg-white p-6 rounded shadow-lg'
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <h2 className="text-center text-xl font-bold mb-4">Sign In</h2>
                <TextField label="Username" variant="outlined" fullWidth />
                <TextField label="Password" type="password" variant="outlined" fullWidth />
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    Sign In
                </Button>
                <Button variant="text" color="primary" onClick={handleClose}>
                    Sign Up
                </Button>
            </Box>
        </Modal>
    );
};

export default SignInModal;
