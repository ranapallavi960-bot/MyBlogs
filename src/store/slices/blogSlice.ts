import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  isSplash: true,
  isLogin: false,
 
  isLike: false,
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
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setIsLike: (state, action) => {
      state.description = action.payload;
    },
    setShowFullText: (state, action) => {
      state.description = action.payload;
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
  setTitle,
  setDescription,
  setIsLike,
  setShowFullText,
} = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
