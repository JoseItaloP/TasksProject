import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import {
  EditUser,
  getLogedLocal,
  LoginUser,
  LogoutLocalUser,
  FilterTasksUser
} from "../_constructor/UserValue";
import {
  AuthContextType,
  defaultErro,
  ErroType,
  newLoginUser,
  newTaskType,
  NewTaskUpdateType,
  taskType,
  UserType,
} from "../_constructor/_Types";
import {
  usePathname,
  useRouter
} from "next/navigation";
import { parseCookies } from "nookies";


export const AuthContext = createContext({} as AuthContextType);
export const useAuthContext = () => useContext(AuthContext)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [userHeader, setUserHeader] = useState<UserType | null>(null);
  const [Ftasks, setFtasks] = useState<taskType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
  const isAuthenticated = !!user;
  const router = useRouter();
  const pathName = usePathname;

  useEffect(() => {
    async function localToken() {
      const { "TaskDefine-Token": token } = parseCookies();

      if (token) {
        const LocalUser: UserType | defaultErro | null = await getLogedLocal(
          token
        );

        if (LocalUser) {
          if ("id" in LocalUser) {
            setUserHeader(LocalUser);
          }
        }
      }
    }

    localToken();
  }, [pathName]);

  useEffect(() => {
    if (user !== null) {

      setLoading(false);

      async function setingTasks() {

        setLoadingTasks(true);
        const filtredTasks = await FilterTasksUser(user);

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

      if (LocalUser && "id" in LocalUser) {
        setUser(LocalUser);
        setUserHeader(LocalUser);
        setLoading(false);
        return LocalUser;
      } else {
        console.error('Erro: ', LocalUser)
      }
    }

    setLoading(false);
    return null;
  }

  async function singIn({ UserName, Password }: newLoginUser) {

    setLoading(true);
    const errors: ErroType[] = [];

    if (UserName === '' || Password === '') {
      setLoading(false)
      errors.push({ erroId: Date.now(), message: "Usuário e senha devem ser totalmente preenchidos" })
      return errors
    }

    const LogedUser: UserType | ErroType = await LoginUser({
      UserName,
      Password,
    });

    if ("id" in LogedUser) {

      setLoading(false);
      setUser(LogedUser);
      setUserHeader(LogedUser)

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
    id: number;
    UserName: string;
    Password: string;
    Email: string;
  }): Promise<ErroType[] | null> {
    setLoading(true);
    const errors: ErroType[] = [];

    if (
      !NewEdit.UserName ||
      !NewEdit.Email
    ) {
      setLoading(false)
      errors.push({
        erroId: Date.now(),
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
        erroId: Date.now(),
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
    setLoadingTasks(true);

    const errors: ErroType[] = [];
    const { Nome, Descricao, Priority, Status, TaskID } = newTask;

    if (Nome == null || Descricao == null) {
      setLoadingTasks(false)
      errors.push({
        erroId: Date.now(),
        message: "Todos os dados devem estar preenchidos",
      });
      return errors;
    }

    try {
      const fetchData = await fetch(
        `${process.env.API_URL}/user/task/${TaskID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Nome,
            Descricao,
            Priority: Priority,
            Status: Status,
          }),
        }
      );

      const data: string | null = await fetchData.json();

      if (!data) {

        setLoadingTasks(true)

        const filtredTasks = await FilterTasksUser(user);

        setFtasks(filtredTasks);

        setLoadingTasks(false)

        return null;

      } else {
        setLoadingTasks(false)
        errors.push({
          erroId: Date.now(),
          message: data,
        });
        return errors;
      }
    } catch (e) {
      setLoadingTasks(false)
      errors.push({
        erroId: Date.now(),
        message: "Erro ao buscar dados, tente novamente.",
      });
      console.error("Erros: ", e);
      return errors;
    }
  }

  async function createNewTask({ NewTask, User }:
    { NewTask: newTaskType, User: UserType | null }): Promise<ErroType[] | null> {

    const { Nome, Descricao, Priority, Status } = NewTask;

    const UserID = User?.id;
    const errors: ErroType[] = [];

    if (Nome === "" || Descricao === "") {
      setLoading(false);
      errors.push({ erroId: Date.now(), message: "Todos os dados devem estar preenchidos" });
      return errors;
    }

    try {
      const fetchData = await fetch(`${process.env.API_URL}/user/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Nome, Descricao, Priority, Status, UserID }),
      });

      const result: taskType | string = await fetchData.json();

      if (typeof result === 'object' && result !== null && 'id' in result) {

        setLoadingTasks(true);
        // if (Ftasks) {
        //   const newTasks = [
        //     ...Ftasks,
        //     result
        //   ]
        //   setFtasks(newTasks)
        // } else {
        //   setFtasks([result])
        // }
        const filtredTasks = await FilterTasksUser(User);
        if (filtredTasks) {
          setFtasks(filtredTasks);
        }
        setLoadingTasks(false);

        return null;
      } else {
        errors.push({ erroId: Date.now(), message: result });
      }
    } catch (e) {
      console.error("Erro ao tentar criar Task:", e);
      errors.push({ erroId: Date.now(), message: "Erro ao tentar criar Task:" });
    }
    return errors.length > 0 ? errors : null;
  }

  async function setingTasks(localLogin: UserType) {
    setLoadingTasks(true);

    const filtredTasks = await FilterTasksUser(localLogin);

    setFtasks(filtredTasks);
    setLoadingTasks(false);
    return filtredTasks
  }

  async function deleteTask(idTask: string) {
    setLoading(true)
    const errors: ErroType[] = [];
    try {
      if (user) {
        setUser({
          ...user,
          myTasks: user?.myTasks.filter((id) => id !== idTask)

        })
      } else {
        errors.push({ erroId: Date.now(), message: "Usuario nao esta logado" });
        return errors
      }

      const fetchData = await fetch(`${process.env.API_URL}/user/task/${idTask}`, {
        method: "DELETE",
        body: JSON.stringify({
          UserID: user.id
        }),
      });

      const result: string | null = await fetchData.json();
      if (!result) {
        const filtredTasks = await FilterTasksUser(user);
        if (filtredTasks) {
          setFtasks(filtredTasks);
        }
        return null
      } else {
        errors.push({ erroId: Date.now(), message: result });
        return errors
      }
    } catch (err) {
      console.error('Erro: ', err)
      errors.push({ erroId: Date.now(), message: 'Erro ao em fetch para deletetar task' })
      return errors
    }
  }

  return (
    <AuthContext.Provider
      value={{
        singIn,
        loading,
        user,
        isAuthenticated,
        userHeader,
        Ftasks,
        loadingTasks,
        getLoginUser,
        LogginOutUser,
        EditUserhamdle,
        UpdateTask,
        createNewTask,
        setingTasks,
        deleteTask
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

