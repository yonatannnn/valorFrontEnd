import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {uploadImage} from '../services/profile_picture';

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
  Avatar,
  CircularProgress
} from '@mui/material'
import { Close as CloseIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material'
import { closeModal, toggleMode } from '../redux/slices/modalSlice'
import { 
  sendVerificationCode, 
  verifyCode, 
  registerUser
} from '../redux/slices/userSlice'
import { uploadImage as uploadImageService } from '../services/profile_picture'

export default function SignInModal() {
  const dispatch = useDispatch()
  const { open, mode } = useSelector((state) => state.modal)
  const { status, error } = useSelector((state) => state.user)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [activeStep, setActiveStep] = useState(0)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    verificationCode: '',
    general: ''
  })

  const handleClose = useCallback(() => {
    dispatch(closeModal())
    setActiveStep(0)
  }, [dispatch])

  const handleMode = useCallback(() => {
    dispatch(toggleMode())
    setActiveStep(0)
  }, [dispatch])

  const handleNext = useCallback(() => {
    setActiveStep((prevStep) => prevStep + 1)
  }, [])

  const handleBack = useCallback(() => {
    setActiveStep((prevStep) => prevStep - 1)
  }, [])

  const validateInputs = useCallback(() => {
    let tempErrors = {}
    let isValid = true

    if (!email) {
      tempErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Email is not valid'
      isValid = false
    }

    if (!password) {
      tempErrors.password = 'Password is required'
      isValid = false
    }

    if (mode === 'signup' && confirmPassword !== password) {
      tempErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    if (mode === 'signup' && !firstName) {
      tempErrors.firstName = 'First Name is required'
      isValid = false
    }

    if (mode === 'signup' && !lastName) {
      tempErrors.lastName = 'Last Name is required'
      isValid = false
    }

    if (!username) {
      tempErrors.username = 'Username is required'
      isValid = false
    }

    if (activeStep === 1 && !verificationCode) {
      tempErrors.verificationCode = 'Verification Code is required'
      isValid = false
    }

    setErrors(tempErrors)
    return isValid
  }, [email, password, confirmPassword, firstName, lastName, username, verificationCode, mode, activeStep])

  const handleSendCode = useCallback(() => {
    if (validateInputs()) {
      dispatch(sendVerificationCode(email))
      handleNext()
    }
  }, [dispatch, email, validateInputs, handleNext])

  const handleVerifyCode = useCallback(() => {
    if (validateInputs()) {
      dispatch(verifyCode({ email, code: verificationCode }))
        .then((result) => {
          if (result.type === 'user/verifyCode/fulfilled') {
            handleNext()
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              verificationCode: 'Verification failed, try again.',
            }))
          }
        })
        .catch(() => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            verificationCode: 'Verification failed, try again.',
          }))
        })
    }
  }, [dispatch, email, verificationCode, validateInputs, handleNext])

  const handleRegister = useCallback(async () => {
    if (validateInputs()) {
        try {
            let profilePictureUrl = null;
            if (profilePicture) {
                profilePictureUrl = await uploadImage(profilePicture);
            }
            const newUser = {
                email,
                password,
                username,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                profile_picture: profilePictureUrl,
            };
            await dispatch(registerUser(newUser)).unwrap();
            handleClose();
        } catch (error) {
            console.error("Registration error:", error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                general: error?.message || 'Registration failed. Please try again.',
            }));
        }
    }
}, [dispatch, email, password, username, firstName, lastName, phoneNumber, profilePicture, validateInputs, handleClose]);


  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0]
    if (file) {
      setProfilePicture(file)
    }
  }, [])

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            {mode === 'signup' && (
              <>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField 
                    label="First Name" 
                    variant="outlined" 
                    fullWidth 
                    size="small" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                    error={!!errors.firstName} 
                    helperText={errors.firstName}
                  />
                  <TextField 
                    label="Last Name" 
                    variant="outlined" 
                    fullWidth 
                    size="small" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                    error={!!errors.lastName} 
                    helperText={errors.lastName}
                  />
                </Box>
                <TextField 
                  label="Email" 
                  variant="outlined" 
                  fullWidth 
                  size="small" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email} 
                  helperText={errors.email}
                  sx={{ mb: 2 }} 
                />
                <TextField 
                  label="Phone Number" 
                  variant="outlined" 
                  fullWidth 
                  size="small" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  error={!!errors.phoneNumber} 
                  helperText={errors.phoneNumber}
                  sx={{ mb: 2 }} 
                />
              </>
            )}
            <TextField 
              label="Username" 
              variant="outlined" 
              fullWidth 
              size="small" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username} 
              helperText={errors.username}
              sx={{ mb: 2 }} 
            />
            <TextField 
              label="Password" 
              type="password" 
              variant="outlined" 
              fullWidth 
              size="small" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password} 
              helperText={errors.password}
              sx={{ mb: 2 }} 
            />
            {mode === 'signup' && (
              <TextField 
                label="Confirm Password" 
                type="password" 
                variant="outlined" 
                fullWidth 
                size="small" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword} 
                helperText={errors.confirmPassword}
                sx={{ mb: 2 }} 
              />
            )}
          </>
        )
      case 1:
        return (
          <TextField 
            label="Verification Code" 
            variant="outlined" 
            fullWidth 
            size="small" 
            value={verificationCode} 
            onChange={(e) => setVerificationCode(e.target.value)}
            error={!!errors.verificationCode} 
            helperText={errors.verificationCode}
            sx={{ mb: 2 }} 
            placeholder="Enter the 6-digit code sent to your email"
          />
        )
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={profilePicture ? URL.createObjectURL(profilePicture) : ''}
              sx={{ width: 100, height: 100 }}
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload Profile Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Box>
        )
      default:
        return null
    }
  }

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
          <Typography variant="h5" component="h2" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </Typography>
        </Box>

        {mode === 'signup' && (
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
            <Step>
              <StepLabel>Account Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Verify</StepLabel>
            </Step>
            <Step>
              <StepLabel>Profile Picture</StepLabel>
            </Step>
          </Stepper>
        )}

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
          {errors.general && (
            <Typography color="error" sx={{ mt: 2, mb: 2 }}>
              {errors.general}
            </Typography>
          )}
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
              onClick={
                mode === 'signin'
                  ? handleSendCode
                  : activeStep === 0
                  ? handleSendCode
                  : activeStep === 1
                  ? handleVerifyCode
                  : handleRegister
              }
              sx={{ textTransform: 'none' }}
              disabled={status === 'loading' || status === 'uploading'}
            >
              {status === 'loading' || status === 'uploading' ? (
                <CircularProgress size={24} />
              ) : (
                mode === 'signin'
                  ? 'Sign In'
                  : activeStep === 0
                  ? 'Next'
                  : activeStep === 1
                  ? 'Verify'
                  : 'Register'
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  )
}