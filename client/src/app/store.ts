import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";
import usersListSlice from "../features/userList/usersListSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        usersList: usersListSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
