import Home from "@/app/page"
import { render, screen } from "@testing-library/react"
import { usePathname, useRouter } from "next/navigation"
import userEvent from "@testing-library/user-event"

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));


it("Should render the Main", async () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
    usePathname.mockReturnValue("/");
    render(

        <Home />


    )

    const TestinH1 = screen.getByText("Aplicativo de Tarefas")
    expect(TestinH1).toBeInTheDocument();

    const BtnLogin = screen.getByRole("button", { name: /Login/i })
    expect(BtnLogin).toBeInTheDocument()


    await userEvent.click(BtnLogin)

    expect(mockPush).toHaveBeenCalledWith("/Login")
})