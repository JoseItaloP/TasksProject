
import exportValues from "@/__mocks__/mockReturnErro";
import { ErroType, NewUserData } from "@/app/_constructor/_Types";

export default async function NewUserResgistrat(NewUser: NewUserData): Promise<ErroType[] | null> {
    const { Username, Email, ConfEmail } = NewUser
    const erros: ErroType[] = []
    if (Email == "user@email.com" && ConfEmail == "user@email.com") {
        if (Username == "Username") {
            return null
        } else {
            erros.push({ id: 1, message: "UserName nao registrado" })
            exportValues.mockErrFunc({ id: 1, message: "UserName nao registrado" });
            return erros;
        }
    } else {

        erros.push({ id: 1, message: "Emails diferentes" })
        exportValues.mockErrFunc({ id: 1, message: "Emails diferentes" });

        return erros
    }
}

