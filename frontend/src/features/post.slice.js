import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "post",
    initialState: {
        getPostsValue: null,
        getLikesValue: null,
    },
    reducers: {
        getPosts: (state, action) => {
            state.getPostsValue = action.payload;
        },
        getLikes: (state, action) => {
            state.getLikesValue = action.payload;
        },
        addLike: (state, action) => {
            state.getLikesValue.push(action.payload);
        },
        removeLike: (state, action) => {
            state.getLikesValue = state.getLikesValue.filter(element => element.id !== action.payload);
        }
    }
});

export const { getPosts, getLikes, addLike, removeLike } = postSlice.actions;
export default postSlice.reducer;