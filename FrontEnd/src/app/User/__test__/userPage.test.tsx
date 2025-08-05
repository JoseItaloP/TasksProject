import MockAuthProvider from "@/__mocks__/MockAuthProvider"
import { render, screen, waitFor } from "@testing-library/react"
import UrlDisplay from "@/__test__/helper/UrlDisplay"
import Main from "../page"
import * as navigation from 'next/navigation'
import mockValue from "@/__mocks__/mockValues"
import userEvent from "@testing-library/user-event"
import Tasks from "@/app/_constructor/_Tasks/@Tasks/page"
import { passValue } from "@/__test__/helper/passValueTest"

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn().mockReturnValue('/')

}))

describe("User Page Test", () => {

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.spyOn(navigation, 'useRouter').mockReturnValue({ push: jest.fn() })
    })

    it("Should render the UserPage", async () => {
        const spyOn = jest.spyOn(mockValue, 'getLoginUser')
        render(
            <MockAuthProvider >
                <Main />
            </MockAuthProvider>
        )
        expect(screen.getByText("Carregando..."))

        await waitFor(async () => {
            expect(spyOn).toHaveBeenCalledTimes(1)

        })
        await waitFor(() => {
            expect(screen.getByText("Tarefas de UserName")).toBeInTheDocument()
        })
        // mock em tasks e passar variavel de forma direta
        await waitFor(() => {
            expect(screen.getByRole('heading', { name: 'Sem tarefa válida nesta conta.' })).toBeInTheDocument()
        })
    })
    it("Should test the tasks from user", async ()=>{

        render(
            <MockAuthProvider value={passValue}>
                <Tasks/>
                <UrlDisplay/>
            </MockAuthProvider>
        )

        passValue.Ftasks.map((Task)=>{
            expect(screen.getByRole('heading', {name: `${Task.Nome}`})).toBeInTheDocument()
        })

        const taskIDOne = screen.getByTestId('test_1')
        await userEvent.click(taskIDOne)
        expect(taskIDOne).toHaveAttribute('href','/User/Task/1')
    })

})