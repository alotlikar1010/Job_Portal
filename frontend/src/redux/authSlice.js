import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false
    },
    reducers:{
        setLoading:(state ,action) =>{
            state.laoding = action.payload;
        }
    }
})

export const {setLoading} = authSlice.actions;
export default authSlice.reducer;