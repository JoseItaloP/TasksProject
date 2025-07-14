import { ErroType } from "@/app/_constructor/_Types"
import exportValues from "@/__mocks__/mockReturnErro"

export default async function EmailHamdler (UserName: string): Promise<ErroType[] | null | string> {
    const Erros: ErroType[] = []
    if(UserName == 'UserName'){
        return 'UserName@email.com'
    }else{
        Erros.push({id: 1, message:`Falha em encontrar o usuario de Email`})
        exportValues.mockErrFunc({id: 1, message:`Falha em encontrar o usuario de Email`})
        return Erros
    }
    
}
