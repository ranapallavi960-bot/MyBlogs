import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name:"",
  email: '',
  password: '',
  confirmPassword: '',
  isSplash: true,
  isLogin: false,
  showFullText:false,
};
const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setInputValues: (state, action) => {
      return { ...state, ...action.payload };
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsSplash: (state, action) => {
      state.isSplash = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  
    setShowFullText: (state, action) => {
      state.showFullText = action.payload;
    },
  },
});
export const {
  setEmail,
  setIsSplash,
  setIsLogin,
  setPassword,
  setConfirmPassword,
  setInputValues,
  setShowFullText,
} = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
