export interface UserType {
    _id: string;
    email: string;
    password: string;
    username: string;
    isBlocked: boolean;
    avatar?: string;
}

export interface NoteType {
    _id: string;
    title: string;
    content: string;
    user: UserType;
    createdAt: Date;
}

export type MailListingType = {
    date: string;
    user: UserType;
    note: NoteType;
};
