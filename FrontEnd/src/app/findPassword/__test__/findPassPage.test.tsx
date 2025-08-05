import { render, screen, waitFor } from "@testing-library/react"
import FindPassword from "../page"
import userEvent from "@testing-library/user-event"
import ExitHamdler from "@/app/helper/ExitHamdler"
import PassHamdler from "../__mocks__/mockPassHamdler.mock"
import * as navigation from "next/navigation"
import exportValues from "@/__mocks__/mockReturnErro"

jest.mock('next/navigation', ()=>({
    useRouter: jest.fn(),
    usePathname: jest.fn().mockReturnValue('/')
}))

describe('FindPassword Page test', ()=>{
    it("should get successfuly the password",async ()=>{
       const spyJest = jest.spyOn(ExitHamdler, 'PassHamdler').mockImplementation(PassHamdler)
        const mockPush = jest.fn()
        jest.spyOn(navigation, 'useRouter').mockReturnValue({replace: mockPush})
        render(<FindPassword/>)

        const UserMailHamdler = screen.getByRole('textbox', {name: 'Forneça o seu Email para continuar'})
        const BttHamdler = screen.getByRole('button', {name: "Resgatar Senha"})

        await userEvent.type(UserMailHamdler, 'userEmail@email.com')
        await userEvent.click(BttHamdler)

        await waitFor(()=>{
            expect(spyJest).toHaveBeenCalledWith('userEmail@email.com')
        })

        expect(screen.getByRole("heading", {name: 'A sua senha foi restaurada, verifique seu Email para adquirir a nova senha!'})).toBeInTheDocument()
        const BttBackHamdler = screen.getByRole("button", {name: 'Voltar para Login!'})
        expect(BttBackHamdler).toBeInTheDocument()
        await userEvent.click(BttBackHamdler)
        expect(mockPush).toHaveBeenCalledWith('/Login')
        
    })

    it("should return a erro on the Password Email", async ()=>{
        jest.spyOn(ExitHamdler, 'PassHamdler').mockImplementation(PassHamdler)
        const spyJest = jest.spyOn(exportValues, 'mockErrFunc')
        
        render(<FindPassword/>)

        const UserMailHamdler = screen.getByRole('textbox', {name: 'Forneça o seu Email para continuar'})
        const BttHamdler = screen.getByRole('button', {name: "Resgatar Senha"})

        await userEvent.type(UserMailHamdler, 'userEmail2@email.com')
        await userEvent.click(BttHamdler)

        await waitFor(()=>{
            expect(spyJest).toHaveBeenCalledWith({ erroId: 1, message: "Erro de Email ao resgate de senha" })
        })

        expect(screen.getByTestId('erroMessage')).toBeInTheDocument()
        expect(screen.getByTestId('erroMessage')).toHaveTextContent("Erro de Email ao resgate de senha")
    })
})