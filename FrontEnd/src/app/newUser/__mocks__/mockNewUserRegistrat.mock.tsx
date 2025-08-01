
import exportValues from "@/__mocks__/mockReturnErro";
import { ErroType, NewUserData } from "@/app/_constructor/_Types";

export default async function NewUserResgistrat(NewUser: NewUserData): Promise<ErroType[] | null> {
    const { UserName, Email, ConfEmail } = NewUser
    const erros: ErroType[] = []
    if (Email == "user@email.com" && ConfEmail == "user@email.com") {
        if (UserName == "Username") {
            return null
        } else {
            erros.push({ erroId: 1, message: "UserName nao registrado" })
            exportValues.mockErrFunc({ erroId: 1, message: "UserName nao registrado" });
            return erros;
        }
    } else {

        erros.push({ erroId: 1, message: "Emails diferentes" })
        exportValues.mockErrFunc({ erroId: 1, message: "Emails diferentes" });

        return erros
    }
}

