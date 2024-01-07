export interface UserType {
    _id: string;
    email: string;
    password: string;
    username: string;
    avatar?: string;
}

export interface NoteType {
    _id: string;
    title: string;
    content: string;
    user: UserType;
}
