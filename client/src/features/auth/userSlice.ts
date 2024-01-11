import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    user: { email: string; _id: string } | {};
    admin: { username: string; password: string } | {};
} = {
    user: {},
    admin: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        removeUser: (state) => {
            state.user = {};
        },
        setAdmin: (state, { payload }) => {
            state.admin = payload;
        },
    },
});

export const { setUser, removeUser, setAdmin } = userSlice.actions;
export default userSlice.reducer;
