import MockAuthProvider from "@/__mocks__/MockAuthProvider"
import { render, screen, waitFor } from "@testing-library/react"
import Page from "../page"
import { passValue } from "@/__test__/helper/passValueTest"


jest.mock('../taskModal', () => ({
  __esModule: true,
  default: jest.fn( ({ params }: { params: Promise<{ id: number }> }) => {
    return (

      <div data-testid='taskModal-mock'>
        taskModule Mock 
      </div>

    );
  }),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn().mockReturnValue('/')

}))

describe('test do User Task [id]',  ()=>{
    it("should render the taskModal Page",async ()=>{
        
          const paramsPromise = Promise.resolve({id: passValue.Ftasks[1].ID})
        render(
            <MockAuthProvider value={passValue}>
                <Page params={paramsPromise}/>
            </MockAuthProvider>
        )
        const findThing = screen.getByTestId('taskModal-mock')
        await waitFor(()=>{
            expect(findThing).toBeInTheDocument()

        })
    })
})