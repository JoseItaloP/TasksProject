'use server'
import { dropCookes } from "./cookiesWork";
import { cookies } from "next/headers";


import { newLoginUser, NewUserData, UserType } from "./_Types";
// import { tasksValues } from "./_Tasks/TasksConst";
// import { headers } from "next/headers";

let User: UserType = {
  ID: -1,
  UserName: "Guest",
  Password: "",
  Token: "",
  Email: "",
  created_at: new Date(),
  my_tasks: [],
};

async function LoginUser( NewUser: newLoginUser): Promise<UserType | null> {
  const {userName, password} = NewUser;

    const response = await fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const result: UserType[] = await response.json();
    
    const logedUser = result.find(
      (user) => user.UserName === userName && user.Password === password
    );

    if(logedUser){
      const cookieStore = await cookies()
      cookieStore.set('UserID', `${logedUser.ID}`,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/"
      })

      User = logedUser
      return logedUser

    } else {
      return null
    }
}

async function LoginUserID(userID: string): Promise<UserType> {
  try {
    const methods = {
      method: "GET",
      headers: {
        "Content-Types": "application/json",
      },
    };
    const res = await fetch("http://localhost:3000/user", methods);

    const data: UserType[] = await res.json();

    const logedUser = data.find((user) => user.ID === Number(userID));

    User = logedUser || User;
  } catch (e) {
    console.error(e);
  } finally {
    return User;
  }
}

async function getLogedLocal() {

  const cookStore = await cookies();

  const UserID: {
        name: string,
        value: string
  } = cookStore.get("UserID") || {
        name: '',
        value:''
  };

  User = (await LoginUserID(UserID.value)) || {
    ID: -1,
    Nome: "Guest",
    Password: "",
    Token: "",
    my_tasks: [],
    created_at: new Date(),
  };

  return User;
}


async function LogoutLocalUser() {
  User = {
    ID: -1,
    UserName: "Guest",
    Password: "",
    Token: "",
    Email: "",
    created_at: new Date(),
    my_tasks: [],
  };
  const dropedC = await dropCookes();
  if(dropedC){
    console.log('DropedC: ', dropedC)
    return true
  }
}

async function ReturnUser() {
  
  return User;
}

async function RegistratUser(NewUser: NewUserData){

  const {Username, Email} = NewUser
  try{
    
    const methods = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        Username: Username,
        Email: Email,
      })
    };
    
    const res = await fetch("http://localhost:3000/user", methods);

    console.log('response: ', res.status)

    if(res.status == 500){
      return 500
    }else if(res.status == 200){
      return 200
    }else{
      return 0
    }

  }catch(e){
    console.error('Erro: ',e)
  }
}

async function EditUser(NewEdit: {
  ID: number;
  UserName: string;
  Password: string,
  Email: string,
}){ 
  let retorno = false
  try{
    const res = await fetch(`http://localhost:3000/user/${NewEdit.ID}`,{
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: NewEdit.UserName,
        Password: NewEdit.Password,
        Email: NewEdit.Email
      })
    })
    const data = await res.json()
    if (data){
      retorno = true
    }
  }catch(e){
    console.error(e)
  }finally{
    return retorno
  }

}

export {
  LoginUser,
  getLogedLocal,
  LoginUserID,
  LogoutLocalUser,
  ReturnUser,
  RegistratUser,
  EditUser
};
