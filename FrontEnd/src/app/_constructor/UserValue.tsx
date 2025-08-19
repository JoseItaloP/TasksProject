"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import {
  defaultErro,
  ErroType,
  newLoginUser,
  NewUserData,
  taskType,
  UserType,
} from "./_Types";
let User: UserType | defaultErro | null = null;

type JwtPayLoad = {
  id: string;
  TokenUser: string;
};

async function LoginUser({
  UserName,
  Password,
}: newLoginUser): Promise<UserType | ErroType> {
  try {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserName: UserName,
      Password: Password,
    }),
  });

    const result: UserType | string | null = await response.json();

    if (typeof (result) == 'string') {
    const erro = {
      erroId: Date.now(),
      message: result,
    };
    return erro;
    } else if (result !== null) {
      const jwtPass = process.env.JWT_PASS ?? "minha-senha";

    const token = jwt.sign(
      { id: result.id, TokenUser: result.Token },
      jwtPass,
      { expiresIn: "1h" }
    );

    const cookieStore = await cookies();

    cookieStore.set("TaskDefine-Token", token, { maxAge: 60 * 60 });

    User = result;
    return result;
    } else {
      const erro = {
        erroId: Date.now(),
        message: "Falha em se comunicar com bancode dados.",
      };
      return erro;
    }
  } catch (e) {
    console.error('Erro: ', e)
    const erro = {
      erroId: Date.now(),
      message: "Falha em se comunicar com bancode dados.",
    };
    return erro;
  }
}

async function getLogedLocal(token: string) {
  try {
    const jwtPass = process.env.JWT_PASS ?? "minha-senha";


    if (token) {
      const { id, TokenUser } = jwt.verify(token, jwtPass) as JwtPayLoad;

      const methods = {
        method: "GET",
        headers: {
          "Content-Types": "application/json",
          Authorization: `${TokenUser}`,
        },
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, methods);

      const data: UserType | defaultErro = await res.json();

      User = data;
    }
  } catch (e) {
    console.error(e);
  } finally {
    return User;
  }
}

async function LogoutLocalUser() {
  User = {
    id: -1,
    UserName: "Guest",
    Password: "",
    Token: "",
    Email: "",
    createdAt: new Date(),
    myTasks: [],
  };
  const cookStore = await cookies();
  cookStore.delete("TaskDefine-Token");
  return true;
}

async function RegistratUser(NewUser: NewUserData) {
  const { UserName, Email } = NewUser;

  try {
    const methods = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserName,
        Email,
      }),
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, methods);

    if (res.status == 500) {
      return 500;
    } else if (res.status == 201) {
      return 201;
    } else {
      return 0;
    }
  } catch (e) {
    console.error("Erro: ", e);
  }
}

async function EditUser(NewEdit: {
  id: number;
  UserName: string;
  Password: string;
  Email: string;
}) {
  let retorno = false;
  const { UserName, Email, Password, id } = NewEdit
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserName,
        Password,
        Email
      }),
    });
    const data: boolean = await res.json();
    if (data) {
      retorno = true;
    }
  } catch (e) {
    console.error(e);
  } finally {
    return retorno;
  }
}

async function FilterTasksUser(user: UserType | null) {
  const User: UserType | null = user;

  if (User) {
    const IDuSER = User.id;

    try {
      const methods = {
        method: "GET",
        headers: {
          "Content-Types": "application/json",
        },
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/task/${IDuSER}`,
        methods
      );
      const data: taskType[] = await res.json();

      return data;

    } catch (e) {
      console.error(e);
      return [];
    }
  } else {
    return [];
  }
}

export {
  LoginUser,
  getLogedLocal,
  LogoutLocalUser,
  RegistratUser,
  EditUser,
  FilterTasksUser,
};
