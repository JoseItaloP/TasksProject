import { ErroType, UserType } from "../_constructor/_Types";


export default async function EmailHamdler (UserName: string): Promise<ErroType[] | null | string> {
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
        const response = await fetch(`${process.env.API_URL}/user/findEmail`,methods)
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

