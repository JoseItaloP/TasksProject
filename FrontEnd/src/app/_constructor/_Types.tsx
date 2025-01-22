 type taskType = {
        ID: number;
        Nome: string;
        Descricao: string;
        Status: string;
        Priority: string;
        created_at: Date;
        updated_at?: Date;
    }
type newTaskType = {
    Name: string;
    Descrição: string;
    Status: string;
    Priority: string;
    UserID: string;
}
type NewTaskUpdateType = {
    Name: string;
    Descrição: string;
    Status: string;
    Priority: string;
    TaskID: number | null;
}
type UserType = {
    ID: number;
    UserName: string;
    Password: string;
    Email: string;
    Token: string;
    my_tasks: number[];
    created_at: Date;
    updated_at?: Date;
}

type NewUserData = {
    Username: string;
    Email: string;
}

type ErroType = {
    id: number;
    message: string;
}

type newLoginUser = {
    userName: string;
    password: string;
}

export type {
        taskType,
        UserType,
        newTaskType,
        NewUserData,
        ErroType,
        newLoginUser,
        NewTaskUpdateType
    }
