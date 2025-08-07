'use server'
import { ErroType, NewUserData } from "../_constructor/_Types";
import { RegistratUser } from "../_constructor/UserValue";

export default async function NewUserResgistrat(NewUser: NewUserData): Promise<ErroType[] | null> {
    const errors: ErroType[] = [];
    if (NewUser.Email === NewUser.ConfEmail) {
        const responce = await RegistratUser(NewUser);
        
        if (responce == 201) {
            return null
        }else if(responce == 500){
            errors.push({ erroId: Date.now(), message: "Usuario ou Email já cadastrados." });
            return errors;
        }else{
            errors.push({ erroId: Date.now(), message: "Algum erro ocorreu." });
            return errors;
        }
    }else{
        errors.push({ erroId: Date.now(), message: "Os Emails devem ser iguais" });
        return errors;
    }
    }

