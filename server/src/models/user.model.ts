import mongoose, { Document } from "mongoose";

export interface UserObjectType {
    email: string;
    password: string;
    username: string;
    isBlocked: boolean;
    isDeleted: boolean;
    avatar?: string;
}

export interface UserType extends Document, UserObjectType {
    _id: string;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<UserType>("User", userSchema);
