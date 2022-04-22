import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: null,
    },
    reducers: {
        getUser: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;