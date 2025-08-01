import exportValues from "@/__mocks__/mockReturnErro";
import { ErroType } from "@/app/_constructor/_Types";


export default async function PassHamdler (Email: string): Promise<ErroType[] | null | boolean> {
    const Erros: ErroType[] = []
    if(Email == 'userEmail@email.com'){
        return true
    }
    else{
        Erros.push({ erroId: 1, message: "Erro de Email ao resgate de senha" })
        exportValues.mockErrFunc({ erroId: 1, message: "Erro de Email ao resgate de senha" })
        return Erros
    }
}