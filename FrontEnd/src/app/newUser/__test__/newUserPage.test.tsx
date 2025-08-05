import { render, screen, waitFor } from "@testing-library/react"
import NewUser from "../page"
import userEvent from "@testing-library/user-event"
import * as mockUserNew  from "../__mocks__/mockNewUserRegistrat.mock"
import * as exportValues from "@/__mocks__/mockReturnErro"
import ExitHamdler from "@/app/helper/ExitHamdler"

describe("New User Page test", ()=>{
    
     afterEach(() => {
        jest.restoreAllMocks()

    })

    it("was to make a new User", async ()=>{
        const mockNew = jest.spyOn(ExitHamdler, 'NewUserResgistrat').mockImplementation(mockUserNew.default)
        // NewUserResgistrat.mockImpementation(()=>mockNewUser)
        render(<NewUser/>)
        const userNameIndex = screen.getByRole("textbox", {name: "Username"})
        const userEmail = screen.getByRole("textbox", {name: "Email"})
        const userEmailConfirm = screen.getByRole("textbox", {name: "Confirme o Email"})

        expect(userNameIndex).toBeInTheDocument()
        expect(userEmail).toBeInTheDocument()
        expect(userEmailConfirm).toBeInTheDocument()

        const bttSend = screen.getByRole("button", {name: "Enviar"})

        expect(bttSend).toBeInTheDocument()

        await userEvent.type(userNameIndex, 'userName')
        await userEvent.type(userEmail, 'user@email.com')
        await userEvent.type(userEmailConfirm, 'user@email.com')
        await userEvent.click(bttSend)

        await waitFor(()=>{
            expect(mockNew).toHaveBeenCalledWith({ UserName: "userName", Email: "user@email.com", ConfEmail: "user@email.com" })
        })
    })
    it("should return a erro of Email and Confirm", async ()=>{
        jest.spyOn(ExitHamdler, 'NewUserResgistrat').mockImplementation(mockUserNew.default)
        const spy = jest.spyOn(exportValues.default, 'mockErrFunc')
        // NewUserResgistrat.mockImpementation(()=>mockNewUser)
        render(<NewUser/>)
        const userNameIndex = screen.getByRole("textbox", {name: "Username"})
        const userEmail = screen.getByRole("textbox", {name: "Email"})
        const userEmailConfirm = screen.getByRole("textbox", {name: "Confirme o Email"})

        expect(userNameIndex).toBeInTheDocument()
        expect(userEmail).toBeInTheDocument()
        expect(userEmailConfirm).toBeInTheDocument()

        const bttSend = screen.getByRole("button", {name: "Enviar"})

        expect(bttSend).toBeInTheDocument()

        await userEvent.type(userNameIndex, 'user')
        await userEvent.type(userEmail, 'user2@email.com')
        await userEvent.type(userEmailConfirm, 'user3@email.com')
        await userEvent.click(bttSend)

        await waitFor(()=>{
            expect(spy).toHaveBeenCalledWith({ erroId: 1, message: "Emails diferentes" })
        })
    })
    it("should return a erro of UserName", async ()=>{
        jest.spyOn(ExitHamdler, 'NewUserResgistrat').mockImplementation(mockUserNew.default)
        const spy = jest.spyOn(exportValues.default, 'mockErrFunc')
        // NewUserResgistrat.mockImpementation(()=>mockNewUser)
        render(<NewUser/>)
        const userNameIndex = screen.getByRole("textbox", {name: "Username"})
        const userEmail = screen.getByRole("textbox", {name: "Email"})
        const userEmailConfirm = screen.getByRole("textbox", {name: "Confirme o Email"})

        expect(userNameIndex).toBeInTheDocument()
        expect(userEmail).toBeInTheDocument()
        expect(userEmailConfirm).toBeInTheDocument()

        const bttSend = screen.getByRole("button", {name: "Enviar"})

        expect(bttSend).toBeInTheDocument()

        await userEvent.type(userNameIndex, 'user')
        await userEvent.type(userEmail, 'user@email.com')
        await userEvent.type(userEmailConfirm, 'user@email.com')
        await userEvent.click(bttSend)

        await waitFor(()=>{
            expect(spy).toHaveBeenCalledWith({ erroId: 1, message: "UserName nao registrado" })
        })
    })
})