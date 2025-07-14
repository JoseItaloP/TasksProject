
import { AuthContextType, ErroType, newLoginUser } from "@/app/_constructor/_Types";
import { AuthContext } from "@/app/contexts/AuthContext"
import mockValue from "./mockValues";

export type singIngType = (newUser: newLoginUser) => Promise<ErroType[] | undefined>

 const MockAuthProvider = ({ children, value }: {
    children: React.ReactNode,
    value?: AuthContextType
}) => (
    <AuthContext.Provider value={value ? value : mockValue as AuthContextType}>
        {children}
    </AuthContext.Provider>
)

export default MockAuthProvider
