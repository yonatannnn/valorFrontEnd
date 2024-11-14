import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Modal, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Fade,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { closeModal, toggleMode } from '../redux/slices/modalSlice';
import logo from '../assets/logo.jpg';

const SignInModal = () => {
  const dispatch = useDispatch();
  const { open, mode } = useSelector((state) => state.modal);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleMode = () => {
    dispatch(toggleMode());
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open} timeout={400}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : 400,
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb:2 }}>
            <img src={logo} alt="Logo" style={{ width: 50, height: 50, borderRadius: '50%'}} />
          </Box>

          <Typography variant="h5" component="h3" sx={{ marginBottom: "1rem", textAlign: 'center', fontWeight: 'medium' }}>
            {mode === 'signin' ? 'Welcome Back!' : 'Create an Account'}
          </Typography>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {mode === 'signup' && (
              <>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField label="First Name" variant="outlined" fullWidth size="small" />
                  <TextField label="Last Name" variant="outlined" fullWidth size="small" />
                </Box>
                <TextField label="Email" variant="outlined" fullWidth size="small" type="email" />
                <TextField label="Phone Number" variant="outlined" fullWidth size="small" />
              </>
            )}
            <TextField label="Username" variant="outlined" fullWidth size="small" />
            <TextField label="Password" type="password" variant="outlined" fullWidth size="small" />
            {mode === 'signup' && (
              <TextField label="Confirm Password" type="password" variant="outlined" fullWidth size="small" />
            )}

            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2, py: 1, textTransform: 'none', fontSize: '1rem' }}
            >
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleMode}
              sx={{ textTransform: 'none' }}
            >
              {mode === 'signin' ? 'Create an Account' : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SignInModal;