'use server'

import { ErroType } from "@/app/_constructor/_Types";
import { EditUser, LogoutLocalUser } from "@/app/_constructor/UserValue";

export default async function EditUserhamdle(NewEdit: {
    ID: number;
    UserName: string;
    Password: string,
    Email: string,
  }): Promise<ErroType[] | null>{

    const errors: ErroType[] = [];
    if(NewEdit.UserName.length == 0 || NewEdit.Password.length == 0 || NewEdit.Email.length == 0){
      errors.push({id: Date.now(), message: "Todos os dados devem estar preenchidos."})
      return errors

    }
    try{

      const result = await EditUser(NewEdit)

      if(result){
        await LogoutLocalUser()
      }
    }catch(e){

      console.error('Error: ', e)
      errors.push({id: Date.now(), message: "Algo de errado ocorreu, cheque o console."})
      return errors

    }finally{

      return null

    }
    
}