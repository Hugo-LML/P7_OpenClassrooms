import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "post",
    initialState: {
        value: null
    },
    reducers: {
        getPosts: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { getPosts } = postSlice.actions;
export default postSlice.reducer;