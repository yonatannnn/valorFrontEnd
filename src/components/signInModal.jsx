import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Modal, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { closeModal, toggleMode } from '../redux/slices/modalSlice';
import logo from '../assets/logo.jpg';

const SignInModal = () => {
  const dispatch = useDispatch();
  const { open, mode } = useSelector((state) => state.modal);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);

  const handleClose = () => {
    dispatch(closeModal());
    setActiveStep(0);
  };

  const handleMode = () => {
    dispatch(toggleMode());
    setActiveStep(0);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            {mode === 'signup' && (
              <>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField label="First Name" variant="outlined" fullWidth size="small" />
                  <TextField label="Last Name" variant="outlined" fullWidth size="small" />
                </Box>
                <TextField label="Email" variant="outlined" fullWidth size="small" type="email" sx={{ mb: 2 }} />
                <TextField label="Phone Number" variant="outlined" fullWidth size="small" sx={{ mb: 2 }} />
              </>
            )}
            <TextField label="Username" variant="outlined" fullWidth size="small" sx={{ mb: 2 }} />
            <TextField label="Password" type="password" variant="outlined" fullWidth size="small" sx={{ mb: 2 }} />
            {mode === 'signup' && (
              <TextField label="Confirm Password" type="password" variant="outlined" fullWidth size="small" sx={{ mb: 2 }} />
            )}
          </>
        );
      case 1:
        return (
          <TextField 
            label="Verification Code" 
            variant="outlined" 
            fullWidth 
            size="small" 
            sx={{ mb: 2 }} 
            placeholder="Enter the 6-digit code sent to your email"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        elevation={24}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '90%' : 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
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

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <img src={logo} alt="Logo" style={{ width: 60, height: 60, borderRadius: '50%', marginBottom: '1rem' }} />
          <Typography variant="h5" component="h2" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            Valor Insight
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          <Step>
            <StepLabel>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</StepLabel>
          </Step>
          <Step>
            <StepLabel>Verify</StepLabel>
          </Step>
        </Stepper>

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              onClick={activeStep === 0 ? handleMode : handleBack}
              sx={{ textTransform: 'none' }}
            >
              {activeStep === 0
                ? (mode === 'signin' ? 'Create an Account' : 'Back to Sign In')
                : 'Back'
              }
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === 1 ? handleClose : handleNext}
              sx={{ textTransform: 'none' }}
            >
              {activeStep === 1 ? 'Confirm' : (mode === 'signin' ? 'Sign In' : 'Sign Up')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default SignInModal;