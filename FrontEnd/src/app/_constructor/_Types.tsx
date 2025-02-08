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
    Name: string | null;
    Descrição: string | null;
    Status: string | null;
    Priority: string | null;
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
    ConfEmail: string;
}

type ErroType = {
    id: number;
    message: string;
}

type newLoginUser = {
    UserName: string;
    Password: string;
}

type defaultErro = {
    message: string
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: UserType | null;
    userHeader: UserType | null;
    getLoginUser: () => Promise<UserType | null>;
    EditUserhamdle: (NewEdit: {
      ID: number;
      UserName: string;
      Password: string;
      Email: string;
    }) => Promise<ErroType[] | null>;
    UpdateTask: (newTask: NewTaskUpdateType) => Promise<ErroType[] | null>;
    createNewTask: (
      {NewTask, User}: 
      {NewTask: newTaskType, User: UserType | null}
      ) => Promise<ErroType[] | null>;
    Ftasks: taskType[] | null;
    loading: boolean;
    loadingTasks: boolean;
    LogginOutUser: () => Promise<boolean>;
    singIn: (data: newLoginUser) => Promise<ErroType[] | void>;
    setingTasks: () => Promise<taskType[] | null>
  };

export type {
        taskType,
        UserType,
        newTaskType,
        NewUserData,
        ErroType,
        newLoginUser,
        NewTaskUpdateType,
        defaultErro,
        AuthContextType
    }
