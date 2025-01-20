'use server'

import { LogoutLocalUser } from "../../UserValue";

export default async function LogginOutUser(){
   const LogOut = await LogoutLocalUser();
   if(LogOut){
    return true
   }else{
    return false
   }
}