import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../app/store';

interface initialStateProps {
  user: any;
  isAuthenticated: boolean;
  sessionId: string | null;
}

const initialState: initialStateProps = {
  user: {},
  isAuthenticated: false,
  sessionId: '',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem('session_id');
      localStorage.setItem('account_id', action.payload.id);
    },
  },
});

export const { setUser } = user.actions;
export const userSelector = (state: RootState) => state.user;
export default user.reducer;
