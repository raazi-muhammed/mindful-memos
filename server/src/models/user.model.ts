import mongoose, { Document } from "mongoose";

export interface UserObjectType {
    email: string;
    password: string;
    username: string;
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
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<UserType>("User", userSchema);
