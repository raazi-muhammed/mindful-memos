import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import usersListSlice from "./usersListSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        usersList: usersListSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
