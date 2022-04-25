import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "post",
    initialState: {
        getPostsValue: null,
        getLikesValue: null,
        setLikeValue: null
    },
    reducers: {
        getPosts: (state, action) => {
            state.getPostsValue = action.payload;
        },
        getLikes: (state, action) => {
            state.getLikesValue = action.payload;
        },
        setLike: (state, action) => {
            
            // const myLike = state.getLikesValue.find(element => element.id === action.payload)
            // state.setLikeValue = action.payload;
        }
    }
});

export const { getPosts, getLikes, setLike } = postSlice.actions;
export default postSlice.reducer;