import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "post",
    initialState: {
        getPostsValue: null,
        getLikesValue: null
    },
    reducers: {
        getPosts: (state, action) => {
            state.value = action.payload;
        },
        getLikes: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { getPosts, getLikes } = postSlice.actions;
export default postSlice.reducer;