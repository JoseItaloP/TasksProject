import   {ErroType, newLoginUser, newTaskType, NewTaskUpdateType, taskType, UserType}  from "@/app/_constructor/_Types";
import exportValues from "./mockReturnErro";

    let loading: boolean = true
    const loadingTasks: boolean = false
    let user: UserType | null = null
    const userHeader: UserType | null = null
    const isAuthenticated: boolean = !!user
    let Ftasks: taskType[] | null = null
    let allTasks: taskType[] = [
       {
    ID: 1,
    Nome: "Planejar reunião da equipe",
    Descricao: "Preparar agenda e slides para a reunião semanal.",
    Status: "Pendente",
    Priority: "Alta",
    created_at: new Date("2025-07-01T09:00:00Z"),
  },
  {
    ID: 2,
    Nome: "Desenvolver nova feature de login",
    Descricao: "Implementar autenticação OAuth com Google.",
    Status: "Em Progresso",
    Priority: "Alta",
    created_at: new Date("2025-06-28T14:30:00Z"),
    updated_at: new Date("2025-07-02T10:15:00Z"),
  },
  {
    ID: 3,
    Nome: "Revisar código do módulo de relatórios",
    Descricao: "Verificar bugs e otimizações de performance.",
    Status: "Revisão",
    Priority: "Média",
    created_at: new Date("2025-07-02T11:00:00Z"),
  },
  {
    ID: 4,
    Nome: "Atualizar documentação da API",
    Descricao: "Adicionar exemplos de uso para os novos endpoints.",
    Status: "Pendente",
    Priority: "Baixa",
    created_at: new Date("2025-06-25T16:00:00Z"),
  },
  {
    ID: 5,
    Nome: "Corrigir bug de exibição no mobile",
    Descricao: "Ajustar layout da página de perfil em dispositivos móveis.",
    Status: "Em Progresso",
    Priority: "Alta",
    created_at: new Date("2025-07-03T08:30:00Z"),
  },
  {
    ID: 6,
    Nome: "Pesquisar ferramentas de monitoramento",
    Descricao: "Avaliar opções para monitoramento de performance de aplicações.",
    Status: "Pendente",
    Priority: "Média",
    created_at: new Date("2025-07-01T10:45:00Z"),
  },
    ]

    const filterTasksFromUser = (userToGetTasks: UserType) => {
        const newTasks: taskType[] = allTasks.filter(task => userToGetTasks.my_tasks.includes(task.ID) )
        return newTasks
    }

 const singIn = async ({ UserName, Password }: newLoginUser) => {
  loading = true
 if (UserName === "User" && Password === "Pass") {
        const returnErr = exportValues.mockErrFunc({ id: 1, message: 'Erro ao tentar fazer login' });
        loading = false
        return returnErr
    }
    if (UserName === "UserName" && Password === "Password") {
      loading = false
        return 
    }
}

async function getLoginUser() {
    
    //pegar o usuario dos cookies
  loading = true
    if (user) {
      Ftasks = filterTasksFromUser(user)
      loading = false
        return user
    }
    else{
        user = {
        UserName: "UserName",
        Password: "Password",
        Email: "Email@email.com",
        ID: 1,
        created_at: new Date,
        my_tasks: [1,3,5],
        Token: '000000'
    }
     Ftasks =  filterTasksFromUser(user)
    loading = false
    return user
    }
  }

  async function LogginOutUser() {
    //Logout dos cookies
    user = null
    return true
  }

  async function EditUserhamdle(NewEdit: {
    ID: number;
    UserName: string;
    Password: string;
    Email: string;
  }): Promise<ErroType[] | null> {
    
    const errors: ErroType[] = [];
    const {ID, UserName, Password, Email} = NewEdit
    if (
      UserName.length == 0 ||
      Email.length == 0
    ) {
      errors.push({
        id: 1,
        message: "Todos os dados devem estar preenchidos.",
      });
      exportValues.mockErrFunc({
        id: 1,
        message: "Todos os dados devem estar preenchidos.",
      })
      return errors;
    }

    if(user){
      user = {
        ...user,
        UserName,
        Password,
        Email,
        ID,
      }
      return null
    }else{
    errors.push({
        id: 1,
        message: "Usuario não esta logado.",
      });
      exportValues.mockErrFunc({
        id: 1,
        message: "Usuario não esta logado.",
      })
      return errors;
    }
  }

  async function UpdateTask(
    newTask: NewTaskUpdateType
  ): Promise<ErroType[] | null> {
    const errors: ErroType[] = [];
    const { Name, Descrição, Priority, Status, TaskID } = newTask;

    if (Name == null || Descrição == null) {
      errors.push({
        id: 1,
        message: "Todos os dados devem estar preenchidos",
      });
      exportValues.mockErrFunc({
        id: 1,
        message: "Todos os dados devem estar preenchidos",
      })
      return errors;
    }
    if(Ftasks && user){
        const tasksFilter = allTasks.map((task)=>{
            if(task.ID == TaskID){
                if(Priority==null ||  Status==null){
                return {...task, Nome: Name, Descricao: Descrição}

                }
                return {...task, Nome: Name, Descricao: Descrição, Priority, Status}
            }
            return task
        })
        allTasks = tasksFilter
        Ftasks = filterTasksFromUser(user)
        return null
    }
    errors.push({id: 1, message:" Sem um conjunto de Tasks no sistema | erro em tasks"})
    exportValues.mockErrFunc({id: 1, message:" Sem um conjunto de Tasks no sistema | erro em tasks"})
    return errors
  }

  
  async function createNewTask({NewTask, User}: 
    {NewTask: newTaskType, User: UserType }): Promise<ErroType[] | null> {

    const { Name, Descrição } = NewTask;

    const errors: ErroType[] = [];
  
    if (Name === "" || Descrição === "" || User) {
      
      errors.push({ id: 1, message: "Todos os dados devem estar preenchidos" });
      exportValues.mockErrFunc({ id: 1, message: "Todos os dados devem estar preenchidos" })
      return errors;
    }

      if(Ftasks && User && user){
        const newTask: taskType = {
            ...NewTask,
            ID: Ftasks.length+1,
            created_at: new Date(),
            Nome: Name,
            Descricao: Descrição
        }
        allTasks.push(newTask)
        user.my_tasks.push(newTask.ID)
        Ftasks = filterTasksFromUser(user)
      }

    errors.push({ id: 1, message: "Erro - falta de tasks ou usuario" });
    exportValues.mockErrFunc({ id: 1, message: "Erro - falta de tasks ou usuario" })
    return errors
  }

async function setingTasks(localLogin: UserType) {

    const filtredTasks = filterTasksFromUser(localLogin);

    Ftasks = filtredTasks
    return filtredTasks
  }

const mockValue = {
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
}
 export default mockValue