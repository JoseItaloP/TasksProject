import { render, screen, waitFor } from "@testing-library/react"
import Login from "../page"
import userEvent from "@testing-library/user-event"
import MockAuthProvider from "../../../__mocks__/MockAuthProvider"
import  * as mockValue from "../../../__mocks__/mockValues"
import * as exportValues from "../../../__mocks__/mockReturnErro"
import * as navigation from "next/navigation"

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn().mockReturnValue('/')
    
}))

describe("Login Page Tester", () => {

    beforeEach(() => {
        jest.restoreAllMocks()

    })
    
    it("should render Login correctly", () => {
        render(<Login />)
        const LoginName = screen.getByText("Login")
        expect(LoginName).toBeInTheDocument()
    })

    it("should make a login successfuly", async () => {
        jest.spyOn(mockValue.default, 'singIn')

        render(
            <MockAuthProvider>
                <Login />
            </MockAuthProvider>
        )
        const bttClick = screen.getByRole("button", { name: 'Enviar' })
        const UserNameIndex = screen.getByRole("textbox", { name: 'Username:' })
        const PasswordIndex = screen.getByTestId("passwordLogin")

        await userEvent.type(UserNameIndex, "UserName")
        await userEvent.type(PasswordIndex, "Password")

        expect(UserNameIndex).toHaveValue("UserName")
        expect(PasswordIndex).toHaveValue("Password")
        expect(bttClick).toBeInTheDocument()

        
        await userEvent.click(bttClick)

        await waitFor(() => {
            expect(mockValue.default.singIn).toHaveBeenCalledWith({ UserName: "UserName", Password: "Password" })
        })
    })
    it("should return erro in login", async () => {
        
        // const expectedErros: ErroType[] = [{ id: 0, message: 'erro' }]
        jest.spyOn(mockValue.default, 'singIn')
        const erroMock = jest.spyOn(exportValues.default, 'mockErrFunc')
        render(
            <MockAuthProvider>
                <Login />
            </MockAuthProvider>
        )
        const bttClick = screen.getByRole("button", { name: 'Enviar' })
        const UserNameIndex = screen.getByRole("textbox", { name: 'Username:' })
        const PasswordIndex = screen.getByTestId("passwordLogin")

        await userEvent.type(UserNameIndex, "User")
        await userEvent.type(PasswordIndex, "Pass")

        expect(UserNameIndex).toHaveValue("User")
        expect(PasswordIndex).toHaveValue("Pass")

        await userEvent.click(bttClick)

        await waitFor(() => {
            expect(erroMock).toHaveBeenCalledWith({id: 1, message: "Erro ao tentar fazer login"})
        })
    })
    it("should go to newUser page", async ()=>{
        const mockPush = jest.fn()
        jest.spyOn(navigation, 'useRouter').mockReturnValue({push: mockPush})
        render(<Login/>)
        const bttNewUser = screen.getByRole("button", {name: "Registre-se!"})
        expect(bttNewUser).toBeInTheDocument()
        await userEvent.click(bttNewUser)
        expect(mockPush).toHaveBeenCalledWith('/newUser')
    })
    it("should go to findEmail page", async ()=>{
        const mockPush = jest.fn()
        jest.spyOn(navigation, 'useRouter').mockReturnValue({push: mockPush})
        render(<Login/>)
        const bttNewUser = screen.getByRole("button", {name: "Esqueci o Email"})
        expect(bttNewUser).toBeInTheDocument()
        await userEvent.click(bttNewUser)
        expect(mockPush).toHaveBeenCalledWith('/findEmail')
    })
    it("should go to findPassword page", async ()=>{
        const mockPush = jest.fn()
        jest.spyOn(navigation, 'useRouter').mockReturnValue({push: mockPush})
        render(<Login/>)
        const bttNewUser = screen.getByRole("button", {name: "Esqueci a Senha"})
        expect(bttNewUser).toBeInTheDocument()
        await userEvent.click(bttNewUser)
        expect(mockPush).toHaveBeenCalledWith('/findPassword')
    })
})