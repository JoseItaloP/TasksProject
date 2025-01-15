'use server'
import { NewUserData } from "../_constructor/_Types";
import { RegistratUser } from "../_constructor/UserValue";

export default async function NewUserResgistrat (NewUser: NewUserData): Promise<boolean> {
    const responce = await RegistratUser(NewUser);
    if(responce){
        return true
    }else{
        return false
    }
}
