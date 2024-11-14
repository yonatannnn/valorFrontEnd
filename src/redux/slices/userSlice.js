import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


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

      const data = await response.json(); // Parse the response data if successful
      console.log('Verification successful:', data);
      return data;
    } catch (error) {
      // Reject with the error message from the catch block
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
          'Content-Type': 'application/json', // Specify the content type as JSON
          'Accept': 'application/json'
        },
        body: JSON.stringify(user),
      });
      console.log('response', response);
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    loggedIn: false,
    profilePicture: '',
    status: 'idle',
    error: null,
  },

  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.profilePicture = action.payload.profilePicture;
      state.username = action.payload.username;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.profilePicture = '';
      state.loggedIn = false;
    },
    updateProfile: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.profilePicture = action.payload.profilePicture;
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendVerificationCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendVerificationCode.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendVerificationCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(verifyCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.status = 'verified';
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loggedIn = true; 
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.profilePicture = action.payload.profilePicture;
        state.username = action.payload.username;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
