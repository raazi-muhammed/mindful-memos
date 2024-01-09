import { UserType } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    users: UserType[];
} = {
    users: [],
};

export const usersListSlice = createSlice({
    name: "usersList",
    initialState,
    reducers: {
        setUsersList: (state, { payload }) => {
            state.users = payload;
        },
        setUsersBlockState: (
            state,
            { payload }: { payload: { userId: string; blockState: boolean } }
        ) => {
            const { userId, blockState } = payload;
            state.users = state.users.map((user) =>
                user._id === userId ? { ...user, isBlocked: blockState } : user
            );
        },
        deleteUserById: (state, { payload }: { payload: string }) => {
            const userId = payload;
            state.users = state.users.filter((user) => user._id !== userId);
        },
        addUserToUserList: (state, { payload }: { payload: UserType }) => {
            state.users.push(payload);
        },
        editUser: (
            state,
            {
                payload,
            }: {
                payload: {
                    userId: string;
                    email: string;
                    avatar: string | undefined;
                    username: string;
                };
            }
        ) => {
            const { userId, email, avatar, username } = payload;

            state.users = state.users.map((user) =>
                user._id === userId
                    ? { ...user, email, avatar, username }
                    : user
            );
        },
    },
});

export const {
    setUsersList,
    setUsersBlockState,
    deleteUserById,
    addUserToUserList,
    editUser,
} = usersListSlice.actions;
export default usersListSlice.reducer;
