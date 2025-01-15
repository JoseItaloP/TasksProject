
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
  return await dropCookes();
}

async function ReturnUser() {
  
  return User;
}

async function RegistratUser(NewUser: NewUserData){
  let staty: boolean = false
  const {Username, Password, Email} = NewUser
  try{
    
    const methods = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        Username: Username,
        Password: Password,
        Email: Email,
      })
    };
    
    const res = await fetch("http://localhost:3000/user", methods);

    const data = await res.json();
    if(data.Email === Email){
      staty = true
    }

  }catch(e){
    staty = false
    console.error('Erro: ',e)
  }finally{
    return staty
  }
}

export {
  LoginUser,
  getLogedLocal,
  LoginUserID,
  LogoutLocalUser,
  ReturnUser,
  RegistratUser
};
