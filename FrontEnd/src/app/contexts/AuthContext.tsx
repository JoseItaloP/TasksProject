import { createContext, useEffect, useState } from "react";
import { getLogedLocal, LoginUser } from "../_constructor/UserValue";
import { defaultErro, newLoginUser, taskType, UserType } from "../_constructor/_Types";
import { useRouter } from "next/navigation";
// import { FilterTasksUser } from "../_constructor/TaskValue";

async function FilterTasksUser(user: UserType | null) {
  
    const User: UserType | null = user

    if(User){
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
        console.log('Data: ', data)
        if(UserTasks){
          filtredTasksUser = data.filter((task) => UserTasks.includes(task.ID));
        }
    
      } catch (e) {
        console.error(e);
      } finally {
        return filtredTasksUser;
      }
      }else{
        return null
      }
  
    
  }

type AuthContextType = {
    isAuthenticated: boolean;
    user: UserType | null;
    Ftasks: taskType[] | null;
    loading: boolean;
    singIn: (data: newLoginUser)=>Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: {
    children: React.ReactNode;
  }){
    const [user, setUser] = useState<UserType | null>(null)
    const [Ftasks, setFtasks] = useState<taskType[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const isAuthenticated = !!user;
    const router = useRouter()

    useEffect(()=>{

        async function localToken(){
            const LocalUser: UserType | defaultErro | null = await getLogedLocal()
            console.log('Retorno LocalUser: ', LocalUser)
            if(LocalUser){
              console.log('Local user1: ', LocalUser)
              if('ID' in LocalUser){
              console.log('Local user2: ', LocalUser)
                setUser(LocalUser)
              }
            }else{
                setUser(null)
            }
        }

        localToken();

    }, [])

    useEffect(()=>{
        setLoading(true)
        async function setingTasks(){
            const filtredTasks = await FilterTasksUser(user)
            setFtasks(filtredTasks)
            setLoading(false)
        }
        setingTasks()
    }, [user])

    async function singIn({UserName, Password}: newLoginUser){
        const LogedUser: UserType | null = await LoginUser({UserName, Password});
        setUser(LogedUser)
        router.refresh()
        router.push('/User')
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, user, Ftasks, loading, singIn}}>
            {children}
        </AuthContext.Provider>
    )
}