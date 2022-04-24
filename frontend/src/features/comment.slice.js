import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
    name: "comment",
    initialState: {
        value: null
    },
    reducers: {
        getComments: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { getComments } = commentSlice.actions;
export default commentSlice.reducer;