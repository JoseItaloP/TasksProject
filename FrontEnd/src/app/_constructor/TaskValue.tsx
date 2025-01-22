'use server'
import { ErroType, newTaskType, NewTaskUpdateType, taskType, UserType } from "./_Types";
import { getCooks } from "./cookiesWork";
import { getLogedLocal, LoginUserID } from "./UserValue";

async function GetUserData(): Promise<UserType>{
    const UserID: {
        name: string;
        value: string;
      } = await getCooks();
    
      const User: UserType = (await LoginUserID(UserID.value)) || {
        ID: -1,
        UserName: "Guest",
        Password: "",
        Email: "",
        Token: "",
        my_tasks: [],
        created_at: new Date(),
      };
    return User
}

async function FilterTasksUser() {
  
    const User: UserType = await GetUserData()
  
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
  }

  async function getTask(TId: number): Promise<taskType | null> {
    const tasksUser = await FilterTasksUser()

    
    const taskFind = tasksUser.find((task)=>task.ID == TId)
    
    console.log('ID Task: ', TId)
    console.log('tasks User: ', tasksUser)
    console.log('Task Find: ', taskFind)

    if(taskFind){
        return taskFind
    }else{
        return null
    }
  }

async function createNewTask(newTask: newTaskType): Promise<ErroType[] | null>{
    const {Name,Descrição,Priority,Status } = newTask
    const UserID = await getLogedLocal()
    const errors: ErroType[] = [];
    try{
        const fetchData = await fetch('http://localhost:3000/user/task',{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Name: Name,
                Descrição: Descrição,
                Priority: Priority,
                Status: Status,
                UserID: UserID.ID
            })
        })
        const result = await fetchData.json()
        if(result){
            return null
        }else{
            errors.push({ id: Date.now(), message: "Erro ao criar Task." });
        }

    }catch(e){
        console.error("Erro ao tentar criar Task:", e);
        errors.push({ id: Date.now(), message: "Erro ao tentar criar Task." });
    }
    return errors.length > 0 ? errors : null;
}

async function UpdateTask(newTask: NewTaskUpdateType): Promise<ErroType[] | null>{
  const errors: ErroType[] = [];
  const {Name, Descrição, Priority, Status, TaskID} = newTask
  if(Name.length == 0){
    errors.push({id: Date.now(), message:'Todos os dados devem estar preenchidos'})
    return errors
  }
  try{
    const fetchData = await fetch(`http://localhost:3000/user/task/${TaskID}`,
      {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Name: Name, 
          Descrição: Descrição,
          Priority:Priority,
          Status: Status
        })
      }
    )
  const data = await fetchData.json()
  if(data){
    return null
  }else{
    errors.push({id: Date.now(), message:'Erro ao buscar dados, tente novamente.'})
    return errors
  }
  }catch(e){
    errors.push({id: Date.now(), message:'Erro ao buscar dados, tente novamente.'})
    console.error('Erros: ', e)
    return errors
  }

}

export {
    FilterTasksUser,
    createNewTask,
    getTask,
    UpdateTask
}