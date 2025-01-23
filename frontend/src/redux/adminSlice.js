import { createSlice } from "@reduxjs/toolkit";


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        adminInfo: []
    },
    reducers: {
        admLogin:(state,action)=>{
            state.adminInfo.push(action.payload)
        },
        adlogout:(state)=>{
            state.adminInfo=[]
        }
    }

})

export const {admLogin,adlogout}=adminSlice.actions
export default adminSlice.reducer