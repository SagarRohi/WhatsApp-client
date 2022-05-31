import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    activeChat:null,
    activeMessages:[],
    wantToChat:false,
}

const userAndChatSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
              state.user=action.payload; 
        },
        setActiveChat:(state,action)=>{
              state.activeChat=action.payload;
        },
        setWantToChat:(state,action)=>{
            state.wantToChat=action.payload;
        },
        setActiveMessages:(state,action)=>{
            state.activeMessages=action.payload;
        },
        addActiveMessage:(state,action)=>{
            state.activeMessages=[...state.activeMessages,action.payload];
        }
    }
});

export const {setUser,setActiveChat,setWantToChat,setActiveMessages,addActiveMessage} =userAndChatSlice.actions;
export const reducer=userAndChatSlice.reducer;