"use server";

import { LoginUser } from "../_constructor/UserValue";
import { ErroType, newLoginUser } from "../_constructor/_Types";

export async function loginAction(
  NewUser: newLoginUser
): Promise<ErroType[] | null> {
  const { UserName, Password } = NewUser;
  const errors: ErroType[] = [];

  if (!UserName || !Password) {
    errors.push({ id: Date.now(), message: "Preencha corretamente os dados." });
    return errors;
  }

  try {
    
    const result = await LoginUser(NewUser);
    if(result){
      return null; 
    }else {
      errors.push({ id: Date.now(), message: "Usuário ou senha inválidos." });
    }
  } catch (e) {
    console.error("Erro na função loginAction:", e);
    errors.push({ id: Date.now(), message: "Erro ao fazer login. Tente novamente." });
  }

  return errors.length > 0 ? errors : null;
}
