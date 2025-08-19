import { ErroType } from "../_constructor/_Types"
import NewUserResgistrat from "./_NewUserResgistrat"

async function EmailHamdler(UserName: string): Promise<ErroType[] | string> {
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
        
        const response = await fetch(`${process.env.API_URL}/user/findEmail`, methods)
        const data: string = await response.json()

        if (response.status == 200) {
            return data
        }else{
            Erros.push({ erroId: Date.now(), message: data })
            return Erros
        }
    }catch(e){
        console.error('Erro: ', e)
        Erros.push({ erroId: Date.now(), message: 'Falha ao se comunicar com servidor' })
        return Erros
    }
}

async function PassHamdler(Email: string): Promise<ErroType[] | boolean> {
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

        switch (response.status) {
            case 200:
                return true
               break;
           case 400:
               Erros.push({ erroId: Date.now(), message: 'Usuario não foi encontrado.' })
               return Erros
               break;
           case 500:
               Erros.push({ erroId: Date.now(), message: 'Falha ao se comunicar com servidor/Banco de dados.' })
               return Erros
               break;
           default:
               Erros.push({ erroId: Date.now(), message: 'Erro inesperado.' })
               return Erros
        }
    }catch(e){
        console.error('Erro: ', e)
        Erros.push({ erroId: Date.now(), message: 'Falha ao se comunicar com servidor/Banco de dados.' })
        return Erros
    }
}

const ExitHamdler = {
    EmailHamdler,
    PassHamdler,
    NewUserResgistrat
}

export default ExitHamdler