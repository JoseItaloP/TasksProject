import MockAuthProvider from "@/__mocks__/MockAuthProvider"
import { render, screen, waitFor } from "@testing-library/react"
import TaskModal from "../taskModal"
import React from "react"
import * as navigation from 'next/navigation'
import { passValue } from "@/__test__/helper/passValueTest"
import userEvent from "@testing-library/user-event"


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn().mockReturnValue('/')

}))

describe('taskModal tester', ()=>{

     beforeEach(()=>{
        jest.resetAllMocks()
        jest.spyOn(navigation, 'useRouter').mockReturnValue({push: jest.fn()})
     })

    it("should render all the data from the task", async ()=>{
          const ParamsPass =  1
        render(
            <MockAuthProvider  value={passValue}>
                <TaskModal params={ParamsPass} />
            </MockAuthProvider>
        )
        await waitFor(()=>{
            expect(screen.getByRole('heading', {name: passValue.Ftasks[0].Nome}))
        })
        expect(screen.getByText(`${passValue.Ftasks[0].Descricao}`))
        expect(screen.getByText(passValue.Ftasks[0].Priority))
        expect(screen.getByText(passValue.Ftasks[0].Status))
    })
    it("should throw a error in taskFind", (done)=>{
        
       const ParamsPass = 2

        try {
            render(
                    <MockAuthProvider  value={passValue}>
                        <TaskModal params={ParamsPass} />
                    </MockAuthProvider>
                )
            
            done()
        } catch (err) {
            done(err)
        }
         
    })
    it("should return to page '/'", async ()=>{
        const mockPush = jest.fn()
        jest.spyOn(navigation, 'useRouter').mockReturnValue({push: mockPush})
        const ParamsPass =  null
        render(
            <MockAuthProvider  value={passValue}>
                <TaskModal params={ParamsPass} />
            </MockAuthProvider>
        )
        await waitFor(()=>{
            expect(mockPush).toHaveBeenCalledWith('/')
        })
    })
    it("should render the edit on the page", async ()=>{
        const ParamsPass =  1
        render(
            <MockAuthProvider  value={passValue}>
                <TaskModal params={ParamsPass} />
            </MockAuthProvider>
        )

        const editBtt = screen.getByRole('button', {name: 'Editar'})
        expect(editBtt).toBeInTheDocument()

        await userEvent.click(editBtt)

        const h1EditTask = screen.getByRole('heading', {name: 'Edit Task Planejar reunião da equipe'})
        const LabelInputNome = screen.getByRole('textbox', {name: 'Nome da task'})
        const LabelInputDescrição = screen.getByRole('textbox', {name: 'Descrição da task'})
        const LabelInputStatus = screen.getByRole('combobox', {name: 'Status inicial:'})
        const LabelInputPrioridade = screen.getByRole('combobox', {name: 'Prioridade inicial:'})

        expect(h1EditTask).toBeInTheDocument()
        expect(LabelInputNome).toBeInTheDocument()
        expect(LabelInputDescrição).toBeInTheDocument()
        expect(LabelInputStatus).toBeInTheDocument()
        expect(LabelInputPrioridade).toBeInTheDocument()

    })
    it("shuld edit the name of the task", async ()=>{
        const ParamsPass =  1
        render(
            <MockAuthProvider  value={passValue}>
                <TaskModal params={ParamsPass} />
            </MockAuthProvider>
        )

          const editBtt = screen.getByRole('button', {name: 'Editar'})
        expect(editBtt).toBeInTheDocument()

        await userEvent.click(editBtt)

        const LabelInputNome = screen.getByRole('textbox', {name: 'Nome da task'})
        const submitBtt = screen.getByRole('button', {name: 'Enviar'})

        expect(submitBtt).toBeInTheDocument()

        await userEvent.clear(LabelInputNome)
        await userEvent.type(LabelInputNome, 'Planejar reunião')
        await userEvent.click(submitBtt)

        await waitFor(()=>{
            expect(screen.getByRole("heading", {name: 'Planejar reunião'})).toBeInTheDocument()
        })

    })
})