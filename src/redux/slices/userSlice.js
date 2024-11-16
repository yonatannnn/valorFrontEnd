import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImage as uploadImageService } from '../../services/profile_picture';

const persistedState = JSON.parse(localStorage.getItem('userState')) || {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  loggedIn: false,
  profilePicture: '',
  status: 'idle',
  error: null,
};


export const sendVerificationCode = createAsyncThunk(
  'user/sendVerificationCode',
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/send-code', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyCode = createAsyncThunk(
  'user/verifyCode',
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify({ email, code }), // Send the payload as JSON
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        throw new Error(errorData.message || 'Failed to verify the code');
      }

      const data = await response.json();
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const uploadImage = createAsyncThunk(
  'user/uploadImagee',
  async (file, { rejectWithValue }) => {
    try {
      const downloadURL = await uploadImageService(file);
      return downloadURL;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      console.log("data" ,data);
      document.cookie = `access_token=${data.token}; path=/; secure; samesite=strict`;
      document.cookie = `refresh_token=${data.refresh_token}; path=/; secure; samesite=strict`;
      localStorage.setItem('access_token', data.token);
      localStorage.setItem('refresh_token', data.refresh_token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: persistedState,

  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.profilePicture = action.payload.profilePicture;
      state.username = action.payload.username;
      state.loggedIn = true;
      localStorage.setItem('userState', JSON.stringify(state));
    },
    
    logout: (state) => {
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.profilePicture = '';
      state.loggedIn = false;
      localStorage.setItem('userState', JSON.stringify(state));
    },
    updateProfile: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.profilePicture = action.payload.profilePicture;
      state.email = action.payload.email;
      localStorage.setItem('userState', JSON.stringify(state));
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendVerificationCode.pending, (state) => {
        state.status = 'loading';
        localStorage.setItem('userState', JSON.stringify(state));
      })
      .addCase(sendVerificationCode.fulfilled, (state) => {
        state.status = 'succeeded';
        localStorage.setItem('userState', JSON.stringify(state));
      })
      .addCase(sendVerificationCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        localStorage.setItem('userState', JSON.stringify(state));
      })
      .addCase(verifyCode.pending, (state) => {
        state.status = 'loading';
        localStorage.setItem('userState', JSON.stringify(state));
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.status = 'verified';
        localStorage.setItem('userState', JSON.stringify(state));
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        localStorage.setItem('userState', JSON.stringify(state));
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        localStorage.setItem('userState', JSON.stringify(state));
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loggedIn = true; 
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.profilePicture = action.payload.profilePicture;
        state.username = action.payload.username;
        localStorage.setItem('userState', JSON.stringify(state));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        localStorage.setItem('userState', JSON.stringify(state));
      })
      .addCase(uploadImage.pending, (state) => {
        state.status = 'uploading';
        localStorage.setItem('userState', JSON.stringify(state));
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = 'uploaded';
        state.profilePicture = action.payload; 
        localStorage.setItem('userState', JSON.stringify(state));
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        localStorage.setItem('userState', JSON.stringify(state));
      });
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
