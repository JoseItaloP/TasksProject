import MockAuthProvider from "@/__mocks__/MockAuthProvider"
import NovaTask from "../page"
import { render, screen, waitFor } from "@testing-library/react"
import { passValue } from "@/__test__/helper/passValueTest"
import * as navigator from "next/navigation"
import userEvent from "@testing-library/user-event"
import mockValue from "@/__mocks__/mockValues"

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(()=>({
        refresh: jest.fn(),
        push: jest.fn(),
        replace: jest.fn()
    })),
    usePathname: jest.fn().mockReturnValue('/'),
    redirect: jest.fn()
}))

describe("Nova task test page", ()=>{
    it('should create a newTask', async ()=>{
        const mockRedirect = jest.spyOn(navigator, 'redirect')
        render(
            <MockAuthProvider value={passValue}>
                <NovaTask/>
            </MockAuthProvider>
        )
        const newTaskName = screen.getByRole('textbox', {name: 'Nome da task'})
        const newDescName = screen.getByRole('textbox', {name: 'Descrição da task'})
        const newStatus = screen.getByRole('combobox', {name: 'Status inicial:'})
        const newPriority = screen.getByRole('combobox', {name: 'Prioridade inicial:'})
        const bttSubmit = screen.getByRole("button", {name: 'Enviar'})

        await userEvent.type(newTaskName, 'new task test name')
        await userEvent.type(newDescName, 'new task test describe')
        await userEvent.selectOptions(newStatus, 'Atuando')
        await userEvent.selectOptions(newPriority, 'Baixa')

        await userEvent.click(bttSubmit)

        await waitFor(()=>{
            expect(mockRedirect).toHaveBeenCalledWith('/User')
        })

        
        const findTask = mockValue.user
        if(findTask){
            findTask
        }
            
        
        
        await waitFor(()=>{
            expect(taskTestName).to
        })

    })
}
)