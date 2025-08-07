export type UserType = {
    id: string;
    UserName: string;
    Password: string;
    Email: string;
    Token: string;
    myTasks: string[];
    createdAt: Date;
    updatedAt?: Date | null;
}