 type taskType = {
     id: string;
        Nome: string;
        Descricao: string;
        Status: string;
        Priority: string;
     createdAt: Date;
     updatedAt?: Date;
    }
type newTaskType = {
    Nome: string;
    Descricao: string;
    Status: string;
    Priority: string;
    UserID: string;
}
type NewTaskUpdateType = {
    Nome: string | null;
    Descricao: string | null;
    Status: string | null;
    Priority: string | null;
    TaskID: string | null;
}
type UserType = {
    id: number;
    UserName: string;
    Password: string;
    Email: string;
    Token: string;
    myTasks: string[];
    createdAt: Date;
    updatedAt?: Date;
}

type NewUserData = {
    UserName: string;
    Email: string;
    ConfEmail: string;
}

type ErroType = {
    erroId: number;
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
        id: number;
      UserName: string;
      Password: string;
      Email: string;
    }) => Promise<ErroType[] | null>;
    UpdateTask: (newTask: NewTaskUpdateType) => Promise<ErroType[] | null>;
    createNewTask: (
      {NewTask, User}: 
          { NewTask: newTaskType, User: UserType }
      ) => Promise<ErroType[] | null>;
    Ftasks: taskType[] | null;
    loading: boolean;
    loadingTasks: boolean;
    LogginOutUser: () => Promise<boolean>;
    singIn: (data: newLoginUser) => Promise<ErroType[] | void>;
    setingTasks: (localLogin: UserType) => Promise<taskType[]>;
    deleteTask: (idTask: string) => Promise<ErroType[] | null>
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
