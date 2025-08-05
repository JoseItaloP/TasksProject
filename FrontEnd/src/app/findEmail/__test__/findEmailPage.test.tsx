import { render, screen, waitFor } from "@testing-library/react"
import FindEmail from "../page"
import userEvent from "@testing-library/user-event"
import ExitHamdler from "@/app/helper/ExitHamdler"
import * as MockEmail from "../__mocks__/mockEmailHandler.mock"
import exportValues from "@/__mocks__/mockReturnErro"

jest.mock('next/navigation', ()=>({
    useRouter: jest.fn()
}))

describe('EmailHandler Page test', ()=>{
    it("should get successfuly the Email",async ()=>{
        const SpyOnHandler = jest.spyOn(ExitHamdler, 'EmailHamdler').mockImplementation(MockEmail.default)
        render(<FindEmail/>)
        const UserHandler = screen.getByRole("textbox", {name: 'Forneça o nome de Usuário para continuar'})
        const BttHandler = screen.getByRole("button", {name: 'Resgatar Email'})

        expect(UserHandler).toBeInTheDocument()
        expect(BttHandler).toBeInTheDocument()

       await userEvent.type(UserHandler, 'UserName')
       await userEvent.click(BttHandler)
        
      await waitFor(()=>{
        expect(SpyOnHandler).toHaveBeenCalledWith('UserName')
      })

      const H1Email = screen.getByRole("heading", {name: 'Seu Email é UserName@email.com'})
      expect(H1Email).toBeInTheDocument()
    })

    it("should return a erro on Email", async ()=>{
        jest.spyOn(ExitHamdler, 'EmailHamdler').mockImplementation(MockEmail.default)
        const errSpy = jest.spyOn(exportValues, 'mockErrFunc')
        render(<FindEmail/>)

        const UserHandler = screen.getByRole("textbox", {name: 'Forneça o nome de Usuário para continuar'})
        const BttHandler = screen.getByRole("button", {name: 'Resgatar Email'})

       await userEvent.type(UserHandler, 'User')
       await userEvent.click(BttHandler)

        await waitFor(()=>{
            expect(errSpy).toHaveBeenCalledWith({ erroId: 1, message: `Falha em encontrar o usuario de Email` })
        })
        
    })
})