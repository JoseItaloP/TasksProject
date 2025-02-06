
import { ErroType } from "../_constructor/_Types";

export default async function PassHamdler (Email: string): Promise<ErroType[] | null | boolean> {
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

