import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: '',
  permissions: null,
  bestFriend: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user data when logging in
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    clearUser: state => {
      state.user = null;
      state.token = '';
      // clear other user-related properties if needed
    },

    setBestFriend: (state, action) => {
      state.bestFriend = action.payload;
    },
  },
});

// Export the actions for use in components or elsewhere
export const {setUser, clearUser, setBestFriend} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
