'use server'

import { EditUser, LogoutLocalUser } from "@/app/_constructor/UserValue";

export default async function EditUserhamdle(NewEdit: {
    ID: number;
    UserName: string;
    Password: string,
    Email: string,
  }){
    let retorno = false
    if(NewEdit.UserName == null || NewEdit.Password == null || NewEdit.Email == null){
      return retorno
    }
    try{
      const result = await EditUser(NewEdit)
      if(result){
        console.log('Resultado editUserH: ', result)
        
        const logOut = await LogoutLocalUser()
        console.log('Logout: ',logOut)

        retorno = true
        console.log('Retornou em editUserH')
      }
    }catch(e){
      console.error('Error: ', e)
      return retorno
    }finally{
      console.log('Finally')
      console.log('Retorno: ', retorno)
      return retorno
    }
    
}