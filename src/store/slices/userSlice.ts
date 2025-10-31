import { createSlice } from "@reduxjs/toolkit";
type InitialState={
    data?:UserType|{}|null
}
const initialState:InitialState={
   data:{},
}

const userSlice=createSlice({
    name:'userdata',
    initialState,
    reducers:{
        setUserData:(state,action)=>{
            return {...state,data:action.payload}
        }
    }
});

export const {setUserData}=userSlice.actions;
export const userReducer=userSlice.reducer;