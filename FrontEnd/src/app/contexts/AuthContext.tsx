import { createContext, useEffect, useState } from "react";
import { getLogedLocal, LoginUser } from "../_constructor/UserValue";
import {
  defaultErro,
  ErroType,
  newLoginUser,
  taskType,
  UserType,
} from "../_constructor/_Types";
import { usePathname, useRouter } from "next/navigation";
import { parseCookies } from "nookies";
// import { FilterTasksUser } from "../_constructor/TaskValue";

async function FilterTasksUser(user: UserType | null) {
  const User: UserType | null = user;

  if (User) {
    const UserTasks = User.my_tasks;
    let filtredTasksUser: taskType[] = [];

    try {
      const methods = {
        method: "GET",
        headers: {
          "Content-Types": "application/json",
        },
      };

      const res = await fetch("http://localhost:3000/user/task", methods);

      const data: taskType[] = await res.json();
      console.log("Data: ", data);
      if (UserTasks) {
        filtredTasksUser = data.filter((task) => UserTasks.includes(task.ID));
      }
    } catch (e) {
      console.error(e);
    } finally {
      return filtredTasksUser;
    }
  } else {
    return [];
  }
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  Ftasks: taskType[] | null;
  loading: boolean;
  singIn: (data: newLoginUser) => Promise<ErroType[] | void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [Ftasks, setFtasks] = useState<taskType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isAuthenticated = !!user;
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    async function localToken() {
      const { "TaskDefine-Token": token } = parseCookies();

      if (token != undefined) {
        const LocalUser: UserType | defaultErro | null = await getLogedLocal(
          token
        );

        if (LocalUser) {
          if ("ID" in LocalUser) {
            setUser(LocalUser);
          }
        } else {
          setUser(null);
        }
      }
    }

    localToken();
  }, [pathName]);

  useEffect(() => {
    setLoading(true);
    async function setingTasks() {
      const filtredTasks = await FilterTasksUser(user);
      if (filtredTasks.length > 0) {
        setFtasks(filtredTasks);
      }
      setLoading(false);
    }
    setingTasks();
  }, [user]);

  async function singIn({ UserName, Password }: newLoginUser) {
    const LogedUser: UserType | ErroType = await LoginUser({
      UserName,
      Password,
    });

    const errors: ErroType[] = [];

    if ("ID" in LogedUser) {
      setUser(LogedUser);
      router.refresh();
      router.push("/User");
    } else {
      errors.push(LogedUser);
      return errors;
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, Ftasks, loading, singIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
