import { ErroType, UserType } from "../_constructor/_Types"
import NewUserResgistrat from "./_NewUserResgistrat"

async function EmailHamdler (UserName: string): Promise<ErroType[] | null | string> {
    const Erros: ErroType[] = []
    try{
        const methods = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                UserName: UserName
            })
        }
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/findEmail`,methods)
        const data: UserType = await response.json()

        if(data){
            return data.Email
        }else{
            return null
        }
    }catch(e){
        Erros.push({id: Date.now(), message:`${e}`})
        return Erros
    }
}

async function PassHamdler (Email: string): Promise<ErroType[] | null | boolean> {
    const Erros: ErroType[] = []
    try{
        const methods = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                Email: Email
            })
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/findPas`,methods)

        const data: boolean = await response.json();
        
        if(data){
            return true
        }else{
            return null
        }
    }catch(e){
        Erros.push({id: Date.now(), message:`${e}`})
        return Erros
    }
}

const ExitHamdler = {
    EmailHamdler,
    PassHamdler,
    NewUserResgistrat
}

export default ExitHamdler