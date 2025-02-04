import { createContext, useEffect, useState } from "react";
import {
  EditUser,
  getLogedLocal,
  LoginUser,
  LogoutLocalUser,
} from "../_constructor/UserValue";
import {
  defaultErro,
  ErroType,
  newLoginUser,
  newTaskType,
  NewTaskUpdateType,
  taskType,
  UserType,
} from "../_constructor/_Types";
import { usePathname, useRouter } from "next/navigation";
import { parseCookies } from "nookies";

async function FilterTasksUser(user: UserType | null) {
  const User: UserType | null = user;

  if (User) {

    const IDuSER = User.ID;

    try {
      const methods = {
        method: "GET",
        headers: {
          "Content-Types": "application/json",
        },
      };

      const res = await fetch(`http://localhost:3000/user/task/${IDuSER}`, methods);
      const data: taskType[] = await res.json();

      console.log("Data: ", data);
      return data
     
    } catch (e) {
      console.error(e);
      return [];
    } 
  } else {
    return [];
  }
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
    {newTask, User}: 
    {newTask: newTaskType, User: UserType | null}
    ) => Promise<ErroType[] | null>;
  Ftasks: taskType[] | null;
  loading: boolean;
  loadingTasks: boolean;
  LogginOutUser: () => Promise<boolean>;
  singIn: (data: newLoginUser) => Promise<ErroType[] | void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [userHeader, setUserHeader] = useState<UserType | null>(null);
  const [Ftasks, setFtasks] = useState<taskType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
  const isAuthenticated = !!user;
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    async function localToken() {
      const { "TaskDefine-Token": token } = parseCookies();

      if (token) {
        console.log(token);
        const LocalUser: UserType | defaultErro | null = await getLogedLocal(
          token
        );

        if (LocalUser) {
          if ("ID" in LocalUser) {
            setUserHeader(LocalUser);
          }
        }
      }
    }

    localToken();
  }, [pathName]);

  useEffect(() => {
    if (user !== null) {
      console.log("Data User:", user);
      setLoading(false);

      async function setingTasks() {
        setLoadingTasks(true);
        const filtredTasks = await FilterTasksUser(user);
        console.log('filtrado: ', filtredTasks)
        setFtasks(filtredTasks);
        
        setLoadingTasks(false);
      }
      setingTasks();
    }
  }, [user]);

  async function getLoginUser() {
    setLoading(true);
    const { "TaskDefine-Token": token } = parseCookies();

    if (token) {
      const LocalUser: UserType | defaultErro | null = await getLogedLocal(
        token
      );

      if (LocalUser && "ID" in LocalUser) {
        setUser(LocalUser);
        setUserHeader(LocalUser);
        setLoading(false);
        return LocalUser; // Agora retorna corretamente o usuário
      }
    }

    setLoading(false);
    return null;
  }

  async function singIn({ UserName, Password }: newLoginUser) {
    setLoading(true);
    const errors: ErroType[] = [];
    if(UserName === '' || Password === ''){
      errors.push({id: Date.now(), message: "Usuário e senha devem ser totalmente preenchidos"})
      return errors
    }
    const LogedUser: UserType | ErroType = await LoginUser({
      UserName,
      Password,
    });



    if ("ID" in LogedUser) {
      setUser(LogedUser);
      console.log(user);
      setLoading(false);
      router.refresh();
      router.push("/User");
    } else {
      setLoading(false);
      errors.push(LogedUser);
      return errors;
    }
  }

  async function LogginOutUser() {
    const LogOut = await LogoutLocalUser();
    setUser(null);
    setUserHeader(null);
    if (LogOut) {
      return true;
    } else {
      return false;
    }
  }

  async function EditUserhamdle(NewEdit: {
    ID: number;
    UserName: string;
    Password: string;
    Email: string;
  }): Promise<ErroType[] | null> {
    setLoading(true);
    const errors: ErroType[] = [];

    if (
      NewEdit.UserName.length == 0 ||
      NewEdit.Email.length == 0
    ) {
      setLoading(false)
      errors.push({
        id: Date.now(),
        message: "Todos os dados devem estar preenchidos.",
      });
      return errors;
    }

    try {
      const result = await EditUser(NewEdit);

      if (result) {
        await LogoutLocalUser();
        setUser(null);
        setUserHeader(null);
        setLoading(false);
        return null;
      }
    } catch (e) {
      console.error("Error: ", e);
      errors.push({
        id: Date.now(),
        message: "Algo de errado ocorreu, cheque o console.",
      });
      setLoading(false);
      return errors;
    } finally {
      setLoading(false);
      return null;
    }
  }

  async function UpdateTask(
    newTask: NewTaskUpdateType
  ): Promise<ErroType[] | null> {

    const errors: ErroType[] = [];
    const { Name, Descrição, Priority, Status, TaskID } = newTask;

    if (Name == null || Descrição == null) {
      errors.push({
        id: Date.now(),
        message: "Todos os dados devem estar preenchidos",
      });
      return errors;
    }

    try {
      const fetchData = await fetch(
        `http://localhost:3000/user/task/${TaskID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: Name,
            Descrição: Descrição,
            Priority: Priority,
            Status: Status,
          }),
        }
      );

      const data = await fetchData.json();

      if (data) {

        setLoadingTasks(true)

        const filtredTasks = await FilterTasksUser(user);

        setFtasks(filtredTasks);
        
        setLoadingTasks(false)

        return null;

      } else {
        errors.push({
          id: Date.now(),
          message: "Erro ao buscar dados, tente novamente.",
        });
        return errors;
      }
    } catch (e) {
      errors.push({
        id: Date.now(),
        message: "Erro ao buscar dados, tente novamente.",
      });
      console.error("Erros: ", e);
      return errors;
    }
  }

  async function createNewTask({newTask, User}: {newTask: newTaskType, User: UserType | null}): Promise<ErroType[] | null> {

    const { Name, Descrição, Priority, Status } = newTask;

    const UserID = User?.ID;
    const errors: ErroType[] = [];
  
    if (Name === "" || Descrição === "") {
      setLoading(false);
      errors.push({ id: Date.now(), message: "Todos os dados devem estar preenchidos" });
      return errors;
    }
  
    try {
      const fetchData = await fetch("http://localhost:3000/user/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name, Descrição, Priority, Status, UserID }),
      });
  
      const result = await fetchData.json();
      console.log('resultado: ', result)

      if (result) {

        setLoadingTasks(true);
        
        const filtredTasks = await FilterTasksUser(User);

        console.log("Tasks filtradas:", filtredTasks);
        
        if (filtredTasks) {
          setFtasks(filtredTasks);
        }
        console.log('tasks updated: ', Ftasks)
  
        setLoadingTasks(false);
        return null;
      } else {
        errors.push({ id: Date.now(), message: "Erro ao criar Task." });
      }
    } catch (e) {
      console.error("Erro ao tentar criar Task:", e);
      errors.push({ id: Date.now(), message: "Erro ao tentar criar Task." });
    }
    return errors.length > 0 ? errors : null;
  }
  

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        Ftasks,
        loading,
        loadingTasks,
        userHeader,
        getLoginUser,
        LogginOutUser,
        EditUserhamdle,
        UpdateTask,
        createNewTask,
        singIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
