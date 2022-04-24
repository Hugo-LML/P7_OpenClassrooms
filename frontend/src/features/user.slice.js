import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        getUserValue: null,
        getUsersValue: null,
    },
    reducers: {
        getUser: (state, action) => {
            state.getUserValue = action.payload;
        },
        getUsers: (state, action) => {
            state.getUsersValue = action.payload;
        },
    }
});

export const { getUser, getUsers } = userSlice.actions;
export default userSlice.reducer;