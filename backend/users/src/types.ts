export interface IUser {
    name: string;
    lastNames: string;
    email: string;
    password: string;
    isOwner: boolean;
    birthday?: number;
    private?: boolean;
    username?: string;
    notifications?: boolean;
    messages?: boolean;
}
