export type UserTypeDB = {
    id: string;
    UserName: string;
    Password: string;
    Email: string;
    Token: string;
    myTasks: string[];
    createdAt: Date;
    SaltKey: string;
    updatedAt?: Date | null;
}